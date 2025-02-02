/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { FaFilePdf, FaExternalLinkAlt, FaUser, FaTimes } from "react-icons/fa";

interface CardOpportunityProps {
  id: string;
  title: string;
  description: string;
  urlPhoto: string;
  pdfLink: string;
  siteLink: string;
  typeBO: string;
  currentUserEmail: string;
  creationDate: string;
}

const CardOpportunity: React.FC<CardOpportunityProps> = ({
  id,
  title,
  description,
  urlPhoto,
  pdfLink,
  siteLink,
  typeBO,
  currentUserEmail,
  creationDate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'PROBLEMA':
        return 'Problema';
      case 'OPORTUNIDADE':
        return 'Oportunidade';
      case 'IDEIA':
        return 'Ideia';
      default:
        return 'Tipo de Oportunidade Desconhecido';
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[350px] h-auto bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] rounded-lg px-3 py-4 ml-[32px] transition-shadow duration-300 relative">
      <div className="flex justify-center w-full">
        <div className="mb-4">
          <img src={urlPhoto} alt={title} className="w-full h-48 object-cover rounded-md" />
        </div>
      </div>

      <div className="py-2 mt-3 mb-10">
        <h5 className="text-2xl font-bold text-gray-950">{title}</h5>
        <p className="text-gray-800 mt-4">{description}</p>
        <p className="text-gray-600 mt-4"><strong>Tipo de Oportunidade:</strong> {getTypeText(typeBO)}</p>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={handleModalToggle}
          className="text-sm text-center py-1.5 px-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition duration-200"
        >
          Conheça mais a oportunidade
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-[80%] max-w-[600px] relative">
            <button
              onClick={handleModalToggle}
              className="absolute top-2 right-2 text-2xl text-blue-500 hover:text-blue-700"
            >
              <FaTimes />
            </button>

            <div className="flex justify-center mb-4">
              <img src={urlPhoto} alt={title} className="w-full h-48 object-cover rounded-md" />
            </div>

            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <p className="mb-4">{description}</p>

            <p className="text-gray-600">Data de Criação: {creationDate}</p>
            <p className="text-gray-600">Tipo: {getTypeText(typeBO)}</p>

            <div className="flex items-center mt-4">
              <FaUser className="mr-2" />
              <div>
                <p className="text-gray-600">Email do Autor: {currentUserEmail}</p>
              </div>
            </div>

          

            {pdfLink && (
              <a
                href={pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-start gap-2 text-sm text-gray-700 py-1.5 px-3 rounded-lg mt-2"
              >
                <FaFilePdf />
                <span>PDF</span>
              </a>
            )}

            {siteLink && (
              <a
                href={siteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-start gap-2 text-sm text-gray-700 py-1.5 px-3 rounded-lg mt-2"
              >
                <FaExternalLinkAlt />
                <span>Visitar Site</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardOpportunity;