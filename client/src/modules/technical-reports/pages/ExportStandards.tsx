import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft, Download, FileType, RefreshCw } from "lucide-react";

export default function ExportStandards() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Exportar Padrões</h1>
          <p className="text-gray-600 mt-2">
            Converta relatórios entre diferentes padrões internacionais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            { code: "JORC", name: "JORC 2012", color: "blue" },
            { code: "NI", name: "NI 43-101", color: "red" },
            { code: "PERC", name: "PERC", color: "green" },
            { code: "SAMREC", name: "SAMREC", color: "yellow" },
            { code: "CRIRSCO", name: "CRIRSCO", color: "purple" },
          ].map((standard) => (
            <Card key={standard.code} className="p-4 text-center">
              <div className={`h-12 w-12 mx-auto rounded-lg bg-${standard.color}-100 flex items-center justify-center mb-2`}>
                <FileType className={`h-6 w-6 text-${standard.color}-600`} />
              </div>
              <p className="font-semibold text-sm">{standard.name}</p>
              <p className="text-xs text-gray-600">{standard.code}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
              <ArrowRightLeft className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Converter Relatório</h2>
              <p className="text-sm text-gray-600">
                Selecione o padrão de origem e destino para conversão
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Relatório de Origem
              </label>
              <select className="w-full border rounded-lg px-4 py-2">
                <option>Selecione um relatório...</option>
                <option>Relatório JORC 2012 - Projeto Alpha</option>
                <option>Relatório NI 43-101 - Projeto Beta</option>
                <option>Relatório PERC - Projeto Gamma</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Padrão de Origem
                </label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>JORC 2012</option>
                  <option>NI 43-101</option>
                  <option>PERC</option>
                  <option>SAMREC</option>
                  <option>CRIRSCO</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Padrão de Destino
                </label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option>NI 43-101</option>
                  <option>JORC 2012</option>
                  <option>PERC</option>
                  <option>SAMREC</option>
                  <option>CRIRSCO</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Formato de Exportação
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["PDF", "DOCX", "XLSX"].map((format) => (
                  <label
                    key={format}
                    className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                  >
                    <input type="radio" name="format" defaultChecked={format === "PDF"} />
                    <span className="font-medium">{format}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800">
                <strong>⚠️ Atenção:</strong> A conversão entre padrões pode levar alguns minutos.
                Você será notificado quando o arquivo estiver pronto para download.
              </p>
            </div>

            <div className="pt-4">
              <Button className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Iniciar Conversão
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Conversões Recentes</h3>
          <div className="space-y-3">
            {[
              {
                id: "EXP-001",
                report: "Projeto Alpha",
                from: "JORC 2012",
                to: "NI 43-101",
                format: "PDF",
                status: "completed",
                date: "20/10/2025",
                size: "2.4 MB",
              },
              {
                id: "EXP-002",
                report: "Projeto Beta",
                from: "NI 43-101",
                to: "PERC",
                format: "DOCX",
                status: "processing",
                date: "20/10/2025",
                size: "-",
              },
              {
                id: "EXP-003",
                report: "Projeto Gamma",
                from: "PERC",
                to: "SAMREC",
                format: "XLSX",
                status: "completed",
                date: "19/10/2025",
                size: "1.8 MB",
              },
            ].map((exp) => (
              <div
                key={exp.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <p className="font-medium">{exp.report}</p>
                  <p className="text-sm text-gray-600">
                    {exp.id} • {exp.date}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {exp.from}
                    </Badge>
                    <ArrowRightLeft className="h-3 w-3 text-gray-400" />
                    <Badge variant="outline" className="text-xs">
                      {exp.to}
                    </Badge>
                    <span className="text-xs text-gray-500">• {exp.format}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {exp.status === "completed" ? (
                    <>
                      <div className="text-right">
                        <p className="text-sm font-medium">{exp.size}</p>
                        <p className="text-xs text-gray-600">Tamanho</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Baixar
                      </Button>
                    </>
                  ) : (
                    <Badge variant="secondary">
                      <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                      Processando
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

