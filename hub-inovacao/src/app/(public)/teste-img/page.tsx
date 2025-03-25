"use client"

import { Form } from "@/components/Form/Form";
import { AddTeam } from "@/features/cadastro_projeto/steps/AddTeam";
import { Feedbacks } from "@/features/cadastro_projeto/steps/Feedbacks";
import { Finalizado } from "@/features/cadastro_projeto/steps/Finalizado";
import { ProjectDetails } from "@/features/cadastro_projeto/steps/ProjectDetails";
import { useState } from "react";

export default function Page() {
    const [currentStep, setCurrentStep] = useState(0);

    const [formData, setFormData] = useState({
        tituloProjeto: "",
        tipoProjeto: "",
        areaTematica: "",
        curso: "",
        justificativa: "",
        feedback: "",
        problema: "",
        objetivosGerais: "",
        objetivosEspecificos: "",
        resultadosEsperados: ""
    });

    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    const formTitle = ['Detalhes do projeto', 'Feedbacks', "Adicione a equipe", 'Finalizar'];
    // const pages = [
    //     () => <ProjectDetails formData={formData} setFormData={setFormData} />,
    //     () => <Feedbacks formData={formData} setFormData={setFormData} />,
    //     () => <AddTeam formData={formData} setFormData={setFormData} />,
    //     () => <Finalizado formData={formData} />
    // ];

    return (
        <div>
            <Form
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                formTitles={formTitle}
                // pages={pages}
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
            />
        </div>
    );
}
