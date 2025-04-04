"use client";

import React, { useState } from "react";
import useSwal from "@/hooks/useSwal";
import { Opportunity, OpportunityType } from "./Opportunity";
import { StatusSolicitation } from "../cadastro_projeto/ProjectInterface";
import { createOpportunity } from "./OpportunityService";

const CreateOpportunityForm: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [areaProblema, setAreaProblema] = useState('');
  const [description, setDescription] = useState('');
  const [impactoProblema, setImpactoProblema] = useState('');
  const [solucoesTestadas, setSolucoesTestadas] = useState('');
  const [expectativa, setExpectativa] = useState('');
  const [restricoes, setRestricoes] = useState('');
  const [disponibilidadeDados, setDisponibilidadeDados] = useState('');
  const [mentoriaSuporte, setMentoriaSuporte] = useState<boolean | null>(null);
  const [visitatecnica, setVisitaTecnica] = useState<boolean | null>(null);
  const [recursosDisponiveis, setRecursosDisponiveis] = useState<string[]>([]);  

  const { showSuccess, showError } = useSwal();

  const opportunityData: Opportunity = {
    tituloDesafio: title || "Automatização de Processos Internos", 
    areaProblema: areaProblema || "Processos Internos",
    descricaoProblema:
      description || "A empresa enfrenta dificuldades na automação de processos financeiros e administrativos.",
    impactoProblema:
    impactoProblema || "A ineficiência nos processos internos resulta em atrasos e custos elevados.",
    solucoesTestadas: solucoesTestadas || "Foi testado o uso de softwares de ERP, mas não atendeu às necessidades.",
    expectativas: expectativa || "Esperamos melhorar a eficiência operacional e reduzir custos com a automação.",
    restricoes: restricoes || "Limitação orçamentária para aquisição de novos softwares.",
    disponibilidadeDados: disponibilidadeDados || "Sim",
    mentoriaSuporte: mentoriaSuporte ?? undefined,
    visitasTecnicas: visitatecnica ?? undefined,
    recursosDisponiveis: ["Materiais", "Infraestrutura", "Banco de dados"],
    autorizacao: true,
    opportunityType: OpportunityType.BANCO_DE_PROBLEMA,
    enterpriseId: 1,
    status: StatusSolicitation.APROVADA,
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      setErrorMessage("A imagem da oportunidade é obrigatória");
      return;
    }

    // Criando o FormData para enviar os dados
    const formData = new FormData();
    formData.append("dto", new Blob([JSON.stringify(opportunityData)], { type: "application/json" }));
    formData.append("file", imageFile);

    try {
      setIsLoading(true);
      // Chamada para criar a oportunidade
      await createOpportunity(formData);
      
      showSuccess("Oportunidade criada com sucesso!");
      setImageFile(null);
      setErrorMessage("");
      setTitle("");  
      setAreaProblema("");
      setDescription("");
      setImpactoProblema("");
      setSolucoesTestadas("");
      setExpectativa("");
      setRestricoes("");
      setDisponibilidadeDados("");
    } catch (error) {
      console.error(error);
      showError("Erro ao criar oportunidade.");
      setErrorMessage("Falha ao criar oportunidade. Tente novamente.");
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
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Título da Oportunidade
          </label>
          <input
            type="text"
            id="title"
            value={title}  
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Digite o título da oportunidade"
            className="w-full p-3 border border-gray-300 rounded-md"
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
          <input
            type="text"
            id="restricoes"
            value={restricoes}
            onChange={(e) => setRestricoes(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Digite qual as restrições que há no projeto"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Disponibilidade de Dados</label>
          <div className="flex gap-4">
            {["Sim", "Não"].map((opcao) => (
              <label key={opcao} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`disponibilidade-${opcao}`}
                  name="disponibilidadeDados"
                  value={opcao}
                  checked={disponibilidadeDados === opcao}
                  onChange={(e) => setDisponibilidadeDados(e.target.value)}
                  className="cursor-pointer"
                />
                {opcao}
              </label>
            ))}
          </div>
        </div>

        {[
          { label: "Mentoria e Suporte", name: "mentoriaSuporte", value: mentoriaSuporte, setter: setMentoriaSuporte },
          { label: "Visita Técnica", name: "visitaTecnica", value: visitatecnica, setter: setVisitaTecnica },
        ].map(({ label, name, value, setter }) => (
          <div key={name} className="mb-4">
            <label className="block text-sm font-medium mb-2">{label}</label>
            <div className="flex gap-4">
              {[
                { text: "Sim", boolValue: true },
                { text: "Não", boolValue: false },
              ].map(({ text, boolValue }) => (
                <label key={text}>
                  <input
                    type="radio"
                    name={name}
                    value={String(boolValue)}
                    checked={value === boolValue}
                    onChange={() => setter(boolValue)}
                  />{" "}
                  {text}
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Recursos Disponíveis</label>
          <div className="flex flex-col gap-2">
            {["Materiais", "Infraestrutura", "Banco de Dados"].map((recurso) => (
              <label key={recurso}>
                <input
                  type="checkbox"
                  value={recurso}
                  checked={recursosDisponiveis.includes(recurso)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setRecursosDisponiveis([...recursosDisponiveis, recurso]);
                    } else {
                      setRecursosDisponiveis(recursosDisponiveis.filter((r) => r !== recurso));
                    }
                  }}
                />{" "}
                {recurso}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="imageFile" className="block text-sm font-medium mb-2">
            Escolher Imagem
          </label>
          <input
            type="file"
            id="imageFile"
            accept="image/*"
            onChange={(e) =>
              setImageFile(e.target.files ? e.target.files[0] : null)
            }
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-md w-full hover:bg-blue-700 transition"
          >
            {isLoading ? "Enviando..." : "Criar Oportunidade"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOpportunityForm;