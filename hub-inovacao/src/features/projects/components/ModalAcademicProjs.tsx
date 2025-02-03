"use client";

import React from "react";
import { FaFilePdf, FaExternalLinkAlt, FaUser, FaTimes } from "react-icons/fa";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  urlPhoto: string;
  pdfLink: string;
  siteLink: string;
  typeAP: string;
  currentUserEmail: string;
  creationDate: string;
  author: string;
  coauthors: Array<{ name: string; email: string; phone: string }> | undefined;
}

const getTypeText = (type: string) => {
  switch (type) {
    case 'PI':
      return 'Projeto de Integração';
    case 'INOVACAO':
      return 'Projeto de Inovação';
    case 'EXTENSAO':
      return 'Projeto de Extensão';
    default:
      return 'Tipo de Projeto Desconhecido';
  }
};

const ModalAcademicProjs: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  urlPhoto,
  pdfLink,
  siteLink,
  typeAP,
  currentUserEmail,
  creationDate,
  author,
  coauthors = [],
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-blue-500 hover:text-blue-700"
        >
          <FaTimes />
        </button>

        <div className="flex justify-center mb-4">
          <img src={urlPhoto} alt={title} className="w-full h-48 object-cover rounded-md" />
        </div>

        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="mb-4">{description}</p>

        <p className="text-gray-600">Data de submissão: {creationDate}</p>
        <p className="text-gray-600">
          <strong>Tipo:</strong> {getTypeText(typeAP)}
        </p>

        <div className="flex items-center mt-4">
          <FaUser className="mr-2" />
          <div>
            <p className="text-gray-600">Autor: {author}</p>
            <p className="text-gray-600">Email do Autor: {currentUserEmail}</p>
          </div>
        </div>

        {coauthors.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Coautores:</h4>
            <div className="space-y-2">
              {coauthors.map((coauthor, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <FaUser className="text-gray-600" />
                  <div>
                    <p className="text-gray-600">{coauthor.name}</p>
                    <p className="text-sm text-gray-500">{coauthor.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-start gap-4">
          {pdfLink && (
            <a
              href={pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start gap-2 text-sm text-gray-700 py-1.5 px-3 rounded-lg border border-gray-400 hover:bg-gray-100 transition"
            >
              <FaFilePdf />
              PDF
            </a>
          )}
          {siteLink && (
            <a
              href={siteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start gap-2 text-sm text-gray-700 py-1.5 px-3 rounded-lg border border-gray-400 hover:bg-gray-100 transition"
            >
              <FaExternalLinkAlt />
              Visitar Site
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalAcademicProjs;