# 📡 ComplianceCore Mining™ - API Documentation

## Base URL

**Development:** `http://localhost:3000`  
**Production:** `https://compliancecore-mining.onrender.com`

## Health Check

### GET /health

Verifica o status do servidor.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-21T18:00:00.000Z",
  "uptime": 12345.67,
  "environment": "production"
}
```

## tRPC API

Todas as rotas da API usam tRPC e estão disponíveis em `/api/trpc`.

### Módulos Disponíveis

#### 1. Technical Reports - Generate
- `technicalReports.generate.create` - Criar novo relatório
- `technicalReports.generate.list` - Listar relatórios
- `technicalReports.generate.get` - Obter relatório específico

#### 2. Technical Reports - Audit
- `technicalReports.audit.run` - Executar auditoria KRCI
- `technicalReports.audit.list` - Listar auditorias
- `technicalReports.audit.get` - Obter auditoria específica

#### 3. Technical Reports - Pre-Certification
- `technicalReports.precertification.submit` - Submeter solicitação
- `technicalReports.precertification.list` - Listar certificações
- `technicalReports.precertification.get` - Obter certificação específica

#### 4. Technical Reports - Exports
- `technicalReports.exports.run` - Executar exportação
- `technicalReports.exports.list` - Listar exportações
- `technicalReports.exports.get` - Obter exportação específica

#### 5. Technical Reports - Uploads
- `technicalReports.uploads.initiate` - Iniciar upload
- `technicalReports.uploads.complete` - Finalizar upload
- `technicalReports.uploads.status` - Status do upload
- `technicalReports.uploads.list` - Listar uploads
- `technicalReports.uploads.getReviewFields` - Campos para revisão
- `technicalReports.uploads.applyReview` - Aplicar revisão
- `technicalReports.uploads.getReviewLogs` - Logs de revisão

## Autenticação

O sistema usa OAuth via Manus. As rotas de autenticação estão em:
- `/api/oauth/callback` - Callback do OAuth

## Padrões Suportados

1. **JORC 2012** (Australasian Code)
2. **NI 43-101** (Canadian Standard)
3. **PERC** (Pan-European Reserves & Resources)
4. **SAMREC** (South African Code)
5. **CRIRSCO** (International Template)

## Reguladores Suportados

1. **ASX** - Australian Securities Exchange
2. **TSX** - Toronto Stock Exchange
3. **JSE** - Johannesburg Stock Exchange
4. **CRIRSCO** - Committee for Mineral Reserves International Reporting Standards

## Formatos de Exportação

- **PDF** - Portable Document Format
- **DOCX** - Microsoft Word
- **XLSX** - Microsoft Excel

## Status dos Relatórios

- `draft` - Rascunho
- `parsing` - Em análise
- `needs_review` - Precisa de revisão humana
- `ready_for_audit` - Pronto para auditoria
- `audited` - Auditado
- `certified` - Certificado
- `exported` - Exportado

## Códigos de Erro

- `400` - Bad Request (dados inválidos)
- `401` - Unauthorized (não autenticado)
- `403` - Forbidden (sem permissão)
- `404` - Not Found (recurso não encontrado)
- `500` - Internal Server Error (erro no servidor)

## Rate Limiting

Não há rate limiting implementado atualmente.

## Exemplos de Uso

### Criar Relatório (tRPC Client)

```typescript
const report = await trpc.technicalReports.generate.create.mutate({
  title: "Relatório de Recursos Minerais",
  standard: "JORC_2012",
  projectName: "Projeto Alpha",
  location: "Minas Gerais, Brasil"
});
```

### Executar Auditoria

```typescript
const audit = await trpc.technicalReports.audit.run.mutate({
  reportId: "rpt_123456",
  auditType: "full"
});
```

### Submeter Pré-Certificação

```typescript
const cert = await trpc.technicalReports.precertification.submit.mutate({
  reportId: "rpt_123456",
  regulator: "ASX",
  notes: "Observações adicionais"
});
```

## Suporte

Para dúvidas ou suporte, entre em contato:
- Email: vinicius.debian@theneil.com.br

