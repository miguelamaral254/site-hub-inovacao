import { ButtonOutline, ButtonPequeno } from '@/components/Button';
import { AddTeam } from '@/features/cadastro_projeto/steps/AddTeam';
import { Feedbacks } from '@/features/cadastro_projeto/steps/Feedbacks';
import { ProjectDetails } from '@/features/cadastro_projeto/steps/ProjectDetails';
import { ReactNode, useState } from 'react';

import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";

type Props = {
    currentStep: number,
    formTitles: string[],
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
    pages?: ((props: { formData: any, setFormData: any }) => ReactNode)[];
    formData: any;
    setFormData: (data: any) => void,
    errors: any,
    setErrors: any
}

export const Form = ({ currentStep, formTitles, setCurrentStep, pages, formData, setFormData, errors, setErrors }: Props) => {
    

    const handleComplete = () => {
        const newErrors: { [key: string]: boolean } = {};
        
        Object.keys(formData).forEach(key => {
            if (String(formData[key]).trim() === "") {
                newErrors[key] = true;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            console.log('Erro: Preencha todos os campos antes de concluir!');
            return;
        }

        console.log('Formulário concluído com sucesso!', formData);
    };
    const tabChanged = ({
        prevIndex,
        nextIndex,
    }: {
        prevIndex: number;
        nextIndex: number;
    }) => {
        console.log("Step alterado:", prevIndex, "->", nextIndex);
        return true; // 🔥 Agora a mudança de step só ocorre se estiver tudo preenchido!
    };

      return (
        <main className="container mx-auto">
          <FormWizard 
            onComplete={handleComplete} 
            onTabChange={tabChanged} 
            nextButtonText='Próximo' 
            backButtonText='Voltar'
            finishButtonText='Finalizar'
        >
            <FormWizard.TabContent title="Detalhes do Projeto" icon="ti-user">
                <ProjectDetails 
                    formData={formData} 
                    setFormData={setFormData}
                    errors={errors}
                    setErrors={setErrors}
                />
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Feedbacks" icon="ti-settings">
              <Feedbacks formData={formData} setFormData={setFormData}/>
            </FormWizard.TabContent>
            <FormWizard.TabContent title="Adicionar Time" icon="ti-check">
              <AddTeam formData={formData} setFormData={setFormData}/>
            </FormWizard.TabContent>
          </FormWizard>
          {/* add style */}
          <style>{`
            @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
          `}</style>
        </main>
      );
};
