"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData: Record<string, { question: string; answer: string }[]> = {
  "Incubadora i.de.i.a.S": [
    {
      question: "O que é uma incubadora de empresas?",
      answer:
        "Uma incubadora de empresas é um programa que oferece suporte a startups e empreendedores, fornecendo recursos como mentoria, espaço de trabalho e acesso a investimentos.",
    },
    {
      question: "Quem pode se candidatar para a incubadora?",
      answer:
        "Qualquer empreendedor ou equipe com um projeto inovador pode se candidatar. É necessário atender aos critérios estabelecidos no edital de seleção.",
    },
    {
      question: "Quais são os benefícios de participar da incubadora?",
      answer:
        "Os benefícios incluem acesso a mentores especializados, networking com investidores, suporte técnico e infraestrutura para desenvolver o negócio.",
    },
  ],
  "Projetos Acadêmicos": [
    {
      question: "Como submeter um projeto?",
      answer:
        "Os projetos podem ser submetidos através do portal acadêmico, preenchendo o formulário de inscrição e anexando os documentos exigidos.",
    },
    {
      question: "Quais os critérios de avaliação dos projetos?",
      answer:
        "Os critérios incluem inovação, viabilidade técnica, impacto social e alinhamento com os objetivos acadêmicos da instituição.",
    },
    {
      question: "Há algum suporte financeiro para projetos aprovados?",
      answer:
        "Sim, alguns projetos podem receber bolsas de incentivo ou financiamento conforme disponibilidade de recursos e aprovação da instituição.",
    },
  ],
  "Banco de B.Os": [
    {
      question: "Que tipo de financiamento está disponível?",
      answer:
        "O banco oferece microcréditos, financiamento estudantil e linhas de crédito específicas para empreendedores e startups.",
    },
    {
      question: "Como solicitar um empréstimo para meu projeto?",
      answer:
        "Você pode solicitar através do portal do banco, preenchendo um formulário e apresentando um plano de negócios detalhado.",
    },
    {
      question: "Quais são os requisitos para abrir uma conta?",
      answer:
        "Para abrir uma conta, é necessário apresentar documentos de identificação, comprovante de residência e, no caso de empresas, CNPJ e contrato social.",
    },
  ],
  "Editais": [
    {
      question: "Onde encontro os editais abertos?",
      answer:
        "Os editais estão disponíveis no site oficial da instituição e no portal acadêmico.",
    },
    {
      question: "Quais são os prazos para submissão?",
      answer:
        "Os prazos variam de acordo com cada edital. Recomendamos verificar as datas no site ou no portal de editais.",
    },
    {
      question: "Como posso tirar dúvidas sobre um edital específico?",
      answer:
        "Você pode entrar em contato com a secretaria acadêmica ou enviar um e-mail para o setor responsável pelos editais.",
    },
  ],
};

export default function FAQPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
    setOpenQuestion(null);
  };

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl text-blue-900 font-bold mb-4">Perguntas Frequentes (F.A.Q)</h1>
      <p className="text-gray-600 mb-6">
        Encontre respostas para as dúvidas mais comuns sobre nossa incubadora,
        projetos acadêmicos, banco de B.Os e editais.
      </p>
      {Object.keys(faqData).map((section) => (
        <div key={section} className="mb-4 border-b">
          <button
            className="w-full text-left font-semibold flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200"
            onClick={() => toggleSection(section)}
          >
            {section}
            <ChevronDown
              className={`transition-transform ${
                openSection === section ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === section && (
            <ul className="p-4 bg-gray-50">
              {faqData[section].map(({ question, answer }, index) => (
                <li key={index} className="py-2 text-gray-700">
                  <button
                    className="text-left w-full font-medium text-blue-700 hover:underline"
                    onClick={() => toggleQuestion(question)}
                  >
                    • {question}
                  </button>
                  {openQuestion === question && (
                    <p className="text-gray-600 mt-2 ml-4">{answer}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
