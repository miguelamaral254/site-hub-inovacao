/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { createOpportunity } from '@/services/opportunityService';
import { OpportunityResponseDTO, TypeBO, StatusSolicitation } from '@/interfaces/OpportunityInterfaces';
import useSwal from '@/hooks/useSwal';

const CreateOpportunityForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urlPhoto, setUrlPhoto] = useState<File | null>(null); 
  const [pdfLink, setPdfLink] = useState('');
  const [siteLink, setSiteLink] = useState('');
  const [typeBO, setTypeBO] = useState<TypeBO>(TypeBO.OPORTUNIDADE);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { showSuccess, showError } = useSwal();

  const handleSubmit = async () => {
    if (!title || !description || !urlPhoto) {
      setErrorMessage('Campos obrigatórios não preenchidos');
      return;
    }

    const userData = localStorage.getItem('userData');
    if (!userData) {
      setErrorMessage('Dados do usuário não encontrados.');
      return;
    }

    const parsedUserData = JSON.parse(userData);
    const status = StatusSolicitation.PENDENTE;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('urlPhoto', urlPhoto); 
    formData.append('pdfLink', pdfLink);
    formData.append('siteLink', siteLink);
    formData.append('typeBO', typeBO.toString()); 
    formData.append('authorEmail', parsedUserData.email);
    formData.append('status', StatusSolicitation[status]); 
    formData.append('flagActive', String(true));
    formData.append('partnerCompanyId', String(parsedUserData.id));
    try {
      setIsLoading(true);
      await createOpportunity(formData); 
      showSuccess('Oportunidade Criada com Sucesso!');

      setTitle('');
      setDescription('');
      setUrlPhoto(null);
      setPdfLink('');
      setSiteLink('');
      setTypeBO(TypeBO.OPORTUNIDADE);
    } catch (error) {
      setErrorMessage('Erro ao criar oportunidade. Tente novamente.');
      showError('Erro ao criar oportunidade!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Criar Oportunidade</h2>

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
            placeholder="Digite o título da oportunidade"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-2">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Descreva a oportunidade"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="urlPhoto" className="block text-sm font-medium mb-2">Escolher Imagem</label>
          <input
            type="file"
            id="urlPhoto"
            onChange={(e) => setUrlPhoto(e.target.files ? e.target.files[0] : null)}
            className="w-full p-3 border border-gray-300 rounded-md"
            accept="image/*"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="pdfLink" className="block text-sm font-medium mb-2">Link do PDF</label>
          <input
            type="text"
            id="pdfLink"
            value={pdfLink}
            onChange={(e) => setPdfLink(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="URL do PDF"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="siteLink" className="block text-sm font-medium mb-2">Link do Site</label>
          <input
            type="text"
            id="siteLink"
            value={siteLink}
            onChange={(e) => setSiteLink(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="URL do site"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="typeBO" className="block text-sm font-medium mb-2">Tipo de Oportunidade</label>
          <select
            id="typeBO"
            value={typeBO}
            onChange={(e) => setTypeBO(e.target.value as TypeBO)}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value={TypeBO.PROBLEMA}>Problema</option>
            <option value={TypeBO.OPORTUNIDADE}>Oportunidade</option>
            <option value={TypeBO.IDEIA}>Ideia</option>
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-green-500 text-white px-6 py-3 rounded-md w-full"
          >
            {isLoading ? 'Enviando...' : 'Criar Oportunidade'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOpportunityForm;