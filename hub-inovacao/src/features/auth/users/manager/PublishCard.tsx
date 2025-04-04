/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { PublishResponseDTO } from "@/interfaces/publishInterface";
import { FaExternalLinkAlt, FaEdit } from "react-icons/fa";

interface PublishCardProps {
  publish: PublishResponseDTO;
  onEdit: (publish: PublishResponseDTO) => void; // Função para chamar a edição
}

const PublishCard: React.FC<PublishCardProps> = ({ publish, onEdit }) => {
  return (
    <div className="flex sm:flex-row flex-col bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 transition-transform hover:scale-[1.02]">
      
      {/* Imagem à esquerda */}
      <img
        src={publish.photoLink}
        alt={publish.title}
        className="w-full sm:w-36 h-36 object-cover border-b sm:border-r sm:border-b-0 sm:h-auto"
      />

      {/* Conteúdo e botões divididos em duas colunas */}
      <div className="flex flex-col justify-between p-4 w-full">
        <div className="flex flex-col flex-grow">
          <h5 className="text-lg font-bold text-gray-900">{publish.title}</h5>
          <p className="text-sm text-gray-700 mt-2 line-clamp-3">{publish.description}</p>
          <p className="text-xs text-gray-500 mt-2">Publicado em: {publish.publishedDate}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-2 mt-4 space-y-2 sm:space-y-0">
          {/* Botão Editar */}
          <button
            onClick={() => onEdit(publish)} // Passando a publicação para a edição
            className="text-sm text-white bg-blue-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
          >
            Editar <FaEdit />
          </button>

          {/* Botão Acessar Edital */}
          <a
            href={publish.acessLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white bg-blue-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
          >
            Acessar Edital <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PublishCard;