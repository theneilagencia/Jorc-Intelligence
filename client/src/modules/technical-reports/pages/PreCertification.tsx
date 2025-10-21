import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Award, Clock, CheckCircle2, Building2 } from "lucide-react";
import GuardRailModal from "../components/GuardRailModal";
import { useState } from "react";
import { toast } from "sonner";

export default function PreCertification() {
  const [selectedReport, setSelectedReport] = useState<string>("");
  const [selectedRegulator, setSelectedRegulator] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [showGuardRail, setShowGuardRail] = useState<boolean>(false);

  // Query para listar relatórios
  const { data: reports } = trpc.technicalReports.generate.list.useQuery({
    limit: 20,
  });

  // Mutation para solicitar pré-certificação
  const requestCert = trpc.technicalReports.precert.request.useMutation({
    onSuccess: (data) => {
      toast.success("Solicitação enviada!", {
        description: `Prazo estimado: ${data.estimatedDays} dias úteis`,
      });
      setSelectedReport("");
      setSelectedRegulator("");
      setAdditionalInfo("");
    },
    onError: (error) => {
      toast.error("Erro ao enviar solicitação", {
        description: error.message,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedReport) {
      toast.error("Selecione um relatório");
      return;
    }

    if (!selectedRegulator) {
      toast.error("Selecione um regulador");
      return;
    }

    // GUARD-RAIL: Verificar se o relatório precisa de revisão
    const report = reports?.find((r) => r.id === selectedReport);
    if (report?.status === "needs_review") {
      setShowGuardRail(true);
      return;
    }

    requestCert.mutate({
      reportId: selectedReport,
      regulator: selectedRegulator as any,
      additionalInfo: additionalInfo || undefined,
    });
  };

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
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setSelectedRegulator(regulator.name)}
              >
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
              <Label htmlFor="regulator">Regulador</Label>
              <Select value={selectedRegulator} onValueChange={setSelectedRegulator}>
                <SelectTrigger id="regulator">
                  <SelectValue placeholder="Selecione um regulador..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ASX">ASX - Austrália</SelectItem>
                  <SelectItem value="TSX">TSX - Canadá</SelectItem>
                  <SelectItem value="JSE">JSE - África do Sul</SelectItem>
                  <SelectItem value="CRIRSCO">CRIRSCO - Internacional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="additionalInfo">Informações Adicionais (opcional)</Label>
              <Textarea
                id="additionalInfo"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Descreva informações relevantes para a análise..."
                rows={4}
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-900">
                <strong>Tempo estimado:</strong> 5-15 dias úteis após submissão
              </p>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={requestCert.isPending}
              >
                {requestCert.isPending ? "Enviando..." : "Enviar Solicitação"}
              </Button>
            </div>
          </form>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Solicitações em Andamento</h3>
          <div className="space-y-3">
            {[
              {
                id: "CERT-001",
                report: "Projeto Alpha - JORC 2012",
                regulator: "ASX",
                progress: 65,
                status: "in_progress",
                date: "15/10/2025",
              },
              {
                id: "CERT-002",
                report: "Projeto Beta - NI 43-101",
                regulator: "TSX",
                progress: 30,
                status: "in_progress",
                date: "18/10/2025",
              },
            ].map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <p className="font-medium">{cert.report}</p>
                  <p className="text-sm text-gray-600">
                    {cert.id} • {cert.regulator} • {cert.date}
                  </p>
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${cert.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{cert.progress}%</span>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">Em análise</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Guard-Rail Modal */}
        <GuardRailModal
          open={showGuardRail}
          onClose={() => setShowGuardRail(false)}
          reportId={selectedReport}
          action="Pré-Certificação"
        />
      </div>
    </DashboardLayout>
  );
}

