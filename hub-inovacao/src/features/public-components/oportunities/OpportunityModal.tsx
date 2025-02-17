/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { FaTimes } from "react-icons/fa";

interface OpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  urlPhoto: string;
  pdfLink: string;
  siteLink: string;
  typeBO: string;
  currentUserEmail: string;
  creationDate: string;
  institutionOrganization: string;
}

const OpportunityModal: React.FC<OpportunityModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  urlPhoto,
  siteLink,
  typeBO,
  creationDate,
  institutionOrganization,
}) => {
  if (!isOpen) return null;
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-[80%] max-w-[600px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl text-blue-500 hover:text-blue-700">
          <FaTimes />
        </button>

        <div className="flex justify-center mb-4 mt-2">
          <img src={urlPhoto} alt={title} className="w-full h-48 object-cover rounded-md" />
        </div>

        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="mb-4 text-xl text-[#3355A5]">Data de postagem: <span className="text-black">{formatDate(creationDate)}</span></p>
        <p className="mb-4 text-xl text-[#3355A5]">Instituição: <span className="text-black"> {institutionOrganization} </span></p>
        <p className={`inline-flex text-start flex items-center mb-4 px-3 py-2 bg-[#3355A5] text-base rounded-3xl text-white w-auto`}>
          #{typeBO}
        </p>
        <p className="mb-4">{description}</p>
        
        <div className="mt-6 flex justify-start gap-4">
          {siteLink && (
            <a
              href={siteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start gap-2 text-sm text-blue-700 rounded-lg"
            >
              Link para uma página web ou protótipo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpportunityModal;