/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { createOpportunity } from '@/services/opportunityService';
import { Opportunity, TypeBO, StatusSolicitation , OpportunityUpdateStatusDTO} from './OpportunityInterface';
import useSwal from '@/hooks/useSwal';

const CreateOpportunityForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [areaProblema, setAreaProblema] = useState('');
  const [description, setDescription] = useState('');
  const [impactoProblema, setImpactoProblema] = useState('');
  const [solucoesTestadas, setSolucoesTestadas] = useState('');
  const [expectativa, setExpectativa] = useState('');
  const [restricoes, setRestricoes] = useState('');
  const [restricoesDetalhes, setRestricoesDetalhes] = useState('');
  const [disponibilidadeDados, setDisponibilidadeDados] = useState('');
  const [mentoriaSuporte, setMentoriaSuporte] = useState('');
  const [visitatecnica, setVisitaTecnica] = useState('');
  const [recursosDisponiveis, setRecursosDisponiveis] = useState<string[]>([]);
  const [urlPhoto, setUrlPhoto] = useState<File | null>(null); 
  const [typeBO, setTypeBO] = useState<TypeBO>(TypeBO.OPORTUNIDADE);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState('');
  const { showSuccess, showError } = useSwal();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      if (file.size > 6 * 1024 * 1024) { // Verifica se o arquivo é maior que 6MB
        setError('O arquivo não pode ser maior que 6MB.');
        setUrlPhoto(null); // Limpa o arquivo selecionado
      } else {
        setError('');
        setUrlPhoto(file); // Salva o arquivo se a validação passar
      }
    }
  };

  const recursooptions = [
    "Materiais",
    "Infraestrutura",
    "Banco de dados"
  ]
  const handleRecursosChange = (recurso: string) => {
    setRecursosDisponiveis((prev) =>
      prev.includes(recurso)
        ? prev.filter((item) => item !== recurso) // Remove se já estiver selecionado
        : [...prev, recurso] // Adiciona se não estiver selecionado
    );
  };
  const handleSubmit = async () => {
    if (!title || !description || !urlPhoto) {
      setErrorMessage("Campos obrigatórios não preenchidos");
      return;
    }
  
    const userData = localStorage.getItem("userData");
    if (!userData) {
      setErrorMessage("Dados do usuário não encontrados.");
      return;
    }
  
    const parsedUserData = JSON.parse(userData);
    const status = StatusSolicitation.PENDENTE;
  
    const opportunityData = {
      title,
      areaProblema,
      description,
      impactoProblema,
      solucoesTestadas,
      expectativa,
      restricoes,
      restricoesDetalhes,
      disponibilidadeDados,
      mentoriaSuporte,
      visitatecnica,
      recursosDisponiveis,
      typeBO,
      authorEmail: parsedUserData.email,
      status,
      flagActive: true,
      partnerCompanyId: parsedUserData.id,
    };
  
    const formData = new FormData();
    formData.append("dto", new Blob([JSON.stringify(opportunityData)], { type: "application/json" }));
    formData.append("imageFile", urlPhoto);
  
    try {
      setIsLoading(true);
      await createOpportunity(formData);
      showSuccess("Oportunidade Criada com Sucesso!");
  
      setTitle("");
      setAreaProblema("");
      setDescription("");
      setImpactoProblema("");
      setSolucoesTestadas("");
      setExpectativa("");
      setRestricoes("");
      setRestricoesDetalhes("");
      setDisponibilidadeDados("");
      setMentoriaSuporte("");
      setVisitaTecnica("");
      setRecursosDisponiveis(prev => [...prev, "recursos"]);
      setUrlPhoto(null);
      setTypeBO(TypeBO.OPORTUNIDADE);
    } catch (error) {
      setErrorMessage("Erro ao criar oportunidade. Tente novamente.");
      showError("Erro ao criar oportunidade!");
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
          <label htmlFor="areaproblema" className="block text-sm font-medium mb-2">Área do Problema</label>
          <input
            type="text"
            id="areaproblema"
            value={areaProblema}
            onChange={(e) => setAreaProblema(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Digite a área do problema a ser resolvido."
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
          <label htmlFor="impactoproblema" className="block text-sm font-medium mb-2">Impacto do Problema</label>
          <input
            type="text"
            id="impactoProblema"
            value={impactoProblema}
            onChange={(e) => setImpactoProblema(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Digite o impacto do problema"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="solucoestestadas" className="block text-sm font-medium mb-2">Soluções Testadas</label>
          <input
            type="text"
            id="solucoestestadas"
            value={solucoesTestadas}
            onChange={(e) => setSolucoesTestadas(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Digite a solução que fooi realizada o teste"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="expectativas" className="block text-sm font-medium mb-2">Expectativas</label>
          <input
            type="text"
            id="expectativas"
            value={expectativa}
            onChange={(e) => setExpectativa(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Digite qual sua expectativa com o projeto"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="restricoes" className="block text-sm font-medium mb-2">Restrições</label>
          <div>
            {["Sim", "Não"].map((opcao) => (
                <label key={opcao} htmlFor="">
                    <input
                        type="radio"
                        id="solucoestestadas"
                        value={opcao}
                        checked={restricoes === opcao}
                        onChange={(e) => setRestricoes(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                    {opcao}
                </label>
            ))}
            </div>
        </div>

        <div className="mb-4">
          <label htmlFor="restricoesdetalhes" className="block text-sm font-medium mb-2">Detalhes das restrições</label>
          <input
            type="text"
            id="restricoesdetalhades"
            value={restricoesDetalhes}
            onChange={(e) => setRestricoesDetalhes(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Digite os detalhes das restriçoes."
          />
        </div>

        <div className="mb-4">
          <label htmlFor="disponibilidadedados" className="block text-sm font-medium mb-2">Disponibilidade de Dados</label>
          <div>
            {["Sim", "Não"].map((opcao) => (
               <label key={opcao} htmlFor="">
                    <input
                        type="radio"
                        id="disponibidadedados"
                        value={opcao}
                        checked={disponibilidadeDados === opcao}
                        onChange={(e) => setDisponibilidadeDados(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        {opcao}
                    </label>     
                ))}
            
            </div>
        </div>

        <div className="mb-4">
          <label htmlFor="mentoriasuporte" className="block text-sm font-medium mb-2">Mentorias de Suporte</label>
          <div>
            {["Sim", "Não"].map((opcao) => (
                <label key={opcao} htmlFor="">
                    <input
                        type="radio"
                        id="mentoriasuporte"
                        value={opcao}
                        checked={mentoriaSuporte === opcao}
                        onChange={(e) => setMentoriaSuporte(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        {opcao}
                </label>
            ))}
            </div>
        </div>

        <div className="mb-4">
          <label htmlFor="visitatecnica" className="block text-sm font-medium mb-2">Visitas Técnicas</label>
          <div>
            {["Sim", "Não"].map((opcao) => (
            <label key={opcao} htmlFor="">
                <input
                    type="radio"
                    id="visitatecnica"
                    value={opcao}
                    checked={visitatecnica === opcao}
                    onChange={(e) => setVisitaTecnica(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                />
                {opcao}
            </label>
            ))}
            </div>
        </div>

        <div className="mb-4">
          <label htmlFor="recursosdisponiveis" className="block text-sm font-medium mb-2">Recursos Disponíveis</label>
          <div className="flex flex-wrap gap-2">
                {recursooptions.map((recurso) => (
                <label key={recurso} className="flex items-center space-x-2">
                    <input
                    type="checkbox"
                    value={recurso}
                    checked={recursosDisponiveis.includes(recurso)}
                    onChange={() => handleRecursosChange(recurso)}
                    className="form-checkbox"
                    />
                    <span>{recurso}</span>
                </label>
                ))}
            </div>
        </div>
    
        <div className="mb-4">
          <label htmlFor="urlPhoto" className="block text-sm font-medium mb-2">Escolher Imagem</label>
          <input
            type="file"
            id="urlPhoto"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            accept="image/*"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Exibe o erro se houver */}
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