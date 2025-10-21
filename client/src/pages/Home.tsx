import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { FileText, Shield, Award, ArrowRightLeft } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={APP_LOGO} alt={APP_TITLE} className="h-10 w-10 rounded-lg" />
            <div>
              <h1 className="text-xl font-bold">{APP_TITLE}</h1>
              <p className="text-xs text-gray-600">ComplianceCore Mining™</p>
            </div>
          </div>
          <Button asChild>
            <a href={getLoginUrl()}>Entrar</a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            Plataforma Multi-Tenant para Mineração
          </div>
          <h1 className="text-5xl font-bold tracking-tight">
            Relatórios Técnicos de Mineração
            <br />
            <span className="text-blue-600">Conformes aos Padrões Internacionais</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gere, audite e certifique relatórios técnicos seguindo os padrões JORC 2012, 
            NI 43-101, PERC, SAMREC e CRIRSCO com nossa plataforma completa.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <a href={getLoginUrl()}>Começar Agora</a>
            </Button>
            <Button size="lg" variant="outline">
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: FileText,
              title: "Geração de Relatórios",
              description: "Crie relatórios estruturados conforme 5 padrões internacionais",
              color: "blue",
            },
            {
              icon: Shield,
              title: "Auditoria KRCI",
              description: "Verifique conformidade com 20 regras de auditoria automatizadas",
              color: "purple",
            },
            {
              icon: Award,
              title: "Pré-Certificação",
              description: "Solicite análise junto a ASX, TSX, JSE e CRIRSCO",
              color: "orange",
            },
            {
              icon: ArrowRightLeft,
              title: "Conversão de Padrões",
              description: "Converta relatórios entre diferentes padrões internacionais",
              color: "indigo",
            },
          ].map((feature, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
              <div className={`h-12 w-12 rounded-lg bg-${feature.color}-100 flex items-center justify-center mb-4`}>
                <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Standards */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">Padrões Suportados</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "JORC 2012", country: "Austrália" },
              { name: "NI 43-101", country: "Canadá" },
              { name: "PERC", country: "Europa" },
              { name: "SAMREC", country: "África do Sul" },
              { name: "CRIRSCO", country: "Internacional" },
            ].map((standard) => (
              <Card key={standard.name} className="p-4 text-center">
                <p className="font-bold text-lg">{standard.name}</p>
                <p className="text-xs text-gray-600">{standard.country}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-3xl mx-auto p-12 text-center bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Junte-se às empresas de mineração que confiam em nossa plataforma
            para gerar relatórios técnicos conformes e certificados.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href={getLoginUrl()}>Criar Conta Gratuita</a>
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2025 {APP_TITLE}. Todos os direitos reservados.</p>
          <p className="mt-2">ComplianceCore Mining™ - Plataforma Multi-Tenant</p>
        </div>
      </footer>
    </div>
  );
}

