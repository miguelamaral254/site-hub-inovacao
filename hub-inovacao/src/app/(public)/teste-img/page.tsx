"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import MaskedInput from "react-text-mask";
import useSwal from '@/hooks/useSwal'; 
import { createProject } from './projectFile';

interface CreateProjectFormProps {
  idUser: number;
  idManager: number;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ idUser, idManager }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { showSuccess, showError } = useSwal();

  // Mocked data
  const projectData = {
    title: "Banco de Problemas para Soluções Criativas",
    description: "Plataforma de colaboração para resolução de desafios tecnológicos.",
    urlPhoto: "https://link-para-foto-do-projeto5.com",
    pdfLink: "https://link-para-o-pdf-do-projeto5.com",
    siteLink: "https://www.sitedoproyecto5.com",
    projectType: "BANCO_DE_PROBLEMA",
    status: "PENDENTE",
    idUser: 3,   // Mocked user data (ID from props)
    idManager: 1, // Mocked manager data (ID from props)
    feedback: "Projeto aprovado para desenvolvimento.",
    justification: "Alinhamento com as necessidades do setor tecnológico.",
    enabled: true,  // Mocked enabled value
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
    
    // Adicionando o objeto mockado ao FormData
    formData.append('dto', new Blob([JSON.stringify(projectData)], { type: 'application/json' }));
    
    // Adicionando o arquivo de imagem
    formData.append('file', imageFile);
  
    // Criando um objeto simples para logar
    const formDataToLog = {
      dto: projectData,
      file: imageFile,
    };
  
    console.log('Dados enviados:', formDataToLog); // Logando os dados antes de enviar
  
    try {
      setIsLoading(true);
      await createProject(formData);  
      showSuccess('Projeto Criado com Sucesso!');
      
      // Reset form after successful submission
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