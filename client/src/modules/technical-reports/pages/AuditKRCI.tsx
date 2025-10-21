import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertTriangle, FileSearch } from "lucide-react";

export default function AuditKRCI() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Auditoria & KRCI</h1>
          <p className="text-gray-600 mt-2">
            Verifique a conformidade dos relatórios com 20 regras de auditoria KRCI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Aprovados</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avisos</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileSearch className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Em análise</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Nova Auditoria</h2>
              <p className="text-sm text-gray-600">
                Selecione um relatório para executar auditoria KRCI
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
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Regras de Auditoria
              </label>
              <div className="border rounded-lg p-4 max-h-48 overflow-y-auto">
                <div className="space-y-2">
                  {[
                    "KRCI_01 - Qualidade de Dados",
                    "KRCI_02 - Método de Amostragem",
                    "KRCI_03 - Técnica de Estimativa",
                    "KRCI_04 - Modelo Geológico",
                    "KRCI_05 - Recursos Minerais",
                    "KRCI_06 - Reservas de Minério",
                    "KRCI_07 - Pessoa Competente",
                    "KRCI_08 - Informação Material",
                  ].map((rule, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">{rule}</span>
                    </label>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                20 regras disponíveis (mostrando 8)
              </p>
            </div>

            <div className="pt-4">
              <Button className="w-full">Executar Auditoria</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Auditorias Recentes</h3>
          <div className="space-y-3">
            {[
              {
                id: "AUD-001",
                report: "Projeto Alpha - JORC 2012",
                score: 87,
                status: "approved",
                date: "20/10/2025",
              },
              {
                id: "AUD-002",
                report: "Projeto Beta - NI 43-101",
                score: 72,
                status: "warning",
                date: "19/10/2025",
              },
              {
                id: "AUD-003",
                report: "Projeto Gamma - PERC",
                score: 94,
                status: "approved",
                date: "18/10/2025",
              },
            ].map((audit) => (
              <div
                key={audit.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <p className="font-medium">{audit.report}</p>
                  <p className="text-sm text-gray-600">{audit.id} • {audit.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-2xl font-bold">{audit.score}</p>
                    <p className="text-xs text-gray-600">Score</p>
                  </div>
                  <Badge
                    variant={audit.status === "approved" ? "default" : "secondary"}
                  >
                    {audit.status === "approved" ? "Aprovado" : "Atenção"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

