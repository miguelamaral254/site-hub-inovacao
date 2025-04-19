import { Input } from "@/components/Form/Input";

interface StepTwoProps {
  areaProblema: string;
  setAreaProblema: (value: string) => void;
  impactoProblema: string;
  setImpactoProblema: (value: string) => void;
  expectativa: string;
  setExpectativa: (value: string) => void;
  solucoesTestadas: string;
  setSolucoesTestadas: (value: string) => void;
}

export const StepTwo: React.FC<StepTwoProps> = ({
  solucoesTestadas,
  setSolucoesTestadas,
  areaProblema,
  setAreaProblema,
  impactoProblema,
  setImpactoProblema,
  expectativa,
  setExpectativa
}) => {
    return(
    <div className="flex flex-col gap-4">
        <Input 
          onChange={(e) => setAreaProblema(e.target.value)}
          value={areaProblema}
          label="Área do Problema"
          isRequired
        />

        <Input 
          onChange={(e) => setImpactoProblema(e.target.value)}
          value={impactoProblema}
          label="Impacto do Problema"
          isRequired
        />

        <Input 
          onChange={(e) => setExpectativa(e.target.value)}
          value={expectativa}
          label="Expectativas"
          isRequired
        />

        <Input 
          onChange={(e) => setSolucoesTestadas(e.target.value)}
          value={solucoesTestadas}
          label="Soluções Testadas"
          isRequired
        />
    </div>
    ) 
};