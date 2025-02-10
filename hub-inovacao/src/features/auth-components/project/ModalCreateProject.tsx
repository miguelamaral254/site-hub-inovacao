/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FaUser, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import MaskedInput from "react-text-mask";
import { createProject } from '@/services/projectService'; 
import { AcademicProjectCreateDTO } from '@/interfaces/AcademicProjectInterface';
import useSwal from '@/hooks/useSwal'; 

interface CreateProjectFormProps {
  isForProfessor: boolean;
  isForStudent: boolean;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ isForProfessor, isForStudent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfLink, setPdfLink] = useState('');
  const [siteLink, setSiteLink] = useState('');
  const [typeAP, setTypeAP] = useState("PI");
  const [coauthors, setCoauthors] = useState<{ name: string; email: string; phone: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { showSuccess, showError } = useSwal(); 

  const handleSubmit = async () => {
    if (!title || !description) {
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
    formData.append('dto', new Blob([JSON.stringify({
      title,
      description,
      pdfLink,
      siteLink,
      typeAP,
      userEmail: parsedUserData.email,
      status,
      coauthors,
      studentId: isForStudent ? parsedUserData.id : undefined,
      professorId: isForProfessor ? parsedUserData.id : undefined,
    })], { type: 'application/json' }));
    
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }

    console.log("Enviando os seguintes dados:", Object.fromEntries(formData.entries()));
    
    try {
      setIsLoading(true);
      await createProject(formData);  
      showSuccess('Projeto Criado com Sucesso!');
      
      setTitle('');
      setDescription('');
      setImageFile(null);
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
      <h2 className="text-2xl font-semibold mb-4">Criar Projeto Acadêmico</h2>

      {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">Título</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="Digite o título do projeto" />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-2">Descrição</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="Descreva o projeto" />
        </div>

        <div className="mb-4">
          <label htmlFor="imageFile" className="block text-sm font-medium mb-2">Escolher Imagem</label>
          <input type="file" id="imageFile" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} className="w-full p-3 border border-gray-300 rounded-md" accept="image/*" />
        </div>

        <div className="mb-4">
          <label htmlFor="pdfLink" className="block text-sm font-medium mb-2">Link do PDF</label>
          <input type="text" id="pdfLink" value={pdfLink} onChange={(e) => setPdfLink(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="URL do PDF" />
        </div>

        <div className="mb-4">
          <label htmlFor="siteLink" className="block text-sm font-medium mb-2">Link do Site</label>
          <input type="text" id="siteLink" value={siteLink} onChange={(e) => setSiteLink(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="URL do site" />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <FaUser className="mr-2" /> Coautores
          </h3>
          {coauthors.map((coauthor, index) => (
            <div key={index} className="mb-4 flex items-center space-x-4">
              <input type="text" value={coauthor.name} onChange={(e) => {
                const updatedCoauthors = [...coauthors];
                updatedCoauthors[index].name = e.target.value;
                setCoauthors(updatedCoauthors);
              }} className="w-full md:w-1/3 p-3 border border-gray-300 rounded-md mb-2" placeholder="Nome do coautor" />
              
              <input 
                type="email" 
                value={coauthor.email} 
                onChange={(e) => {
                  const updatedCoauthors = [...coauthors];
                  updatedCoauthors[index].email = e.target.value;
                  setCoauthors(updatedCoauthors);
                }} 
                className="w-full md:w-1/3 p-3 border border-gray-300 rounded-md mb-2" 
                placeholder="Email do coautor"
              />

              <MaskedInput
                mask={['(', /\d/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                value={coauthor.phone}
                onChange={(e) => {
                  const updatedCoauthors = [...coauthors];
                  updatedCoauthors[index].phone = e.target.value;
                  setCoauthors(updatedCoauthors);
                }}
                className="w-full md:w-1/3 p-3 border border-gray-300 rounded-md"
                placeholder="Telefone do coautor"
              />

              <button onClick={() => handleRemoveCoauthor(index)} className="text-red-600 mt-2">
                <FaTrashAlt />
              </button>
            </div>
          ))}
          <button onClick={handleAddCoauthor} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
            <FaPlusCircle className="mr-2" /> Adicionar Coautor
          </button>
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