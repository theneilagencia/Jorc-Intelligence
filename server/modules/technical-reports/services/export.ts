/**
 * Export Service
 * Handles report export to different standards and formats
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import puppeteer from 'puppeteer';
import { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow } from 'docx';
import * as XLSX from 'xlsx';
import Handlebars from 'handlebars';
import { storagePut } from '../../../storage';
import * as jorcMapper from './mappers/jorc';
import * as ni43Mapper from './mappers/ni43';
import * as percMapper from './mappers/perc';
import * as samrecMapper from './mappers/samrec';

const SUPPORTED_STANDARDS = ["JORC_2012", "NI_43_101", "PERC", "SAMREC"] as const;
const SUPPORTED_FORMATS = ["PDF", "DOCX", "XLSX"] as const;

type Standard = typeof SUPPORTED_STANDARDS[number];
type Format = typeof SUPPORTED_FORMATS[number];

interface NormalizedData {
  metadata?: any;
  sections?: any[];
  resource_estimates?: any[];
  competent_persons?: any[];
  economic_assumptions?: any;
  qa_qc?: string;
  geology?: string;
  brand?: {
    logo_s3?: string;
    company_display?: string;
  };
}

function pickMapper(toStandard: Standard) {
  const mappers = {
    JORC_2012: jorcMapper.toStandard,
    NI_43_101: ni43Mapper.toStandard,
    PERC: percMapper.toStandard,
    SAMREC: samrecMapper.toStandard,
  };
  return mappers[toStandard];
}

async function renderPDF(payload: any, toStandard: Standard): Promise<Buffer> {
  // Read HTML template
  const templatePath = path.join(__dirname, '../templates/jorc_2012.html');
  const templateContent = await fs.readFile(templatePath, 'utf-8');
  
  // Compile with Handlebars
  const template = Handlebars.compile(templateContent);
  
  // Add generated_at timestamp
  payload.generated_at = new Date().toLocaleString('pt-BR');
  
  const html = template(payload);

  // Generate PDF with Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  const pdfBuffer = await page.pdf({
    format: 'A4',
    margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
    printBackground: true,
  });

  await browser.close();
  return Buffer.from(pdfBuffer);
}

async function renderDOCX(payload: any, toStandard: Standard): Promise<Buffer> {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: `Relatório Técnico — ${payload.standard}`,
              bold: true,
              size: 32,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${payload.project_name} · ${payload._brand.company_display}`,
              size: 20,
            }),
          ],
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Pessoas Competentes',
              bold: true,
              size: 24,
            }),
          ],
        }),
        ...payload.competent_persons.map((cp: any) => 
          new Paragraph({
            children: [
              new TextRun({
                text: `• ${cp.name} — ${cp.qualification} (${cp.organization})`,
              }),
            ],
          })
        ),
        new Paragraph({ text: '' }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Estimativa de Recursos Minerais',
              bold: true,
              size: 24,
            }),
          ],
        }),
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph('Categoria')] }),
                new TableCell({ children: [new Paragraph('Tonnage')] }),
                new TableCell({ children: [new Paragraph('Grades')] }),
                new TableCell({ children: [new Paragraph('Cutoff')] }),
              ],
            }),
            ...payload.resources_table.map((r: any) =>
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph(r.category)] }),
                  new TableCell({ children: [new Paragraph(String(r.tonnage))] }),
                  new TableCell({ children: [new Paragraph(JSON.stringify(r.grades))] }),
                  new TableCell({ children: [new Paragraph(JSON.stringify(r.cutoff))] }),
                ],
              })
            ),
          ],
        }),
      ],
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
}

async function renderXLSX(payload: any, toStandard: Standard): Promise<Buffer> {
  const wb = XLSX.utils.book_new();
  
  // Sheet 1: Metadata
  const metadataData = [
    ['Padrão', payload.standard],
    ['Projeto', payload.project_name],
    ['Empresa', payload.company],
    ['Data Efetiva', payload.effective_date],
  ];
  const ws1 = XLSX.utils.aoa_to_sheet(metadataData);
  XLSX.utils.book_append_sheet(wb, ws1, 'Metadata');

  // Sheet 2: Resources
  const resourcesData = [
    ['Categoria', 'Tonnage', 'Grades', 'Cutoff'],
    ...payload.resources_table.map((r: any) => [
      r.category,
      r.tonnage,
      JSON.stringify(r.grades),
      JSON.stringify(r.cutoff),
    ]),
  ];
  const ws2 = XLSX.utils.aoa_to_sheet(resourcesData);
  XLSX.utils.book_append_sheet(wb, ws2, 'Resources');

  // Sheet 3: Competent Persons
  const cpData = [
    ['Nome', 'Qualificação', 'Organização'],
    ...payload.competent_persons.map((cp: any) => [
      cp.name,
      cp.qualification,
      cp.organization,
    ]),
  ];
  const ws3 = XLSX.utils.aoa_to_sheet(cpData);
  XLSX.utils.book_append_sheet(wb, ws3, 'Competent Persons');

  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  return buffer;
}

export async function exportReport(
  tenantId: string,
  reportId: string,
  normalized: NormalizedData,
  toStandard: Standard,
  format: Format
): Promise<string> {
  if (!SUPPORTED_STANDARDS.includes(toStandard)) {
    throw new Error(`Unsupported standard: ${toStandard}`);
  }
  if (!SUPPORTED_FORMATS.includes(format)) {
    throw new Error(`Unsupported format: ${format}`);
  }

  // 1) Map data to target standard
  const mapper = pickMapper(toStandard);
  const payload = mapper(normalized);

  // 2) Render file based on format
  let buffer: Buffer;
  let contentType: string;
  let extension: string;

  if (format === 'PDF') {
    buffer = await renderPDF(payload, toStandard);
    contentType = 'application/pdf';
    extension = 'pdf';
  } else if (format === 'DOCX') {
    buffer = await renderDOCX(payload, toStandard);
    contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    extension = 'docx';
  } else if (format === 'XLSX') {
    buffer = await renderXLSX(payload, toStandard);
    contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    extension = 'xlsx';
  } else {
    throw new Error(`Unsupported format: ${format}`);
  }

  // 3) Upload to S3
  const s3Key = `reports/${reportId}/exports/${toStandard}/report.${extension}`;
  const result = await storagePut(s3Key, buffer, contentType);

  return result.url;
}

export { SUPPORTED_STANDARDS, SUPPORTED_FORMATS };
export type { Standard, Format };

