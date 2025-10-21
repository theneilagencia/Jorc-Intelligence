# 🏔️ ComplianceCore Mining™

Sistema completo de gestão de conformidade para relatórios técnicos de mineração (JORC, NI 43-101, PERC, SAMREC, CRIRSCO).

## 🚀 Deploy no Render (1-Click)

### Passo 1: Acesse o Render
1. Vá para: https://dashboard.render.com
2. Login: `vinicius.debian@theneil.com.br`
3. Senha: `Bigtrade@4844`

### Passo 2: Criar Serviço
1. Clique em **"New +"** → **"Blueprint"**
2. Conecte o repositório: **`ComplianceCore-Mining`**
3. O Render detectará automaticamente o `render.yaml`
4. Clique em **"Apply"**

### Passo 3: Aguarde o Deploy
- ⏱️ Tempo estimado: 5-10 minutos
- 🎯 O Render criará automaticamente:
  - Web Service (aplicação)
  - MySQL Database
  - Todas as variáveis de ambiente

### Passo 4: Acesse a Aplicação
Após o deploy, o Render fornecerá uma URL como:
```
https://compliancecore-mining.onrender.com
```

## 📋 Variáveis de Ambiente (Já Configuradas)

Todas as variáveis estão no `render.yaml`:
- ✅ AWS S3 (uploads)
- ✅ Stripe (pagamentos)
- ✅ OAuth Manus (autenticação)
- ✅ Database (criado automaticamente)
- ✅ JWT Secret (gerado automaticamente)

## 🔧 Desenvolvimento Local

```bash
# Instalar dependências
pnpm install

# Rodar em desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Iniciar produção
pnpm start
```

## 📦 Stack Técnica

- **Backend:** Express + tRPC + Drizzle ORM
- **Frontend:** React 19 + TypeScript + Tailwind 4
- **Database:** MySQL
- **Storage:** AWS S3
- **Deploy:** Render
- **Auth:** OAuth Manus

## 🎯 Módulos Implementados

1. ✅ **Gerar Relatório** - Criação com 5 padrões internacionais
2. ✅ **Auditoria & KRCI** - 22 regras de compliance
3. ✅ **Pré-Certificação** - 4 reguladores (ASX, TSX, JSE, CRIRSCO)
4. ✅ **Exportar Padrões** - Conversão entre padrões
5. ✅ **Upload & Parsing** - Análise automática de relatórios externos
6. ✅ **Revisão Humana** - Validação de campos incertos

## 📞 Suporte

Email: vinicius.debian@theneil.com.br

