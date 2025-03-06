/* eslint-disable @typescript-eslint/no-unused-vars */
  "use client";
  import React, { useState } from 'react';
  //import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
  //import MaskedInput from "react-text-mask";
  import useSwal from '@/hooks/useSwal'; 
  import { createProject } from '@/features/projects/projectService';
  import { Project, ProjectType } from '@/features/projects/projectInterface';
  import { StatusSolicitation } from '@/interfaces/OpportunityInterfaces';


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
      title: "Banco de Problemas para Soluções Criativas",
      description: "Plataforma de colaboração para resolução de desafios tecnológicos.",
      urlPhoto: "https://link-para-foto-do-projeto5.com",
      pdfLink: "https://link-para-o-pdf-do-projeto5.com",
      siteLink: "https://www.sitedoproyecto5.com",
      projectType: ProjectType.BANCO_DE_PROBLEMA,
      status: StatusSolicitation.PENDENTE,
      idUser: 1,
      //idManager: idManager,
      //feedback: "Projeto aprovado para desenvolvimento.",
      //justification: "Alinhamento com as necessidades do setor tecnológico.",
      enabled: true,
      coauthors: [
        {
          name: "Felipe Costa",
          email: "felipe.costa@example.com",
          phone: "+55 11 95678-9012",
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

      console.log('Dados enviados:', formDataToSubmit); // Logando os dados antes de enviar

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
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Criar Projeto Acadêmico</h2>

        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="imageFile" className="block text-sm font-medium mb-2">Escolher Imagem</label>
            <input type="file" id="imageFile" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} className="w-full p-3 border border-gray-300 rounded-md" accept="image/*" />
          </div>

          <div className="flex justify-between mt-4">
            <button onClick={handleSubmit} disabled={isLoading} className="bg-green-500 text-white px-6 py-3 rounded-md w-full">
              {isLoading ? 'Enviando...' : 'Criar Projeto'}
            </button>
          </div>
        </form>
      </div>
    );
  };

  export default CreateProjectForm;