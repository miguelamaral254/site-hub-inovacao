"use client";

import { useState } from "react";
import { createPublish } from "@/services/publishService"; 
import useSwal from "@/hooks/useSwal"; 
import { PublishCreateDTO } from "@/interfaces/publishInterface";
const CreatePublishForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [acessLink, setAcessLink] = useState('');
    const [photoLink, setPhotoLink] = useState('');
    const [initialDate, setInitialDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    const { showSuccess, showError } = useSwal();
  
    // Data de Publicação automaticamente configurada para a data atual
    const publishedDate = new Date().toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
  
    const handleSubmit = async () => {
      if (!title || !description) {
        setErrorMessage("Campos obrigatórios não preenchidos");
        return;
      }
  
      // Convertendo as datas para o formato correto 'YYYY-MM-DD'
      const formattedInitialDate = new Date(initialDate).toISOString().split('T')[0];
      const formattedFinalDate = new Date(finalDate).toISOString().split('T')[0];
      const formattedPublishedDate = new Date(publishedDate).toISOString().split('T')[0];
  
      const publishData: PublishCreateDTO = {
        title,
        description,
        acessLink,
        photoLink,
        initialDate: formattedInitialDate,
        finalDate: formattedFinalDate,
        publishedDate: formattedPublishedDate, // Data de publicação já definida automaticamente
      };
  
      try {
        setIsLoading(true);
        await createPublish(publishData);
        showSuccess("Publicação Criada com Sucesso!");
  
        setTitle('');
        setDescription('');
        setAcessLink('');
        setPhotoLink('');
        setInitialDate('');
        setFinalDate('');
      } catch (error) {
        console.log(error)
        setErrorMessage("Erro ao criar publicação. Tente novamente.");
        showError("Erro ao criar publicação!");
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Criar Publicação</h2>
  
        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
  
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-2">Título</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Digite o título da publicação"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium mb-2">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Descreva a publicação"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="acessLink" className="block text-sm font-medium mb-2">Link de Acesso</label>
            <input
              type="text"
              id="acessLink"
              value={acessLink}
              onChange={(e) => setAcessLink(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="URL de acesso"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="photoLink" className="block text-sm font-medium mb-2">Link da Foto</label>
            <input
              type="text"
              id="photoLink"
              value={photoLink}
              onChange={(e) => setPhotoLink(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="URL da foto da publicação"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="initialDate" className="block text-sm font-medium mb-2">Data de Início</label>
            <input
              type="date"
              id="initialDate"
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Selecione a data de início"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="finalDate" className="block text-sm font-medium mb-2">Data Final</label>
            <input
              type="date"
              id="finalDate"
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Selecione a data final"
            />
          </div>
  
          <div className="flex justify-between mt-4">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-green-500 text-white px-6 py-3 rounded-md w-full"
            >
              {isLoading ? 'Enviando...' : 'Criar Publicação'}
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default CreatePublishForm;