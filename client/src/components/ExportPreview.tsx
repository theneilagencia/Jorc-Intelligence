import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, FileText, Eye } from 'lucide-react';

interface ExportPreviewProps {
  reportTitle: string;
  standard: string;
  format: 'PDF' | 'DOCX' | 'XLSX';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ExportPreview({
  reportTitle,
  standard,
  format,
  onConfirm,
  onCancel,
}: ExportPreviewProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  const getFormatIcon = () => {
    switch (format) {
      case 'PDF':
        return '📄';
      case 'DOCX':
        return '📝';
      case 'XLSX':
        return '📊';
    }
  };

  const getEstimatedTime = () => {
    switch (format) {
      case 'PDF':
        return '30-60 segundos';
      case 'DOCX':
        return '45-90 segundos';
      case 'XLSX':
        return '20-40 segundos';
    }
  };

  const getSections = () => {
    const baseSections = [
      'Sumário Executivo',
      'Introdução e Contexto',
      'Localização e Acesso',
      'Geologia e Mineralização',
      'Recursos Minerais',
      'Reservas Minerais',
      'Metodologia de Estimação',
      'QA/QC e Validação',
      'Premissas Econômicas',
      'Conclusões e Recomendações',
    ];

    if (standard === 'CBRR') {
      return [
        ...baseSections,
        'Pessoa Qualificada (CREA)',
        'Processo ANM',
        'Licenciamento Ambiental',
        'Taxa CFEM',
        'Conformidade NRM-01',
      ];
    }

    return baseSections;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Eye className="h-6 w-6" />
                <h2 className="text-2xl font-bold">Preview de Exportação</h2>
              </div>
              <p className="text-blue-100">
                Revise as informações antes de gerar o arquivo final
              </p>
            </div>
            <button
              onClick={onCancel}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Document Info */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-900">
              Informações do Documento
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Título</p>
                <p className="font-medium text-gray-900">{reportTitle}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Padrão</p>
                <p className="font-medium text-gray-900">{standard}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Formato</p>
                <p className="font-medium text-gray-900 flex items-center gap-2">
                  <span>{getFormatIcon()}</span>
                  {format}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Tempo Estimado</p>
                <p className="font-medium text-gray-900">{getEstimatedTime()}</p>
              </div>
            </div>
          </div>

          {/* Sections Preview */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-900">
              Seções Incluídas ({getSections().length})
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {getSections().map((section, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-xs font-semibold">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700">{section}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CBRR Specific Info */}
          {standard === 'CBRR' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                🇧🇷 Elementos Específicos do Padrão Brasileiro (CBRR)
              </h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>✓ Registro CREA da Pessoa Qualificada</li>
                <li>✓ Número do Processo ANM</li>
                <li>✓ Licenciamento Ambiental (LP, LI, LO)</li>
                <li>✓ Taxa CFEM (Compensação Financeira)</li>
                <li>✓ Classificação: Medido, Indicado, Inferido</li>
                <li>✓ Conformidade com NRM-01 da ANM</li>
              </ul>
            </div>
          )}

          {/* Important Notes */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              ℹ️ Informações Importantes
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• O documento será gerado com formatação profissional</li>
              <li>• Todas as seções obrigatórias estão incluídas</li>
              <li>• Você poderá baixar o arquivo assim que estiver pronto</li>
              <li>• O arquivo ficará disponível por 30 dias no seu dashboard</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onCancel} disabled={loading}>
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Gerando...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Confirmar e Exportar
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

