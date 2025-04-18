"use client";

import React, { useState } from "react";
import useSwal from "@/hooks/useSwal";

import { createOpportunity } from "./OpportunityService";
import { Opportunity, OpportunityType } from "./opportunity.interface";
import { StatusSolicitation } from "../core/status.interface";
import { useAuth } from "@/context/useContext";
import {StepTwo} from "./steps/opportunityfase2";
import {StepThree} from "./steps/opportunityfase3";
import { StepOne } from "./steps/opportunityfase1";
import { Resume } from "./steps/resume";

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
  const [typeopportunity, setTypeopportunity] = useState<number | "">("");
  const [disponibilidadeDados, setDisponibilidadeDados] = useState('');
  const [mentoriaSuporte, setMentoriaSuporte] = useState<boolean | null>(null);
  const [visitatecnica, setVisitaTecnica] = useState<boolean | null>(null);
  const [recursosDisponiveis, setRecursosDisponiveis] = useState<string[]>([]);  
  const [currentStep, setCurrentStep] = useState(0);
  const {user} = useAuth();
  const currentUser = user?.idUser;
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
    enterpriseId: currentUser,
    status: StatusSolicitation.PENDENTE,
  };

    const stepLabels = [
      {title: "1º Etapa", Subtitle: "Identificar a oportunidade"},
      {title: "2º Etapa", Subtitle: "Identificar o problema"},
      {title: "3º Etapa", Subtitle: "Identificar o suporte"},
      {title: "4º Etapa", Subtitle: "Resumo da oportunidade"},

    ]

    const steps = [
     () => <StepOne
      title={title}
      setTitle={setTitle}
      typeopportunity={typeopportunity}
      setTypeopportunity={setTypeopportunity}
      restricoes={restricoes}
      setRestricoes={setRestricoes}
      description={description}
      setDescription={setDescription}/>,
     () => <StepTwo 
      areaProblema={areaProblema}
      setAreaProblema={setAreaProblema}
      impactoProblema={impactoProblema}
      setImpactoProblema={setImpactoProblema}
      expectativa={expectativa}
      setExpectativa={setExpectativa}
      solucoesTestadas={solucoesTestadas}
      setSolucoesTestadas={setSolucoesTestadas}/>,
     () => <StepThree 
      disponibilidadeDados={disponibilidadeDados}
      setDisponibilidadeDados={setDisponibilidadeDados}
      mentoriaSuporte={mentoriaSuporte}
      setMentoriaSuporte={setMentoriaSuporte}
      visitatecnica={visitatecnica}
      setVisitaTecnica={setVisitaTecnica}
      recursosDisponiveis={recursosDisponiveis}
      setRecursosDisponiveis={setRecursosDisponiveis}
      imageFile={imageFile}
      setImageFile={setImageFile}/>,
      () => <Resume opportunityData={opportunityData}/>
    ];

  const handleSubmit = async () => {
    if (!imageFile) {
      setErrorMessage("A imagem da oportunidade é obrigatória");
      return;
    }
    const formData = new FormData();
    formData.append("dto", new Blob([JSON.stringify(opportunityData)], { type: "application/json" }));
    formData.append("file", imageFile);

    try {
      setIsLoading(true);
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
    <div className="mx-auto p-6">
      {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

      <div className="flex items-center justify-between mb-8 relative">
        {stepLabels.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={index} className="flex-1 flex flex-col items-center relative z-10">
              {/* Linha de conexão à direita */}
              {index < stepLabels.length - 1 && (
                <div className="absolute top-6 left-1/2 w-full h-0.5 bg-gray-300 z-0"></div>
              )}

              {/* Bolinha sempre com check */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold z-10
                  ${isCompleted ? "bg-green-500" : isActive ? "bg-orange-500" : "bg-gray-300"}`}
              >
                ✓
              </div>

              {/* Títulos */}
              <div className={`mt-2 text-center px-4 py-2 rounded-xs transition-all duration-300 ${isActive
                ? "bg-orange-600" : "bg-orange-50 opacity-60"
              }`}>
                <p className={`text-base font-light ${isActive ? "text-white" : "text-gray-500"}`}>{step.title}</p>
                <p
                  className={`text-base ${
                    isActive ? "text-orange-600 text-white font-xs" : "text-gray-500"
                  }`}
                >
                  {step.Subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
          <div>
            {steps[currentStep]()}
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
              disabled={currentStep === 0}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
              disabled={currentStep === steps.length - 1}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              Próximo
            </button>
          </div>
        {currentStep === steps.length -1 && (
          <div className="flex justify-between mt-4">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-3 rounded-md w-full hover:bg-blue-700 transition"
            >
              {isLoading ? "Enviando..." : "Criar Oportunidade"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateOpportunityForm;