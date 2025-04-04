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
    const typeOption = ['EXTENSÃO', "INTEGRADOR"];
    const themeOption = ["Educação", "Saúde", "Administração", "Logística"];
    const cursoOption = ["Análise e Sistemas de computação", "Sistema de Internet", "Técnico em Servidor"];

    const {formData, setFormData} = useContext(multiStepContext)
    const [error, setError] = useState(false)
    
        const handleNext = () => {
            if(formData.title || formData.projectType || formData.thematicArea || formData.justification || formData.course){
                setError(false)
                setStep(2)
            } else{
                setError(true)
            }
        }

    return (
        <form className="px-10 mt-12 relative">
            <div className="flex justify-between gap-6">
                <div className="w-full flex flex-col gap-6">
                    <Input
                        label="Título do projeto"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value })}
                    />
                
                    <Select
                        options={typeOption}
                        label="Tipo de Projeto"
                        value={formData.projectType}
                        onChange={(value) => setFormData({ ...formData, projectType: value as ProjectType})}
                    />
                    <Select
                        options={themeOption}
                        label="Área temática"
                        value={formData.thematicArea}
                        onChange={(value) => setFormData({ ...formData, thematicArea: value })}
                    />
                </div>
                <div className="w-full flex flex-col gap-6">
                    <Input
                        label="Justificativa"
                        value={formData.justification as string}
                        onChange={(e) => setFormData({...formData, justification: e.target.value })}
                    />
                    <Select
                        options={cursoOption}
                        label="Curso"
                        value={formData.course}
                        onChange={(value) => setFormData({ ...formData, course: value })}
                    />
                    
                </div>
            </div>
            

            <div className="flex w-full justify-end mt-10 gap-6">
                <ButtonGrande text="Avançar" onClick={handleNext}/>
            </div>

            {error === true &&
                <div className="w-full flex justify-end items-end mt-4">
                    <ErrorCard />
                </div>
            }
        </form>
    );
};
