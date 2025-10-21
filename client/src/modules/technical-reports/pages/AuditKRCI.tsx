import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Shield, CheckCircle, AlertTriangle, FileSearch } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const KRCI_RULES = [
  "KRCI_01_DATA_QUALITY",
  "KRCI_02_SAMPLING_METHOD",
  "KRCI_03_ESTIMATION_TECHNIQUE",
  "KRCI_04_GEOLOGICAL_MODEL",
  "KRCI_05_MINERAL_RESOURCES",
  "KRCI_06_ORE_RESERVES",
  "KRCI_07_COMPETENT_PERSON",
  "KRCI_08_MATERIAL_INFORMATION",
];

export default function AuditKRCI() {
  const [selectedReport, setSelectedReport] = useState<string>("");
  const [selectedRules, setSelectedRules] = useState<string[]>(KRCI_RULES);

  // Query para listar relatórios
  const { data: reports } = trpc.technicalReports.generate.list.useQuery({
    limit: 20,
  });

  // Mutation para executar auditoria
  const runAudit = trpc.technicalReports.audit.run.useMutation({
    onSuccess: (data) => {
      toast.success("Auditoria concluída!", {
        description: `Score total: ${data.totalScore}% - ${data.rulesChecked} regras verificadas`,
      });
    },
    onError: (error) => {
      toast.error("Erro ao executar auditoria", {
        description: error.message,
      });
    },
  });

  const handleToggleRule = (rule: string) => {
    setSelectedRules((prev) =>
      prev.includes(rule) ? prev.filter((r) => r !== rule) : [...prev, rule]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedReport) {
      toast.error("Selecione um relatório");
      return;
    }

    if (selectedRules.length === 0) {
      toast.error("Selecione ao menos uma regra");
      return;
    }

    runAudit.mutate({
      reportId: selectedReport,
      rules: selectedRules,
    });
  };

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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="report">Relatório</Label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger id="report">
                  <SelectValue placeholder="Selecione um relatório..." />
                </SelectTrigger>
                <SelectContent>
                  {reports?.map((report) => (
                    <SelectItem key={report.id} value={report.id}>
                      {report.title} ({report.standard})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Regras de Auditoria</Label>
              <div className="border rounded-lg p-4 max-h-48 overflow-y-auto">
                <div className="space-y-2">
                  {KRCI_RULES.map((rule, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedRules.includes(rule)}
                        onChange={() => handleToggleRule(rule)}
                        className="rounded"
                      />
                      <span className="text-sm">
                        {rule.replace(/_/g, " ").replace("KRCI ", "KRCI_")}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {selectedRules.length} de 20 regras selecionadas
              </p>
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full"
                disabled={runAudit.isPending}
              >
                {runAudit.isPending ? "Executando..." : "Executar Auditoria"}
              </Button>
            </div>
          </form>
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

