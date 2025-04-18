
import { Opportunity, OpportunityType } from "../opportunity.interface";

interface ResumeProps {
    opportunityData: Opportunity
}
const formatBoolean = (value: boolean | null | undefined) => {
    if (value === true) return "Sim";
    if (value === false) return "Não";
    return "Não informado";
  };

  const formatOpportunityType = (type: OpportunityType | undefined) => {
    switch (type) {
      case OpportunityType.BANCO_DE_PROBLEMA:
        return "Banco de Problemas";
      case OpportunityType.DESAFIO:
        return "Desafio";
      case OpportunityType.BANCO_DE_IDEIA:
        return "Banco de Ideia";
      case OpportunityType.BANCO_DE_OPORTUNIDADE:
        return "Banco de Oportunidade"
      default:
        return "Não informado";
    }
  };

export const Resume: React.FC<ResumeProps> = ({opportunityData}) => {


    return(
        <div className="px-10 flex justify-between gap-6">
            <div className="w-full flex flex-col gap-4">
                <div >
                    <h4>Título</h4>
                    <div className="border p-2 opacity-50">
                        {opportunityData.tituloDesafio}
                    </div>
                </div>
                <div>
                    <h4>Restrições</h4>
                    <div className="border p-2 opacity-50">
                        {opportunityData.restricoes}
                    </div>
                </div>
                <div>
                    <h4>Descrição do Problema</h4>
                    <div className="border p-2 opacity-50">
                        {opportunityData.descricaoProblema}
                    </div>
                </div>
                <div>
                    <h4>Tipo de Oportunidade</h4>
                    <div className="border p-2 opacity-50">
                        {formatOpportunityType(opportunityData.opportunityType)}
                    </div>
                </div>
                <div>
                    <h4>Area do Problema</h4>
                    <div className="border p-2 opacity-50">
                        {opportunityData.areaProblema}
                    </div>
                </div>
                <div>
                    <h4>Impacto do Problema</h4>
                    <div className="border p-2 opacity-50">
                        {opportunityData.impactoProblema}
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4">
                <div>
                    <h4>Expecetativas</h4>
                    <div className="border p-2 opacity-50">
                        {opportunityData.expectativas}
                    </div>
                </div>
                <div>
                    <h4>Soluções Testadas</h4>
                    <div className="border p-2 opacity-50">
                        {opportunityData.solucoesTestadas}
                    </div>
                </div>
                <div>
                    <h4>Disponibilidade de Dados</h4>
                    <div className="border p-2 opacity-50">
                        {opportunityData.disponibilidadeDados}
                    </div>
                </div>
                <div>
                    <h4>Recursos Disponíveis</h4>
                    <div className="border p-2 opacity-50">
                        {opportunityData.recursosDisponiveis?.join(", ")}
                    </div>
                </div>
                <div>
                    <h4>Suporte à mentoria</h4>
                    <div className="border p-2 opacity-50">
                        {formatBoolean(opportunityData.mentoriaSuporte)}
                    </div>
                </div>
                <div>
                    <h4>Visitas Técnicas</h4>
                    <div className="border p-2 opacity-50">
                        {formatBoolean(opportunityData.visitasTecnicas)}
                    </div>
                </div>
            </div>
        </div>
    )
}