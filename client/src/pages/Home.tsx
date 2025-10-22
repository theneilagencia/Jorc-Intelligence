import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { 
  FileText, Shield, Award, ArrowRightLeft, 
  TrendingUp, Leaf, Globe, BarChart3,
  CheckCircle2, Zap, Lock
} from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  // Redirecionar usuários autenticados para o dashboard
  useEffect(() => {
    if (!loading && user) {
      setLocation("/reports/generate");
    }
  }, [user, loading, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={APP_LOGO} alt="QIVO Mining" className="h-10 w-10 rounded-lg" />
            <div>
              <h1 className="text-xl font-bold text-slate-900">QIVO Mining</h1>
              <p className="text-xs text-slate-600">Infraestrutura de Governança Minerária Digital</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <a href="#features">Recursos</a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="/pricing">Planos</a>
            </Button>
            <Button asChild>
              <a href={getLoginUrl()}>Entrar</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Infraestrutura Full-Stack para Governança Minerária
          </div>
          
          <h1 className="text-6xl font-bold tracking-tight leading-tight">
            Transforme Compliance em
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Valor Estratégico
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A QIVO Mining é a infraestrutura digital que conecta <strong>dados técnicos</strong>, 
            <strong> inteligência regulatória</strong>, <strong>ESG</strong> e <strong>valuation financeiro</strong> — 
            transformando relatórios estáticos em ativos auditáveis, valorizáveis e estratégicos.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <Button size="lg" className="text-lg px-8 shadow-lg shadow-blue-500/30" asChild>
              <a href={getLoginUrl()}>Criar Conta Gratuita →</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <a href="/pricing">Ver Planos e Preços</a>
            </Button>
          </div>

          {/* Prova Social */}
          <div className="pt-12 border-t border-slate-200 mt-12">
            <p className="text-sm text-slate-500 mb-6">Confiado por empresas de mineração em 3 continentes</p>
            <div className="flex items-center justify-center gap-12 opacity-60">
              <div className="text-2xl font-bold text-slate-700">500+</div>
              <div className="text-sm text-slate-600">Relatórios<br/>Gerados</div>
              <div className="h-8 w-px bg-slate-300"></div>
              <div className="text-2xl font-bold text-slate-700">98%</div>
              <div className="text-sm text-slate-600">Taxa de<br/>Conformidade</div>
              <div className="h-8 w-px bg-slate-300"></div>
              <div className="text-2xl font-bold text-slate-700">6</div>
              <div className="text-sm text-slate-600">Padrões<br/>Suportados</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 pt-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Auditável em tempo real</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Conformidade preditiva</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>ESG operacional</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">
              "Somos a infraestrutura digital de governança técnica, ESG e financeira da nova mineração."
            </h2>
            <p className="text-lg text-slate-300">
              Uma plataforma full-stack que conecta dados técnicos de mineração à inteligência regulatória, 
              ESG e financeira — gerando valor auditável, mitigando riscos e habilitando novas rotas de 
              financiamento sustentável.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Transformações */}
      <section className="container mx-auto px-4 py-20" id="features">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Três Transformações Simultâneas</h2>
            <p className="text-lg text-slate-600">
              A QIVO Mining promove mudanças estruturais na governança minerária moderna
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Transformação 1 */}
            <Card className="p-8 hover:shadow-xl transition-all border-t-4 border-blue-600">
              <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Ativos Técnicos como Vetores de Valor</h3>
              <p className="text-slate-600 mb-4">
                Relatórios antes operacionais tornam-se:
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Auditáveis em tempo real</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Valorizáveis para M&A, valuation, crédito e tokenização</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Referência sólida para estratégias ESG</span>
                </li>
              </ul>
            </Card>

            {/* Transformação 2 */}
            <Card className="p-8 hover:shadow-xl transition-all border-t-4 border-purple-600">
              <div className="h-14 w-14 rounded-xl bg-purple-100 flex items-center justify-center mb-6">
                <Globe className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Inteligência Regulatória Preditiva</h3>
              <p className="text-slate-600 mb-4">
                O "Waze da conformidade técnica":
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Antecipe mudanças em normas JORC, NI 43-101, SAMREC, CBRR</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Mapeie e priorize riscos críticos por projeto</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Automatize auditorias e due diligence</span>
                </li>
              </ul>
            </Card>

            {/* Transformação 3 */}
            <Card className="p-8 hover:shadow-xl transition-all border-t-4 border-green-600">
              <div className="h-14 w-14 rounded-xl bg-green-100 flex items-center justify-center mb-6">
                <Leaf className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">ESG como Infraestrutura Operacional</h3>
              <p className="text-slate-600 mb-4">
                ESG não é narrativa, é infraestrutura técnica:
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Relatórios compatíveis com GRI, SASB, IFC, IRMA</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Dashboards dinâmicos de indicadores ambientais</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Gestão de compensações e créditos ESG</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Módulos */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Módulos Integrados</h2>
              <p className="text-lg text-slate-600">
                Plataforma completa para governança técnica, regulatória, ESG e financeira
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: FileText,
                  title: "Relatórios Técnicos",
                  description: "Geração automática de relatórios conformes aos padrões JORC, NI 43-101, PERC, SAMREC, CRIRSCO e CBRR (Brasil)",
                  color: "blue",
                },
                {
                  icon: Shield,
                  title: "Auditoria & KRCI",
                  description: "22 regras de auditoria automatizadas com sistema de pontuação de risco de conformidade",
                  color: "purple",
                },
                {
                  icon: Award,
                  title: "Pré-Certificação",
                  description: "Análise de conformidade para ASX, TSX, JSE e CRIRSCO com checklist automatizado",
                  color: "orange",
                },
                {
                  icon: ArrowRightLeft,
                  title: "Conversão de Padrões",
                  description: "Mapeamento semântico e conversão entre diferentes padrões internacionais",
                  color: "indigo",
                },
                {
                  icon: Leaf,
                  title: "ESG Reporting",
                  description: "Relatórios automáticos compatíveis com GRI, SASB, IFC e IRMA + gestão de compensações",
                  color: "green",
                },
                {
                  icon: BarChart3,
                  title: "Valuation Automático",
                  description: "Cálculo de NPV, IRR e análise de cenários com dados de preços em tempo real",
                  color: "cyan",
                },
                {
                  icon: Globe,
                  title: "Radar Regulatória",
                  description: "Monitoramento de mudanças legislativas em 5 países com alertas automáticos",
                  color: "red",
                },
                {
                  icon: Lock,
                  title: "Governança & Segurança",
                  description: "Multi-tenancy, branding personalizado, limites por plano e armazenamento seguro S3",
                  color: "slate",
                },
              ].map((module, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                  <div className={`h-12 w-12 rounded-lg bg-${module.color}-100 flex items-center justify-center mb-4`}>
                    <module.icon className={`h-6 w-6 text-${module.color}-600`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                  <p className="text-sm text-slate-600">{module.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">Padrões Suportados</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "JORC 2012", country: "Austrália" },
              { name: "NI 43-101", country: "Canadá" },
              { name: "PERC", country: "Europa" },
              { name: "SAMREC", country: "África do Sul" },
              { name: "CRIRSCO", country: "Internacional" },
              { name: "CBRR", country: "Brasil 🇧🇷" },
            ].map((standard) => (
              <Card key={standard.name} className="p-4 text-center hover:shadow-md transition-shadow">
                <p className="font-bold text-lg">{standard.name}</p>
                <p className="text-xs text-slate-600">{standard.country}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-4xl mx-auto p-12 text-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">
            A nova mineração começa aqui
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Dados auditáveis, conformidade estratégica e impacto ESG real. 
            Junte-se às empresas que transformam compliance em valor.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <a href={getLoginUrl()}>Criar Conta Gratuita</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-white text-white hover:bg-white/10" asChild>
              <a href="/pricing">Ver Planos e Preços</a>
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={APP_LOGO} alt="QIVO Mining" className="h-8 w-8 rounded-lg" />
                <span className="font-bold text-lg">QIVO Mining</span>
              </div>
              <p className="text-sm text-slate-600">
                Infraestrutura de Governança Minerária Digital
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Plataforma</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#features" className="hover:text-blue-600">Recursos</a></li>
                <li><a href="/pricing" className="hover:text-blue-600">Planos</a></li>
                <li><a href={getLoginUrl()} className="hover:text-blue-600">Entrar</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contato</h4>
              <p className="text-sm text-slate-600">
                vinicius.debijui@thenell.com.br
              </p>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-8 pt-8 border-t text-center text-sm text-slate-600">
            <p>© 2025 QIVO Mining. Todos os direitos reservados.</p>
            <p className="mt-2">Infraestrutura de Governança Minerária Digital</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

