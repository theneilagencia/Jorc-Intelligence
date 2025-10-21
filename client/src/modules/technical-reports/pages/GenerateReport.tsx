import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function GenerateReport() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gerar Relatório</h1>
          <p className="text-gray-600 mt-2">
            Crie relatórios técnicos estruturados conforme padrões internacionais
          </p>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Novo Relatório</h2>
              <p className="text-sm text-gray-600">
                Selecione o padrão e preencha os dados
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Padrão Internacional
              </label>
              <select className="w-full border rounded-lg px-4 py-2">
                <option>JORC 2012</option>
                <option>NI 43-101</option>
                <option>PERC</option>
                <option>SAMREC</option>
                <option>CRIRSCO</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Título do Relatório
              </label>
              <input
                type="text"
                placeholder="Ex: Relatório de Recursos Minerais - Projeto XYZ"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div className="pt-4">
              <Button className="w-full">Iniciar Geração</Button>
            </div>
          </div>
        </Card>

        <div className="text-sm text-gray-500">
          <p>
            💡 <strong>Dica:</strong> Você pode fazer upload de planilhas Excel
            preenchidas ou preencher manualmente os dados do relatório.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

