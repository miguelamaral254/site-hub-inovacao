"use client";

import React, { useState } from "react";
import useSwal from "@/hooks/useSwal";
import { Opportunity, OpportunityType } from "./opportunity.interface";
import { createOpportunity } from "./opportunity.service";
import { StatusSolicitation } from "../projects/cadastro_projeto/ProjectInterface";

const CreateOpportunityForm: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");

  const { showSuccess, showError } = useSwal();

  const opportunityData: Opportunity = {
    tituloDesafio: title || "Automatização de Processos Internos", 
    areaProblema: "Processos Internos",
    descricaoProblema:
      "A empresa enfrenta dificuldades na automação de processos financeiros e administrativos.",
    impactoProblema:
      "A ineficiência nos processos internos resulta em atrasos e custos elevados.",
    solucoesTestadas: "Foi testado o uso de softwares de ERP, mas não atendeu às necessidades.",
    expectativas: "Esperamos melhorar a eficiência operacional e reduzir custos com a automação.",
    restricoes: "Limitação orçamentária para aquisição de novos softwares.",
    disponibilidadeDados: "Sim",
    mentoriaSuporte: true,
    visitasTecnicas: true,
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