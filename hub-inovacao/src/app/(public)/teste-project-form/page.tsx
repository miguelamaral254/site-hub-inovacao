"use client"

import { Form } from "@/components/Form/Form";
import { multiStepContext } from "@/features/projects/cadastro_projeto/StepContext";
import { useContext } from "react";

export default function Page() {
    
    const {step, setStep} = useContext(multiStepContext)

    return (
        
        <div>
            <Form step={step} setStep={setStep}/>
        </div>
        
    );
}
