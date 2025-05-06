'use client'

import {  createContext, ReactNode, useState } from "react"
import { Opportunity, OpportunityType } from "../../opportunity.interface"
import { StatusSolicitation } from "@/features/core/status.interface"

type ContextType = {
    step: number,
    setStep: (step: number) => void,
    formData: Opportunity,
    setFormData: (a: Opportunity) => void,
    finalData: Opportunity,
    setFinalData: (a: Opportunity) => void,
    submitData: () => void
}

const initialProject: Opportunity = {
    tituloDesafio: '', 
    areaProblema: '',
    descricaoProblema: '',
    impactoProblema: '',
    solucoesTestadas: '',
    expectativas: '',
    restricoes: '',
    disponibilidadeDados: '',
    mentoriaSuporte: undefined,
    visitasTecnicas: undefined,
    recursosDisponiveis: [],
    opportunityType: OpportunityType.BANCO_DE_PROBLEMA,
    status: StatusSolicitation.PENDENTE,
}

const contextInitialData: ContextType = {
    step: 1,
    setStep: () => {},
    formData: initialProject,
    setFormData: () => {},
    finalData: {} as Opportunity,
    setFinalData: () => {},
    submitData: () => {},
};

export const multiStepContext = createContext<ContextType>(contextInitialData)

const StepContext = ({ children }: { children: ReactNode }) => {

    const [step, setStep] = useState<number>(1)
    const [formData, setFormData] = useState<Opportunity>({} as Opportunity)
    const [finalData, setFinalData] = useState<Opportunity>({} as Opportunity)

    const submitData = () => {
        
    }

    return(
        <multiStepContext.Provider value={{step, setStep, formData, setFormData, finalData, setFinalData, submitData}}>
            {children}
        </multiStepContext.Provider>
        
    )
}

export default StepContext