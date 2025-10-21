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
import { ArrowRightLeft, Download, FileType, RefreshCw } from "lucide-react";
import GuardRailModal from "../components/GuardRailModal";
import { useState } from "react";
import { toast } from "sonner";

export default function ExportStandards() {
  const [selectedReport, setSelectedReport] = useState<string>("");
  const [sourceStandard, setSourceStandard] = useState<string>("JORC_2012");
  const [targetStandard, setTargetStandard] = useState<string>("NI_43_101");
  const [exportFormat, setExportFormat] = useState<string>("PDF");
  const [showGuardRail, setShowGuardRail] = useState<boolean>(false);

  // Query para listar relatórios
  const { data: reports } = trpc.technicalReports.generate.list.useQuery({
    limit: 20,
  });

  // Mutation para converter
  const convertReport = trpc.technicalReports.export.convert.useMutation({
    onSuccess: (data) => {
      toast.success("Conversão iniciada!", {
        description: `ID: ${data.exportId}`,
      });
      setSelectedReport("");
    },
    onError: (error) => {
      toast.error("Erro ao converter", {
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

    if (sourceStandard === targetStandard) {
      toast.error("Padrão de origem e destino devem ser diferentes");
      return;
    }

    // GUARD-RAIL: Verificar se o relatório precisa de revisão
    const report = reports?.find((r) => r.id === selectedReport);
    if (report?.status === "needs_review") {
      setShowGuardRail(true);
      return;
    }

    convertReport.mutate({
      reportId: selectedReport,
      fromStandard: sourceStandard as any,
      toStandard: targetStandard as any,
      format: exportFormat as any,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Exportar Padrões</h1>
          <p className="text-gray-600 mt-2">
            Converta relatórios entre diferentes padrões internacionais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            { code: "JORC", name: "JORC 2012", color: "blue" },
            { code: "NI", name: "NI 43-101", color: "red" },
            { code: "PERC", name: "PERC", color: "green" },
            { code: "SAMREC", name: "SAMREC", color: "yellow" },
            { code: "CRIRSCO", name: "CRIRSCO", color: "purple" },
          ].map((standard) => (
            <Card key={standard.code} className="p-4 text-center">
              <div className={`h-12 w-12 mx-auto rounded-lg bg-${standard.color}-100 flex items-center justify-center mb-2`}>
                <FileType className={`h-6 w-6 text-${standard.color}-600`} />
              </div>
              <p className="font-semibold text-sm">{standard.name}</p>
              <p className="text-xs text-gray-600">{standard.code}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
              <ArrowRightLeft className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Converter Relatório</h2>
              <p className="text-sm text-gray-600">
                Selecione o padrão de origem e destino para conversão
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="report">Relatório de Origem</Label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="source">Padrão de Origem</Label>
                <Select value={sourceStandard} onValueChange={setSourceStandard}>
                  <SelectTrigger id="source">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JORC_2012">JORC 2012</SelectItem>
                    <SelectItem value="NI_43_101">NI 43-101</SelectItem>
                    <SelectItem value="PERC">PERC</SelectItem>
                    <SelectItem value="SAMREC">SAMREC</SelectItem>
                    <SelectItem value="CRIRSCO">CRIRSCO</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="target">Padrão de Destino</Label>
                <Select value={targetStandard} onValueChange={setTargetStandard}>
                  <SelectTrigger id="target">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JORC_2012">JORC 2012</SelectItem>
                    <SelectItem value="NI_43_101">NI 43-101</SelectItem>
                    <SelectItem value="PERC">PERC</SelectItem>
                    <SelectItem value="SAMREC">SAMREC</SelectItem>
                    <SelectItem value="CRIRSCO">CRIRSCO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="format">Formato de Exportação</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger id="format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="DOCX">DOCX</SelectItem>
                  <SelectItem value="XLSX">XLSX</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Tempo de conversão:</strong> 2-5 minutos dependendo da complexidade
              </p>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={convertReport.isPending}
              >
                {convertReport.isPending ? "Convertendo..." : "Iniciar Conversão"}
              </Button>
            </div>
          </form>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Conversões Recentes</h3>
          <div className="space-y-3">
            {[
              {
                id: "CONV-001",
                report: "Projeto Alpha",
                conversion: "JORC → NI 43-101",
                format: "PDF",
                status: "completed",
                date: "20/10/2025",
              },
              {
                id: "CONV-002",
                report: "Projeto Beta",
                conversion: "NI 43-101 → PERC",
                format: "DOCX",
                status: "processing",
                date: "21/10/2025",
              },
            ].map((conv) => (
              <div
                key={conv.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <p className="font-medium">{conv.report}</p>
                  <p className="text-sm text-gray-600">
                    {conv.id} • {conv.conversion} • {conv.format} • {conv.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {conv.status === "completed" ? (
                    <>
                      <Badge variant="default" className="bg-green-600">
                        Concluído
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar
                      </Button>
                    </>
                  ) : (
                    <Badge variant="secondary">
                      <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                      Processando
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Guard-Rail Modal */}
        <GuardRailModal
          open={showGuardRail}
          onClose={() => setShowGuardRail(false)}
          reportId={selectedReport}
          action="Exportação"
        />
      </div>
    </DashboardLayout>
  );
}

