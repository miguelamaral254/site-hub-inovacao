/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { JSX, useState } from "react";
import OpportunityModal from "./OpportunityModal";
import { FaLightbulb, FaExclamationTriangle, FaBriefcase } from "react-icons/fa";

interface AllOpportunitiesCardProps {
  id: string;
  title: string;
  description: string;
  urlPhoto: string;
  pdfLink: string;
  siteLink: string;
  typeBO: "IDEIA" | "PROBLEMA" | "OPORTUNIDADE";
  currentUserEmail: string;
  creationDate: string;
  institutionOrganization: string;
}

const typeMap: Record<AllOpportunitiesCardProps["typeBO"], { bgColor: string; icon: JSX.Element }> = {
  IDEIA: { bgColor: "bg-blue-200", icon: <FaLightbulb className="text-blue-600" /> },
  PROBLEMA: { bgColor: "bg-red-200", icon: <FaExclamationTriangle className="text-red-600" /> },
  OPORTUNIDADE: { bgColor: "bg-green-200", icon: <FaBriefcase className="text-green-600" /> },
};

const AllOpportunitiesCard: React.FC<AllOpportunitiesCardProps> = ({
  id,
  title,
  description,
  urlPhoto,
  pdfLink,
  siteLink,
  typeBO,
  currentUserEmail,
  creationDate,
  institutionOrganization,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { bgColor, icon } = typeMap[typeBO];

  return (
    <div className="flex flex-col w-full max-w-[350px] h-auto bg-white shadow-lg rounded-lg px-3 py-4 transition-shadow duration-300 relative">
      
      <div className={`absolute top-0 left-0 w-full ${bgColor} text-center py-2 rounded-t-lg flex items-center justify-center gap-2`}>
        {icon} <span className="text-gray-700 text-sm font-medium">{typeBO}</span>
      </div>

      <div className="flex justify-center w-full mt-8">
        <img src={urlPhoto || "/default-image.jpg"} alt={title} className="w-full h-48 object-cover rounded-md" />
      </div>

      <div className="py-2 mt-3">
        <h5 className="text-2xl font-bold text-gray-950 truncate">{title}</h5>
        <p className="text-gray-800 mt-2 break-words max-h-24 overflow-auto">{description}</p>
      </div>

      <div className="mt-2">
        <p className="text-gray-600 text-sm font-medium">Instituição: {institutionOrganization}</p>
      </div>

      {/* Criando um espaço extra para evitar sobreposição do botão */}
      <div className="mt-12"></div>

      <div className="absolute bottom-4 right-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-sm text-center py-2 px-4 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition duration-200"
        >
          Mais Informações
        </button>
      </div>

      <OpportunityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={description}
        urlPhoto={urlPhoto}
        pdfLink={pdfLink}
        siteLink={siteLink}
        typeBO={typeBO}
        currentUserEmail={currentUserEmail}
        creationDate={creationDate}
        institutionOrganization={institutionOrganization}
      />
    </div>
  );
};

export default AllOpportunitiesCard;