"use client";

import React from "react";
import { Publish } from "./publish.interface";

const PublishCard: React.FC<Publish> = ({
  
  title,
  description,
  acessLink,
createdDate
}) => {
  const truncatedDescription = description && description.length > 600 ? `${description.slice(0, 600)}...` : description;

  return (
    <div className="flex bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] mt-3
            transition-shadow duration-300 hover:shadow-[0_0px_30px_rgba(78,95,181,0.44)] rounded-lg flex-col lg:flex-row w-full md:w-[510px] h-auto py-3 px-3 items-center">
      
      <div className="ml-5 w-full flex flex-col">
        <h2 className="text-2xl font-medium text-gray-950 truncate mb-4">{title}</h2>
        <p className="text-base text-blue-800 mb-4">Publicado em: {createdDate}</p>

        <div className="flex-1 max-h-[150px] overflow-y-auto mb-4">
          <p className="text-base text-gray-800 whitespace-normal break-words">
            {truncatedDescription}
          </p>
        </div>

        <a href={acessLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-2 mb-4 text-sm">
          Acesso ao Edital
        </a>
      </div>
    </div>
  );
};

export default PublishCard;