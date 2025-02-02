import React, { useState, useEffect } from 'react';
import { createProject } from '@/services/projectService'; 
import { AcademicProjectCreateDTO } from '@/interfaces/AcademicProjectInterface';
import useSwal from '@/hooks/useSwal'; // Importando o hook do Swal

interface CreateProjectFormProps {
  isForProfessor: boolean;
  isForStudent: boolean;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ isForProfessor, isForStudent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urlPhoto, setUrlPhoto] = useState('');
  const [pdfLink, setPdfLink] = useState('');
  const [siteLink, setSiteLink] = useState('');
  const [typeAP, setTypeAP] = useState("PI");
  const [coauthors, setCoauthors] = useState([{ name: '', email: '', phone: '' }]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [userEmail, setUserEmail] = useState('');
  
  const { showSuccess, showError } = useSwal(); // Usando os métodos do Swal

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserEmail(parsedUserData.email);  // Pega o email do usuário
    }
  }, []);

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

    const projectData: AcademicProjectCreateDTO = {
      title,
      description,
      urlPhoto,
      pdfLink,
      siteLink,
      typeAP,
      userEmail, 
      status,
      coauthors: coauthors.map(coauthor => ({
        name: coauthor.name,
        email: coauthor.email,
        phone: coauthor.phone
      })),
      studentId: isForStudent ? parsedUserData.id : undefined,
      professorId: isForProfessor ? parsedUserData.id : undefined,
    };

    console.log('Projeto a ser enviado:', projectData);

    try {
      setIsLoading(true);
      const createdProject = await createProject(projectData);  
      console.log('Projeto criado com sucesso:', createdProject);

      // Exibir o sucesso usando o Swal
      showSuccess('Projeto Criado com Sucesso!');
      
      // Limpar os campos após o sucesso
      setTitle('');
      setDescription('');
      setUrlPhoto('');
      setPdfLink('');
      setSiteLink('');
      setTypeAP("PI");
      setCoauthors([{ name: '', email: '', phone: '' }]);

    } catch (error) {
      setErrorMessage('Erro ao criar projeto. Tente novamente.');
      console.error('Erro ao criar projeto:', error);
      
      // Exibir o erro usando o Swal
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
          <label htmlFor="urlPhoto" className="block text-sm font-medium mb-2">Link da Foto</label>
          <input
            type="text"
            id="urlPhoto"
            value={urlPhoto}
            onChange={(e) => setUrlPhoto(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="URL da foto do projeto"
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

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Coautores</h3>
          {coauthors.map((coauthor, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                value={coauthor.name}
                onChange={(e) => {
                  const updatedCoauthors = [...coauthors];
                  updatedCoauthors[index].name = e.target.value;
                  setCoauthors(updatedCoauthors);
                }}
                className="w-full p-3 border border-gray-300 rounded-md mb-2"
                placeholder="Nome do coautor"
              />
              <input
                type="email"
                value={coauthor.email}
                onChange={(e) => {
                  const updatedCoauthors = [...coauthors];
                  updatedCoauthors[index].email = e.target.value;
                  setCoauthors(updatedCoauthors);
                }}
                className="w-full p-3 border border-gray-300 rounded-md mb-2"
                placeholder="Email do coautor"
              />
              <input
                type="text"
                value={coauthor.phone}
                onChange={(e) => {
                  const updatedCoauthors = [...coauthors];
                  updatedCoauthors[index].phone = e.target.value;
                  setCoauthors(updatedCoauthors);
                }}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Telefone do coautor"
              />
              <button
                onClick={() => handleRemoveCoauthor(index)}
                className="text-red-600 mt-2"
              >
                Remover Coautor
              </button>
            </div>
          ))}
          <button
            onClick={handleAddCoauthor}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Adicionar Coautor
          </button>
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