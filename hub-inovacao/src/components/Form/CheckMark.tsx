import { FaCheckCircle } from "react-icons/fa";
import { CheckCard } from "./CheckCard";


export const CheckMark = ({ step }: {step: number}) => {
    return(
        <div className="px-10 flex flex-col gap-4 justify-center items-center w-full">
            <div className="flex items-center">
                <FaCheckCircle className="text-3xl" style={{ color: step >= 1 ? "#54AD40" : '' }}/>
                <div className="h-1 w-[200px] bg-gray-400"></div>
                <FaCheckCircle className="text-3xl" style={{ color: step >= 2 ? "#54AD40" : '' }}/>
                <div className="h-1 w-[200px] bg-gray-400"></div>
                <FaCheckCircle className="text-3xl" style={{ color: step >= 3 ? "#54AD40" : '' }}/>
                <div className="h-1 w-[200px] bg-gray-400"></div>
                <FaCheckCircle className="text-3xl" style={{ color: step >= 4 ? "#54AD40" : '' }}/>
            </div>

            <div className="flex gap-16">
                <CheckCard thisStep={step === 1 ? true : false} title="1 Etapa" description="Identificar Projeto"/>
                <CheckCard thisStep={step === 2 ? true : false}  title="2 Etapa" description="Identificar Autores"/>
                <CheckCard thisStep={step === 3 ? true : false} title="3 Etapa" description="Detalhar Projeto"/>
                <CheckCard thisStep={step === 4 ? true : false}  title="4 Etapa" description="Enviar submissão"/>
            </div>
        </div>
    )
}