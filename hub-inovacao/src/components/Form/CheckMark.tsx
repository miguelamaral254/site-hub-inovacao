import { FaCheckCircle } from "react-icons/fa";
import { CheckCard } from "./CheckCard";


export const CheckMark = ({ step }: { step: number }) => {
    return (
      <div className="px-10 flex flex-col gap-4 justify-center items-center w-full">
        
        {/* Ícones - Desktop: mostra todos com a linha */}
        <div className="hidden md:flex items-center">
          <FaCheckCircle className="text-3xl" style={{ color: step >= 1 ? "#54AD40" : "" }} />
          <div className="h-1 w-[200px] bg-gray-400"></div>
          <FaCheckCircle className="text-3xl" style={{ color: step >= 2 ? "#54AD40" : "" }} />
          <div className="h-1 w-[200px] bg-gray-400"></div>
          <FaCheckCircle className="text-3xl" style={{ color: step >= 3 ? "#54AD40" : "" }} />
          <div className="h-1 w-[200px] bg-gray-400"></div>
          <FaCheckCircle className="text-3xl" style={{ color: step >= 4 ? "#54AD40" : "" }} />
        </div>
  
        {/* Ícones - Mobile: só o atual */}
        <div className="flex md:hidden justify-center">
          {step === 1 && <FaCheckCircle className="text-4xl" style={{ color: "#54AD40" }} />}
          {step === 2 && <FaCheckCircle className="text-4xl" style={{ color: "#54AD40" }} />}
          {step === 3 && <FaCheckCircle className="text-4xl" style={{ color: "#54AD40" }} />}
          {step === 4 && <FaCheckCircle className="text-4xl" style={{ color: "#54AD40" }} />}
        </div>
  
        {/* Cards - Desktop: todos os steps */}
        <div className="hidden md:flex gap-16">
          <CheckCard thisStep={step === 1} title="1 Etapa" description="Identificar Projeto" />
          <CheckCard thisStep={step === 2} title="2 Etapa" description="Identificar Autores" />
          <CheckCard thisStep={step === 3} title="3 Etapa" description="Detalhar Projeto" />
          <CheckCard thisStep={step === 4} title="4 Etapa" description="Enviar submissão" />
        </div>
  
        {/* Cards - Mobile: só o step atual */}
        <div className="flex md:hidden">
          {step === 1 && <CheckCard thisStep title="1 Etapa" description="Identificar Projeto" />}
          {step === 2 && <CheckCard thisStep title="2 Etapa" description="Identificar Autores" />}
          {step === 3 && <CheckCard thisStep title="3 Etapa" description="Detalhar Projeto" />}
          {step === 4 && <CheckCard thisStep title="4 Etapa" description="Enviar submissão" />}
        </div>
      </div>
    );
  };