import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { FileText, Upload as UploadIcon, AlertCircle, CheckCircle } from "lucide-react";
import UploadModal from "../components/UploadModal";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

export default function GenerateReport() {
  const [standard, setStandard] = useState<string>("JORC_2012");
  const [title, setTitle] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [locationInput, setLocationInput] = useState<string>("");
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [, navigate] = useLocation();

  const utils = trpc.useUtils();
  
  // Mutation para criar relatório
  const createReport = trpc.technicalReports.generate.create.useMutation({
    onSuccess: (data) => {
      toast.success("Relatório criado com sucesso!", {
        description: `ID: ${data.reportId}`,
      });
      // Limpar formulário
      setTitle("");
      setProjectName("");
      setLocationInput("");
      // Invalidar lista de relatórios
      utils.technicalReports.generate.list.invalidate();
    },
    onError: (error) => {
      toast.error("Erro ao criar relatório", {
        description: error.message,
      });
    },
  });

  // Query para listar relatórios (sem polling para evitar re-renders)
  const { data: reports, isLoading } = trpc.technicalReports.generate.list.useQuery(
    { limit: 10 },
    {
      refetchInterval: false,  // Desabilitar polling automático
      refetchOnWindowFocus: false,  // Não refetch ao focar janela
      staleTime: 5 * 60 * 1000,  // Considerar dados frescos por 5 minutos
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || title.length < 5) {
      toast.error("Título inválido", {
        description: "O título deve ter no mínimo 5 caracteres",
      });
      return;
    }

    createReport.mutate({
      standard: standard as any,
      title,
      projectName: projectName || undefined,
        location: locationInput || undefined,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gerar Relatório</h1>
            <p className="text-gray-600 mt-2">
              Crie relatórios técnicos estruturados conforme padrões internacionais
            </p>
          </div>
          <Button onClick={() => setShowUploadModal(true)} variant="outline">
            <UploadIcon className="h-4 w-4 mr-2" />
            Upload Externo
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Novo Relatório</h2>
            <p className="text-sm text-gray-600">
              Selecione o padrão e preencha os dados
            </p>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <p className="text-sm text-blue-700">
              ⏱️ Tempo estimado: <strong>5-10 minutos</strong>
            </p>
          </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="standard">Padrão Internacional</Label>
              <Select value={standard} onValueChange={setStandard}>
                <SelectTrigger id="standard">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JORC_2012">JORC 2012 (Austrália)</SelectItem>
                  <SelectItem value="NI_43_101">NI 43-101 (Canadá)</SelectItem>
                  <SelectItem value="PERC">PERC (Europa)</SelectItem>
                  <SelectItem value="SAMREC">SAMREC (África do Sul)</SelectItem>
                  <SelectItem value="CRIRSCO">CRIRSCO (Internacional)</SelectItem>
                  <SelectItem value="CBRR">CBRR (Brasil 🇧🇷)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Título do Relatório *</Label>
              <Input
                id="title"
                type="text"
                placeholder="Ex: Relatório Técnico - Projeto Carajás 2025"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Mínimo 5 caracteres. Seja específico para facilitar identificação.
              </p>
            </div>

            <div>
              <Label htmlFor="projectName">Nome do Projeto</Label>
              <Input
                id="projectName"
                type="text"
                placeholder="Ex: Projeto Carajás - Mina de Ferro"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                type="text"
                placeholder="Ex: Pará, Brasil | Coordenadas: -6.0°, -50.0°"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
              />
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={createReport.isPending}
              >
                {createReport.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Gerando relatório...
                  </>
                ) : (
                  "Iniciar Geração →"
                )}
              </Button>
              {!createReport.isPending && (
                <p className="text-xs text-center text-gray-500 mt-2">
                  Após criar, você poderá editar, auditar e exportar
                </p>
              )}
            </div>
          </form>
        </Card>

        <div className="text-sm text-gray-500">
          <p>
            💡 <strong>Dica:</strong> Você pode fazer upload de planilhas Excel
            preenchidas ou preencher manualmente os dados do relatório.
          </p>
        </div>

        {/* Lista de relatórios */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Relatórios Recentes</h3>
          {isLoading ? (
            <p className="text-gray-500">Carregando...</p>
          ) : reports && reports.length > 0 ? (
            <div className="space-y-3">
              {reports.map((report) => {
                const needsReview = report.status === "needs_review";
                const readyForAudit = report.status === "ready_for_audit";
                const isExternal = report.sourceType === "external";
                
                return (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{report.title}</p>
                        {isExternal && (
                          <Badge variant="secondary" className="text-xs">
                            Externo
                          </Badge>
                        )}
                        {needsReview && (
                          <Badge variant="destructive" className="bg-orange-500">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Revisão necessária
                          </Badge>
                        )}
                        {readyForAudit && (
                          <Badge variant="default" className="bg-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Pronto para auditoria
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {report.id} • {report.standard}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-gray-500">
                        {new Date(report.createdAt || "").toLocaleDateString("pt-BR")}
                      </div>
                      {needsReview && (
                        <Button
                          size="sm"
                          onClick={() => navigate(`/reports/${report.id}/review`)}
                        >
                          Revisar agora
                        </Button>
                      )}
                      {readyForAudit && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate("/reports/audit")}
                        >
                          Ir para Auditoria
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">Nenhum relatório encontrado</p>
          )}
        </Card>

        {/* Modal de Upload */}
        <UploadModal open={showUploadModal} onClose={() => setShowUploadModal(false)} />
      </div>
    </DashboardLayout>
  );
}

