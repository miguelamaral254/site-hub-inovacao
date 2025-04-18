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
    <>
        <div className="mb-4">
          <label htmlFor="areaproblema" className="block text-base font-medium mb-2">Área do Problema</label>
          <input
            type="text"
            id="areaproblema"
            value={areaProblema}
            onChange={(e) => setAreaProblema(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Digite a área do problema a ser resolvido."
          />
        </div>
        <div className="mb-4">
          <label htmlFor="impactoproblema" className="block text-base font-medium mb-2">Impacto do Problema</label>
          <input
            type="text"
            id="impactoProblema"
            value={impactoProblema}
            onChange={(e) => setImpactoProblema(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Digite o impacto do problema"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="expectativas" className="block text-base font-medium mb-2">Expectativas</label>
          <input
            type="text"
            id="expectativas"
            value={expectativa}
            onChange={(e) => setExpectativa(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Digite qual sua expectativa com o projeto"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="solucoestestadas" className="block text-base font-medium mb-2">Soluções Testadas</label>
          <input
            type="text"
            id="solucoestestadas"
            value={solucoesTestadas}
            onChange={(e) => setSolucoesTestadas(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Digite a solução que fooi realizada o teste"
            />
      </div>
    </>
    ) 
};