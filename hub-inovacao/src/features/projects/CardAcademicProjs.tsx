/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { JSX, useState } from "react";
import ProjectModal from "./ModalAcademicProjs";
import { FaFlask, FaProjectDiagram, FaUniversity } from "react-icons/fa";
import { ButtonGrandeSeg } from "@/components/Button";

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
  PI: { bgColor: "bg-purple-200", icon: <FaProjectDiagram className="text-purple-600" />, label: "#Projeto de Integração" },
  INOVACAO: { bgColor: "bg-blue-200", icon: <FaFlask className="text-blue-600" />, label: "#Projeto de Inovação" },
  EXTENSAO: { bgColor: "bg-green-200", icon: <FaUniversity className="text-green-600" />, label: "#Projeto de Extensão" },
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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  };
  return (
    <div className="flex flex-col w-full max-w-[390px] h-auto bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] 
    rounded-lg px-3 py-3 transition-shadow duration-300 hover:shadow-[0_0px_30px_rgba(78,95,181,0.44)] flex-grow relative">
      
      <div className="flex justify-center w-full mt-6">
        <img src={urlPhoto} alt={title} className="w-full h-48 object-cover rounded-md" />
      </div>

      <div className="py-2 mt-3 mb-10">
        <h5 className="text-2xl font-bold text-gray-950 truncate">{title}</h5>
        <p className="text-lg mt-4 text-gray-800">{formatDate(creationDate)}</p>
        <p className={`text-start inline-flex items-center gap-2 mt-3 px-3 py-2 bg-[#3355A5] text-sm rounded-3xl text-white w-auto`}>{label}</p>
        <p className="text-gray-800 mt-4 break-words max-h-24 overflow-auto">{description}</p>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <ButtonGrandeSeg text="Conheça mais o projeto" onClick={() => setIsModalOpen(true)}/>
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