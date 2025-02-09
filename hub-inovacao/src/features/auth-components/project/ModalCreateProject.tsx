/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FaUser, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import { createProject } from '@/services/projectService'; 
import useSwal from '@/hooks/useSwal'; 

interface CreateProjectFormProps {
  isForProfessor: boolean;
  isForStudent: boolean;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ isForProfessor, isForStudent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urlPhoto, setUrlPhoto] = useState<File | null>(null); // Aceita arquivo
  const [pdfLink, setPdfLink] = useState('');
  const [siteLink, setSiteLink] = useState('');
  const [typeAP, setTypeAP] = useState("PI");
  const [coauthors, setCoauthors] = useState<{ name: string; email: string; phone: string }[]>([]);
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
    const status = 'PENDENTE'; 

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('urlPhoto', urlPhoto); // Agora aceita imagem
    formData.append('pdfLink', pdfLink);
    formData.append('siteLink', siteLink);
    formData.append('typeAP', typeAP);
    formData.append('userEmail', parsedUserData.email);
    formData.append('status', status);
    formData.append('coauthors', JSON.stringify(coauthors)); 
    if (isForStudent) formData.append('studentId', String(parsedUserData.id));
    if (isForProfessor) formData.append('professorId', String(parsedUserData.id));

    try {
      setIsLoading(true);
      await createProject(formData);  
      showSuccess('Projeto Criado com Sucesso!');
      
      // Limpar os campos após o sucesso
      setTitle('');
      setDescription('');
      setUrlPhoto(null);
      setPdfLink('');
      setSiteLink('');
      setTypeAP("PI");
      setCoauthors([]);

    } catch (error) {
      setErrorMessage('Erro ao criar projeto. Tente novamente.');
      showError('Erro ao criar projeto!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCoauthor = () => {
    setCoauthors([...coauthors, { name: '', email: '', phone: '' }]);
  };

  const handleRemoveCoauthor = (index: number) => {
    setCoauthors(coauthors.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">
        {isForProfessor
          ? 'Criar Projeto Acadêmico para Professor'
          : isForStudent
          ? 'Criar Projeto Acadêmico para Aluno'
          : 'Criar Projeto Acadêmico'}
      </h2>

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
            placeholder="Digite o título do projeto"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-2">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Descreva o projeto"
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
          <label htmlFor="typeAP" className="block text-sm font-medium mb-2">Tipo de Projeto</label>
          <select
            id="typeAP"
            value={typeAP}
            onChange={(e) => setTypeAP(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="PI">Projeto de Integração</option>
            <option value="EXTENSAO">Projeto de Extensão</option>
            <option value="INOVACAO">Projeto de Inovação</option>
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-green-500 text-white px-6 py-3 rounded-md w-full"
          >
            {isLoading ? 'Enviando...' : 'Criar Projeto'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;