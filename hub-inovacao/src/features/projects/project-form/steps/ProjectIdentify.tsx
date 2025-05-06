import { ButtonGrande } from "@/components/Button";
import { Input } from "@/components/Form/Input";
import { Select } from "@/components/Form/Select";
import { useContext, useState } from "react";
import { ProjectType } from "../../project.interface";
import { ErrorCard } from "../ErrorCard";
import { multiStepContext } from "../StepContext";

type Props = {
    setStep: (step: number) => void
}

export const ProjectIdentify = ({ setStep }: Props) => {
    const typeOption = [
        { value: "PROJETO_EXTENSAO", label: "Projeto de Extensão" },
        { value: "PROJETO_INTEGRADOR", label: "Projeto Integrador" },
        { value: "PROJETO_INOVACAO", label: "Projeto de Inovação" },
    ];
    const themeOption = [
        { value: "Educação", label: "Educação" },
        { value: "Saúde", label: "Saúde" },
        { value: "Administração", label: "Administração" },
        { value: "Logística", label: "Logística" },
    ];
    const cursoOption = [
        { value: "Análise e Sistemas de computação", label: "Análise e Sistemas de computação" },
        { value: "Sistema de Internet", label: "Sistema de Internet" },
        { value: "Técnico em Servidor", label: "Técnico em Servidor" },
    ];

    const { formData, setFormData } = useContext(multiStepContext);
    const [error, setError] = useState(false);
    const defaultFormData = {
        title: '',
        projectType: '',
        thematicArea: '',
        course: '',
        description: '',
        siteLink: ''
    };
    const safeFormData = { ...defaultFormData, ...formData };
    const handleNext = () => {
        if (safeFormData.title && safeFormData.projectType && safeFormData.thematicArea && safeFormData.course && safeFormData.description) {
            setError(false);
            setStep(2);
        } else {
            setError(true);
        }
    };

    return (
        <form className="px-10 mt-12 relative">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="w-full flex flex-col gap-6">
                    <Input
                        label="Título do projeto"
                        value={safeFormData.title}
                        isRequired
                        onChange={(e) => setFormData({ ...safeFormData, title: e.target.value })}
                    />
                     <Input
                        label="Descrição do projeto"
                        value={safeFormData.description}
                        isRequired
                        onChange={(e) => setFormData({ ...safeFormData, description: e.target.value })}
                    />
                
                    <Select
                        options={typeOption}
                        label="Tipo de Projeto"
                        value={safeFormData.projectType}
                        onChange={(value) => setFormData({ ...safeFormData, projectType: value as ProjectType })}
                        selectText="Selecione"
                    />
                    <Select
                        options={themeOption}
                        label="Área temática"
                        value={safeFormData.thematicArea}
                        onChange={(value) => setFormData({ ...safeFormData, thematicArea: value })}
                        selectText="Selecione"
                    />
                </div>
                <div className="w-full flex flex-col gap-6">
                    
                    <Select
                        options={cursoOption}
                        label="Curso"
                        value={safeFormData.course}
                        onChange={(value) => setFormData({ ...safeFormData, course: value })}
                        selectText="Selecione"
                    />
                    <Input
                        label="Link do site"
                        value={safeFormData.siteLink}
                        onChange={(e) => setFormData({ ...safeFormData, siteLink: e.target.value })}
                    />
                </div>
            </div>

            <div className="flex w-full justify-end mt-10 gap-6">
                <ButtonGrande text="Avançar" onClick={handleNext} />
            </div>

            {error === true &&
                <div className="w-full flex justify-end items-end mt-4">
                    <ErrorCard />
                </div>
            }
        </form>
    );
};