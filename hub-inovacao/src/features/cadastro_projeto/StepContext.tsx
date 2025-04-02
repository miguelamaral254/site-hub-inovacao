'use client'

import {  createContext, ReactNode, useState } from "react"
import { Project, ProjectType, StatusSolicitation } from "./ProjectInterface"

type ContextType = {
    step: number,
    setStep: (step: number) => void,
    formData: Project,
    setFormData: (a: Project) => void,
    finalData: Project,
    setFinalData: (a: Project) => void,
    submitData: () => void
}

const initialProject: Project = {
    idUser: 1,
    title: '',
    description: '',
    urlPhoto: '',
    pdfLink: '',
    siteLink: '',
    thematicArea: '',
    course: '',
    problem: '',
    generalObjective: '',
    specificObjective: '',
    expectedResults: '',
    projectType: ProjectType.PROJETO_EXTENSAO,
    status: StatusSolicitation.PENDENTE,
    feedback: '',
    justification: '',
    enabled: true,
    coauthors: []
}

const contextInitialData: ContextType = {
    step: 1,
    setStep: () => {},
    formData: initialProject,
    setFormData: () => {},
    finalData: {} as Project,
    setFinalData: () => {},
    submitData: () => {},
};

export const multiStepContext = createContext<ContextType>(contextInitialData)

const StepContext = ({ children }: { children: ReactNode }) => {

    const [step, setStep] = useState<number>(1)
    const [formData, setFormData] = useState<Project>({} as Project)
    const [finalData, setFinalData] = useState<Project>({} as Project)

    const submitData = () => {
        
    }

    return(
        <multiStepContext.Provider value={{step, setStep, formData, setFormData, finalData, setFinalData, submitData}}>
            {children}
        </multiStepContext.Provider>
        
    )
}

export default StepContext