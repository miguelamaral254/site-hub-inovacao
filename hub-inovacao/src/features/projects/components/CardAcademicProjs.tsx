/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import ProjectModal from "./ModalAcademicProjs";

interface CardServicoProps {
  id: string;
  title: string;
  description: string;
  urlPhoto: string;
  pdfLink: string;
  siteLink: string;
  typeAP: string;
  currentUserEmail: string;
  creationDate: string;
  studentName?: string;
  professorName?: string;
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

const CardAcademicProjs: React.FC<CardServicoProps> = ({
  id,
  title,
  description,
  urlPhoto,
  pdfLink,
  siteLink,
  typeAP,
  currentUserEmail,
  creationDate,
  studentName,
  professorName,
  coauthors = [],
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const author = studentName || professorName || "Autor desconhecido";

  return (
    <div className="flex flex-col w-full max-w-[350px] h-auto bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] rounded-lg px-3 py-4 transition-shadow duration-300 relative">
      <div className="absolute top-0 left-0 w-full bg-gray-200 text-center py-1 rounded-t-lg">
        <span className="text-gray-700 text-sm font-medium">{getTypeText(typeAP)}</span>
      </div>

      <div className="flex justify-center w-full mt-6">
        <img src={urlPhoto} alt={title} className="w-full h-48 object-cover rounded-md" />
      </div>

      <div className="py-2 mt-3 mb-10">
        <h5 className="text-2xl font-bold text-gray-950">{title}</h5>
        <p className="text-gray-800 mt-4">{description}</p>
        <p className="text-gray-600 mt-4">
        </p>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-sm text-center py-1.5 px-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition duration-200"
        >
          Conheça mais o projeto
        </button>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={description}
        urlPhoto={urlPhoto}
        pdfLink={pdfLink}
        siteLink={siteLink}
        typeAP={typeAP}
        currentUserEmail={currentUserEmail}
        creationDate={creationDate}
        author={author}
        coauthors={coauthors}
      />
    </div>
  );
};

export default CardAcademicProjs;