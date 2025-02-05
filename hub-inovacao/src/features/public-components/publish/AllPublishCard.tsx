/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

interface AllPublishCardProps {
  id: string;
  title: string;
  description: string;
  photoLink: string;
  acessLink: string;
  initialDate: string;
  finalDate: string;
  publishedDate: string;
}

const AllPublishCard: React.FC<AllPublishCardProps> = ({
  
  title,
  description,
  photoLink,
  acessLink,
  
  publishedDate,
}) => {
  const truncatedDescription = description.length > 600 ? `${description.slice(0, 600)}...` : description;

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[900px] h-auto bg-white shadow-lg rounded-lg px-4 py-6 transition-shadow duration-300 hover:shadow-[0_0px_30px_rgba(78,95,181,0.44)]">
      {/* Imagem */}
      <div className="w-full lg:w-[200px] h-auto mb-4 lg:mb-0">
        <img
          src={photoLink || "/default-image.jpg"}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      
      {/* Conteúdo */}
      <div className="ml-0 lg:ml-5 w-full lg:w-[calc(100%-220px)] flex flex-col">
        <h2 className="text-xl font-medium text-gray-950 truncate">{title}</h2>
        
        <p className="text-sm text-blue-800 mt-2">
          Publicado em: {publishedDate}
        </p>

        {/* Descrição com altura máxima e rolagem */}
        <div className="flex-1 max-h-[150px] overflow-y-auto mt-3">
          <p className="text-sm text-gray-800 whitespace-normal break-words">
            {truncatedDescription}
          </p>
        </div>

        {/* Link de acesso */}
        <a href={acessLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-4 text-sm">
        Acesso ao Edital
        </a>
      </div>
    </div>
  );
};

export default AllPublishCard;