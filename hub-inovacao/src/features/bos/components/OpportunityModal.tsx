/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { FaFilePdf, FaExternalLinkAlt, FaTimes, FaBuilding, FaPhoneAlt } from "react-icons/fa";

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
  pdfLink,
  siteLink,
  typeBO,
  currentUserEmail,
  creationDate,
  institutionOrganization,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-[80%] max-w-[600px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl text-blue-500 hover:text-blue-700">
          <FaTimes />
        </button>

        <div className="flex justify-center mb-4">
          <img src={urlPhoto} alt={title} className="w-full h-48 object-cover rounded-md" />
        </div>

        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="mb-4">{description}</p>

        <p className="text-gray-600">Data de Criação: {creationDate}</p>
        <div className="flex items-center mt-4">
          <FaBuilding className="mr-2" />
          <div>
            <p className="text-gray-600">Instituição: {institutionOrganization}</p>
            <p className="text-gray-600">Tipo: {typeBO}</p>
          </div>
        </div>

        <div className="flex items-center mt-4">
          <FaPhoneAlt className="mr-2" />
          <div>
            <p className="text-gray-600">Contatos:</p>
            <p className="text-gray-600">Email: {currentUserEmail}</p>
          </div>
        </div>

        {pdfLink && (
          <a href={pdfLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-700 py-1.5 px-3 rounded-lg mt-2">
            <FaFilePdf />
            <span>PDF</span>
          </a>
        )}

        {siteLink && (
          <a href={siteLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-700 py-1.5 px-3 rounded-lg mt-2">
            <FaExternalLinkAlt />
            <span>Visitar Site</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default OpportunityModal;