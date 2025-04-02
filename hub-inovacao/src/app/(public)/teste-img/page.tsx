"use client"

import { Form } from "@/components/Form/Form";
import StepContext, { multiStepContext } from "@/features/cadastro_projeto/StepContext";
import { AddTeam } from "@/features/cadastro_projeto/steps/AddTeam";
import { Feedbacks } from "@/features/cadastro_projeto/steps/Feedbacks";
import { Finalizado } from "@/features/cadastro_projeto/steps/Finalizado";
import { ProjectIdentify } from "@/features/cadastro_projeto/steps/ProjectIdentify";
import { useContext, useState } from "react";

export default function Page() {
    
    const {step, setStep} = useContext(multiStepContext)

    return (
        
        <div>
            <Form step={step} setStep={setStep}/>
        </div>
        
    );
}
