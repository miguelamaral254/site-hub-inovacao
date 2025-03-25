/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from 'react';
//import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
//import MaskedInput from "react-text-mask";
import useSwal from '@/hooks/useSwal'; 
import { createProject } from '@/features/cadastro_projeto/ProjectService';
import { Project, ProjectType } from '@/features/cadastro_projeto/ProjectInterface';
import { StatusSolicitation } from '@/interfaces/OpportunityInterfaces';
import { Input } from '@/components/Form/Input';
import { Select } from '@/components/Form/Select';
import { Stepper } from '@/components/Form/Stepper';
import { StepperControl } from '@/components/Form/StepperControl';
import { ProjectDetails } from './steps/ProjectDetails';
import { Feedbacks } from './steps/Feedbacks';
import { Form } from '@/components/Form/Form';



interface CreateProjectFormProps {
  idUser: number;
  idManager?: number;
}

interface FormDataToSubmit {
  dto: Project;   
  file: File | null;  
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ idUser, idManager }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { showSuccess, showError } = useSwal();

  const projectData: Project = {
    title: "jogoslegais",
    description: "Plataforma de colaboração para resolução de desafios tecnológicos.",
    urlPhoto: "https://link-para-foto-do-projeto5.com",
    pdfLink: "https://link-para-o-pdf-do-projeto5.com",
    siteLink: "https://www.sitedoproyecto5.com",
    projectType: ProjectType.BANCO_DE_PROBLEMA,
    //@ts-ignore
    status: StatusSolicitation.PENDENTE,
    idUser: 1,
    thematicArea: "Área temática",
    course: "Curso",
    problem: "Problema abordado",
    generalObjective: "Objetivo geral",
    specificObjective: "Objetivo específico",
    expectedResults: "Resultados esperados",
    //idManager: idManager,
    //feedback: "Projeto aprovado para desenvolvimento.",
    //justification: "Alinhamento com as necessidades do setor tecnológico.",
    enabled: true,
    coauthors: [
      //@ts-ignore
      {
        name: "Felipe Costa",
        email: "felipe.costa@example.com",
        phone: "+55 11 95678-9012",
        position: "tste",
        enabled: true
      }
    ]
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      setErrorMessage('A imagem do projeto é obrigatória');
      return;
    }

    const formData = new FormData();
    
    // Tipando o DTO ao passar para o FormData
    const formDataToSubmit: FormDataToSubmit = {
      dto: projectData,
      file: imageFile,
    };
    
    formData.append('dto', new Blob([JSON.stringify(projectData)], { type: 'application/json' }));
    formData.append('file', imageFile);

    console.log('Dados enviados:', formDataToSubmit); 

    try {
      setIsLoading(true);
      await createProject(formData);
      showSuccess('Projeto Criado com Sucesso!');
      setImageFile(null);
    } catch (error) {
      setErrorMessage('Erro ao criar projeto. Tente novamente.');
      showError('Erro ao criar projeto!');
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div>xxx</div>
  );
};

export default CreateProjectForm;