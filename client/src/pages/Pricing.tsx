import { useState } from 'react';
import { useLocation } from 'wouter';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: number;
  priceAnnual?: number;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  cta: string;
}

const plans: Plan[] = [
  {
    name: 'START',
    price: 0,
    description: 'Ideal para geólogos e consultores independentes',
    features: [
      { text: '1 relatório por mês', included: true },
      { text: '1 projeto ativo', included: true },
      { text: 'Geração de relatórios JORC', included: true },
      { text: 'Exportação PDF', included: true },
      { text: 'Auditoria KRCI básica', included: true },
      { text: 'Suporte por email', included: true },
      { text: 'Pré-certificação', included: false },
      { text: 'Conversão de padrões', included: false },
      { text: 'Suporte prioritário', included: false },
    ],
    cta: 'Começar Grátis',
  },
  {
    name: 'PRO',
    price: 899,
    priceAnnual: 9600,
    description: 'Para consultorias e mineradoras de porte médio',
    features: [
      { text: '5 relatórios por mês', included: true },
      { text: 'Até 3 projetos ativos', included: true },
      { text: 'Todos os padrões internacionais', included: true },
      { text: 'Auditoria KRCI completa (20 regras)', included: true },
      { text: 'Pré-certificação ASX, TSX, JSE', included: true },
      { text: 'Conversão entre padrões', included: true },
      { text: 'Exportação DOCX, XLSX', included: true },
      { text: 'Suporte prioritário', included: true },
      { text: 'API access', included: false },
    ],
    popular: true,
    cta: 'Assinar PRO',
  },
  {
    name: 'ENTERPRISE',
    price: 1990,
    priceAnnual: 21000,
    description: 'Para grandes mineradoras e holdings',
    features: [
      { text: '15 relatórios por mês', included: true },
      { text: 'Projetos ilimitados', included: true },
      { text: 'Todos os recursos PRO', included: true },
      { text: 'Certificação CRIRSCO completa', included: true },
      { text: 'Gestão multi-tenant', included: true },
      { text: 'API access completo', included: true },
      { text: 'White-label disponível', included: true },
      { text: 'Suporte dedicado 24/7', included: true },
      { text: 'SLA garantido', included: true },
    ],
    cta: 'Assinar ENTERPRISE',
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  const handleSubscribe = async (planName: string) => {
    if (planName === 'START') {
      // Free plan - just redirect to signup
      setLocation('/register');
      return;
    }

    setLoading(planName);

    try {
      const response = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: planName,
          billingPeriod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      alert(error.message || 'Erro ao processar pagamento');
      setLoading(null);
    }
  };

  const getPrice = (plan: Plan) => {
    if (plan.price === 0) return 'Gratuito';
    
    const price = billingPeriod === 'annual' && plan.priceAnnual 
      ? plan.priceAnnual 
      : plan.price;
    
    const period = billingPeriod === 'annual' ? '/ano' : '/mês';
    
    return `US$ ${price.toLocaleString()}${period}`;
  };

  const getSavings = (plan: Plan) => {
    if (!plan.priceAnnual || billingPeriod !== 'annual') return null;
    
    const monthlyCost = plan.price * 12;
    const savings = monthlyCost - plan.priceAnnual;
    const percentage = Math.round((savings / monthlyCost) * 100);
    
    return `Economize ${percentage}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              JI
            </div>
            <div>
              <div className="font-bold text-lg">QIVO Mining</div>
              <div className="text-xs text-gray-500">ComplianceCore Mining™</div>
            </div>
          </div>
          <button
            onClick={() => setLocation('/')}
            className="text-gray-600 hover:text-gray-900"
          >
            Voltar
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Escolha o Plano Ideal para Seu Negócio
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Relatórios técnicos de mineração conformes aos padrões internacionais.
          Comece grátis ou escolha um plano profissional.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-4 bg-white rounded-full p-2 shadow-lg mb-12">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-6 py-2 rounded-full transition-all ${
              billingPeriod === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setBillingPeriod('annual')}
            className={`px-6 py-2 rounded-full transition-all ${
              billingPeriod === 'annual'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Anual
            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Economize até 20%
            </span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                plan.popular ? 'ring-4 ring-blue-600 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Mais Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                
                <div className="mb-2">
                  <span className="text-4xl font-bold">{getPrice(plan)}</span>
                </div>
                
                {getSavings(plan) && (
                  <div className="text-green-600 text-sm font-semibold">
                    {getSavings(plan)}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleSubscribe(plan.name)}
                disabled={loading === plan.name}
                className={`w-full py-3 rounded-lg font-semibold mb-6 transition-all ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                } disabled:opacity-50`}
              >
                {loading === plan.name ? 'Processando...' : plan.cta}
              </button>

              <ul className="space-y-3 text-left">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    {feature.included ? (
                      <svg
                        className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                    <span
                      className={
                        feature.included ? 'text-gray-700' : 'text-gray-400'
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto text-left">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold mb-2">
                Posso mudar de plano depois?
              </h3>
              <p className="text-gray-600">
                Sim! Você pode fazer upgrade ou downgrade a qualquer momento.
                O valor será ajustado proporcionalmente.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold mb-2">
                O que acontece se eu exceder o limite de relatórios?
              </h3>
              <p className="text-gray-600">
                Você será notificado e poderá fazer upgrade para um plano superior
                ou aguardar a renovação mensal do seu limite.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold mb-2">
                Há garantia de reembolso?
              </h3>
              <p className="text-gray-600">
                Sim! Oferecemos garantia de 30 dias. Se não ficar satisfeito,
                devolvemos seu dinheiro sem perguntas.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold mb-2">
                Quais métodos de pagamento são aceitos?
              </h3>
              <p className="text-gray-600">
                Aceitamos cartões de crédito (Visa, Mastercard, Amex) e débito
                através do Stripe, nossa plataforma de pagamentos segura.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white mt-24 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 QIVO Mining - ComplianceCore Mining™</p>
          <p className="text-sm mt-2">
            Todos os direitos reservados. Plataforma Multi-Tenant para Mineração.
          </p>
        </div>
      </footer>
    </div>
  );
}

