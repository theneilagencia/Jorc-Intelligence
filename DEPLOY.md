# 🚀 ComplianceCore Mining™ - Deploy Guide

## Render Deploy

### 1. Conectar Repositório
1. Acesse: https://dashboard.render.com
2. Clique em "New +" → "Web Service"
3. Conecte o repositório: `ComplianceCore-Mining`
4. O Render detectará automaticamente o `render.yaml`

### 2. Configurar Variáveis de Ambiente

#### Obrigatórias:
```bash
DB_URL=mysql://user:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-here
```

#### AWS S3 (para uploads):
```bash
AWS_ACCESS_KEY_ID=AKlA2JhVOSP76ICZGbM43
AWS_SECRET_ACCESS_KEY=cra8al/2o8wVATdv9dw3lavtZgoKNKjHtmjteei
S3_BUCKET=jorc-intelligence-storage
S3_REGION=sa-east-1
S3_PUBLIC_BASE=https://jorc-intelligence-storage.s3.sa-east-1.amazonaws.com
```

#### Stripe (pagamentos):
```bash
STRIPE_PUBLISHABLE_KEY=pk_live_51RU504GwHsvLMl1xq6GRT5QlQq6anhkuJkU19KGLxLYwBbPkc3cK2pw6kl197BclOz24MzgzsOqhMxilZx198b2b00S1yQejy
STRIPE_SECRET_KEY=sk_live_... (obtenha no dashboard do Stripe)
```

#### OAuth (autenticação):
```bash
OAUTH_SERVER_URL=https://api.manus.im
OWNER_OPEN_ID=your-owner-open-id
```

### 3. Deploy
Clique em "Create Web Service" e aguarde o deploy automático!

---

## Database Setup

### MySQL (PlanetScale/Railway)
1. Crie um banco MySQL
2. Copie a connection string
3. Adicione como `DB_URL` no Render
4. As migrações rodarão automaticamente no build

---

## Pós-Deploy

### Verificar Saúde
```bash
curl https://your-app.onrender.com/health
```

### Logs
```bash
# No dashboard do Render, acesse "Logs" para monitorar
```

### Domínio Customizado
1. No Render, vá em "Settings" → "Custom Domain"
2. Adicione seu domínio
3. Configure DNS conforme instruções

---

## Troubleshooting

### Erro: "DB_URL not set"
- Verifique se a variável está configurada no Render
- Teste a connection string localmente

### Erro: "S3 upload failed"
- Verifique credenciais AWS
- Confirme que o bucket existe na região correta
- Verifique permissões IAM

### Erro: "Puppeteer failed"
- O Render pode precisar de dependências extras
- Adicione ao `render.yaml`:
  ```yaml
  buildCommand: apt-get update && apt-get install -y chromium && pnpm install && pnpm build
  ```

---

## Monitoramento

### Uptime
- Use UptimeRobot ou similar
- Endpoint: `https://your-app.onrender.com/health`

### Logs
- Render fornece logs em tempo real
- Configure alertas para erros críticos

---

## Backup

### Database
- Configure backups automáticos no PlanetScale/Railway
- Frequência recomendada: diária

### S3
- Habilite versionamento no bucket
- Configure lifecycle policies

---

## Contato
Para suporte: vinicius.debian@theneil.com.br

