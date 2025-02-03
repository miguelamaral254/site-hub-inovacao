"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData: Record<string, string[]> = {
  "Incubadora i.de.i.a.S": [
    "O que é uma incubadora de empresas?",
    "Quem pode se candidatar para a incubadora?",
    "Quais são os benefícios de participar da incubadora?",
  ],
  "Projetos Acadêmicos": [
    "Como submeter um projeto?",
    "Quais os critérios de avaliação dos projetos?",
    "Há algum suporte financeiro para projetos aprovados?",
  ],
  "Banco de B.Os": [
    "Que tipo de financiamento está disponível?",
    "Como solicitar um empréstimo para meu projeto?",
    "Quais são os requisitos para abrir uma conta?",
  ],
  "Editais": [
    "Onde encontro os editais abertos?",
    "Quais são os prazos para submissão?",
    "Como posso tirar dúvidas sobre um edital específico?",
  ],
};

export default function FAQPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl text-blue-900 font-bold mb-4">Perguntas Frequentes (F.A.Q)</h1>
      <p className="text-gray-600 mb-6">
        Encontre respostas para as dúvidas mais comuns sobre nossa incubadora, projetos acadêmicos, banco de B.Os e editais.
      </p>
      {Object.keys(faqData).map((section) => (
        <div key={section} className="mb-4 border-b">
          <button
            className="w-full text-left font-semibold flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200"
            onClick={() => toggleSection(section)}
          >
            {section}
            <ChevronDown className={`transition-transform ${openSection === section ? "rotate-180" : ""}`} />
          </button>
          {openSection === section && (
            <ul className="p-4 bg-gray-50">
              {faqData[section].map((question: string, index: number) => (
                <li key={index} className="py-2 text-gray-700">• {question}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
