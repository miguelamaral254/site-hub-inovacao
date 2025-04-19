import { Input } from "@/components/Form/Input";
import { OpportunityType } from "../../opportunity.interface";
import { Select } from "@/components/Form/Select";

interface StepOneProps {
  title: string;
  setTitle: (value: string) => void;
  typeopportunity: number | "";
  setTypeopportunity: (value: number | "") => void;
  restricoes: string;
  setRestricoes: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
}

export const StepOne: React.FC<StepOneProps> = ({
  title,
  setTitle,
  typeopportunity,
  setTypeopportunity,
  restricoes,
  setRestricoes,
  description,
  setDescription,
}) => {

  const typeOption = [
    { value: "BANCO_DE_OPORTUNIDADE", label: "Banco de Oportunidade" },
    { value: "BANCO_DE_PROBLEMA", label: "Banco de Problema" },
    { value: "BANCO_DE_IDEIA", label: "Bando de Ideia" },
    { value: "DESAFIO", label: "Desafio" },
];

const opportunityTypeOptions = Object.keys(OpportunityType)
  .filter((key) => isNaN(Number(key))) // filtra só as chaves (nomes)
  .map((key) => ({
    value: OpportunityType[key as keyof typeof OpportunityType].toString(),
    label: key.replace(/_/g, " ").toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, l => l.toUpperCase()),
  }));
  
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Input 
            onChange={(e) => setTitle(e.target.value)}
            label="Título da Oportunidade"
            value={title}
            isRequired
          />
          
          <Select
            options={opportunityTypeOptions}
            label="Tipo de Oportunidade"
            value={typeopportunity.toString()}
            onChange={(value) => setTypeopportunity(value === "" ? "" : Number(value))}
            selectText="Selecione"
          />

        </div>
        
        <Input 
            onChange={(e) => setRestricoes(e.target.value)}
            label="Restrições"
            value={restricoes}
            isRequired
          />

        <Input 
            onChange={(e) => setDescription(e.target.value)}
            label="Descrição"
            value={description}
            isRequired
            isBig
          />
      </div>
    </>
  );
};