/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { JSX, useState } from "react";
import OpportunityModal from "./OpportunityModal";
import { FaLightbulb, FaExclamationTriangle, FaBriefcase } from "react-icons/fa";

interface AllOpportunitiesCardProps {
  id: string;
  tituloDesafio: string;
  descricaoProblema: string;
  urlPhoto: string;
  pdfLink: string;
  siteLink: string;
  opportunityType: "BANCO_DE_OPORTUNIDADE" | "BANCO_DE_PROBLEMA" | "BANCO_DE_IDEIA" | "DESAFIO";
  createdDate: string;
  status?: string; // Você pode adicionar o StatusSolicitation aqui se necessário
}

const typeMap: Record<AllOpportunitiesCardProps["opportunityType"], { bgColor: string; icon: JSX.Element }> = {
  BANCO_DE_OPORTUNIDADE: { bgColor: "bg-green-200", icon: <FaBriefcase className="text-green-600" /> },
  BANCO_DE_PROBLEMA: { bgColor: "bg-red-200", icon: <FaExclamationTriangle className="text-red-600" /> },
  BANCO_DE_IDEIA: { bgColor: "bg-blue-200", icon: <FaLightbulb className="text-blue-600" /> },
  DESAFIO: { bgColor: "bg-orange-200", icon: <FaBriefcase className="text-orange-600" /> },
};

const AllOpportunitiesCard: React.FC<AllOpportunitiesCardProps> = ({
  id,
  tituloDesafio,
  descricaoProblema,
  urlPhoto,
  pdfLink,
  siteLink,
  opportunityType,
  createdDate,
  status
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { bgColor, icon } = typeMap[opportunityType];

  return (
    <div className="flex flex-col w-full max-w-[350px] h-auto bg-white shadow-lg rounded-lg px-3 py-4 transition-shadow duration-300 relative">
      <div className="flex justify-center w-full mt-8">
        <img src={urlPhoto || "/default-image.jpg"} alt={tituloDesafio} className="w-full h-48 object-cover rounded-md" />
      </div>

      <div className="py-2 mt-3">
        <h5 className="text-2xl font-bold text-gray-950 truncate">{tituloDesafio}</h5>
        <p className={`text-start inline-flex items-center gap-2 mt-3 px-3 py-2 ${bgColor} text-sm rounded-3xl text-white w-auto`}>#{opportunityType}</p>
        <p className="text-gray-800 mt-2 break-words max-h-24 truncate overflow-auto">{descricaoProblema}</p>
      </div>

      <div className="mt-12"></div>

      <div className="absolute bottom-4 right-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-sm text-center py-2 px-4 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition duration-200"
        >
          Mais Informações
        </button>
      </div>

{/*
      <OpportunityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tituloDesafio={tituloDesafio}
        descricaoProblema={descricaoProblema}
        urlPhoto={urlPhoto}
        pdfLink={pdfLink}
        siteLink={siteLink}
        opportunityType={opportunityType}
        createdDate={createdDate}
        status={status}
      />
      */}
    </div>
  );
};

export default AllOpportunitiesCard;