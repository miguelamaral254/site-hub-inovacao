/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { JSX, useState } from "react";
import ProjectModal from "./ModalAcademicProjs";
import { FaFlask, FaProjectDiagram, FaUniversity } from "react-icons/fa";

interface CardServicoProps {
  id: string;
  title: string;
  description: string;
  urlPhoto: string;
  pdfLink: string;
  siteLink: string;
  typeAP: "PI" | "INOVACAO" | "EXTENSAO";
  currentUserEmail: string;
  creationDate: string;
  studentName?: string;
  professorName?: string;
  coauthors: Array<{ name: string; email: string; phone: string }> | undefined;
}

const typeMap: Record<CardServicoProps["typeAP"], { bgColor: string; icon: JSX.Element; label: string }> = {
  PI: { bgColor: "bg-purple-200", icon: <FaProjectDiagram className="text-purple-600" />, label: "Projeto de Integração" },
  INOVACAO: { bgColor: "bg-blue-200", icon: <FaFlask className="text-blue-600" />, label: "Projeto de Inovação" },
  EXTENSAO: { bgColor: "bg-green-200", icon: <FaUniversity className="text-green-600" />, label: "Projeto de Extensão" },
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
  const { bgColor, icon, label } = typeMap[typeAP];

  return (
    <div className="flex flex-col w-full max-w-[350px] h-auto bg-white shadow-lg rounded-lg px-3 py-4 transition-shadow duration-300 relative">
      
      <div className={`absolute top-0 left-0 w-full ${bgColor} text-center py-2 rounded-t-lg flex items-center justify-center gap-2`}>
        {icon} <span className="text-gray-700 text-sm font-medium">{label}</span>
      </div>

      <div className="flex justify-center w-full mt-6">
        <img src={urlPhoto} alt={title} className="w-full h-48 object-cover rounded-md" />
      </div>

      <div className="py-2 mt-3 mb-10">
        <h5 className="text-2xl font-bold text-gray-950 truncate">{title}</h5>
        <p className="text-gray-800 mt-4 break-words max-h-24 overflow-auto">{description}</p>
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