import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Clock, CheckCircle2, Building2 } from "lucide-react";

export default function PreCertification() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Pré-Certificação</h1>
          <p className="text-gray-600 mt-2">
            Solicite pré-certificação junto aos principais reguladores internacionais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { name: "ASX", country: "Austrália", color: "blue" },
            { name: "TSX", country: "Canadá", color: "red" },
            { name: "JSE", country: "África do Sul", color: "green" },
            { name: "CRIRSCO", country: "Internacional", color: "purple" },
          ].map((regulator) => (
            <Card key={regulator.name} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className={`h-10 w-10 rounded-lg bg-${regulator.color}-100 flex items-center justify-center`}>
                  <Building2 className={`h-5 w-5 text-${regulator.color}-600`} />
                </div>
                <div>
                  <p className="font-semibold">{regulator.name}</p>
                  <p className="text-xs text-gray-600">{regulator.country}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Solicitar
              </Button>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Nova Solicitação</h2>
              <p className="text-sm text-gray-600">
                Envie seu relatório para análise de pré-certificação
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Relatório
              </label>
              <select className="w-full border rounded-lg px-4 py-2">
                <option>Selecione um relatório...</option>
                <option>Relatório JORC 2012 - Projeto Alpha</option>
                <option>Relatório NI 43-101 - Projeto Beta</option>
                <option>Relatório PERC - Projeto Gamma</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Regulador
              </label>
              <select className="w-full border rounded-lg px-4 py-2">
                <option>Selecione o regulador...</option>
                <option>ASX - Australian Securities Exchange</option>
                <option>TSX - Toronto Stock Exchange</option>
                <option>JSE - Johannesburg Stock Exchange</option>
                <option>CRIRSCO - Committee for Mineral Reserves</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Informações Adicionais
              </label>
              <textarea
                className="w-full border rounded-lg px-4 py-2 min-h-24"
                placeholder="Adicione informações relevantes para a análise..."
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>ℹ️ Tempo estimado:</strong> 5-15 dias úteis dependendo do regulador
              </p>
            </div>

            <div className="pt-4">
              <Button className="w-full">Enviar Solicitação</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Solicitações em Andamento</h3>
          <div className="space-y-3">
            {[
              {
                id: "CERT-001",
                report: "Projeto Alpha - JORC 2012",
                regulator: "ASX",
                status: "in_progress",
                progress: 65,
                date: "15/10/2025",
                estimatedDays: 8,
              },
              {
                id: "CERT-002",
                report: "Projeto Beta - NI 43-101",
                regulator: "TSX",
                status: "pending",
                progress: 20,
                date: "18/10/2025",
                estimatedDays: 12,
              },
              {
                id: "CERT-003",
                report: "Projeto Delta - SAMREC",
                regulator: "JSE",
                status: "completed",
                progress: 100,
                date: "10/10/2025",
                estimatedDays: 0,
              },
            ].map((cert) => (
              <div
                key={cert.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-medium">{cert.report}</p>
                    <p className="text-sm text-gray-600">
                      {cert.id} • {cert.regulator} • {cert.date}
                    </p>
                  </div>
                  <Badge
                    variant={
                      cert.status === "completed"
                        ? "default"
                        : cert.status === "in_progress"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {cert.status === "completed" && (
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                    )}
                    {cert.status === "in_progress" && (
                      <Clock className="h-3 w-3 mr-1" />
                    )}
                    {cert.status === "completed"
                      ? "Concluído"
                      : cert.status === "in_progress"
                      ? "Em análise"
                      : "Pendente"}
                  </Badge>
                </div>

                {cert.status !== "completed" && (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Progresso</span>
                      <span className="font-medium">{cert.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${cert.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Estimativa: {cert.estimatedDays} dias restantes
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

