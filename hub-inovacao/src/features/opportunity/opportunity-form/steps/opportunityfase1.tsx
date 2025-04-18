import { OpportunityType } from "../../opportunity.interface";

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
  
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-2/3">
            <label htmlFor="title" className="block text-base font-medium mb-1">
              Título da Oportunidade
            </label>
            <input
              type="text"
              id="title"
              value={title}  
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Digite o título da oportunidade"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="md:w-1/3">
            <label htmlFor="typeopportunity" className="block w-md text-base font-medium mb-1">Tipos de Oportunidades</label>
            <select 
              id="typeopportunity"
              value={typeopportunity}
              onChange={(e) => {
                const selected = e.target.value;
                setTypeopportunity(selected === "" ? "" : Number(selected));
              }}
              className="border border-gray-300 rounded px-2 py-2 w-full"
            >
              <option value="">Selecione o tipo</option>
              {Object.keys(OpportunityType)
                .filter((key) => isNaN(Number(key)))
                .map((key) => (
                  <option
                    key={key}
                    value={OpportunityType[key as keyof typeof OpportunityType]}
                  >
                    {key.replace(/_/g, " ")}  
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="restricoes" className="block text-base font-medium mb-2">Restrições</label>
          <input
            type="text"
            id="restricoes"
            value={restricoes}
            onChange={(e) => setRestricoes(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Digite qual as restrições que há no projeto"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-base font-medium mb-2">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Descreva a oportunidade"
          />
        </div>
      </div>
    </>
  );
};