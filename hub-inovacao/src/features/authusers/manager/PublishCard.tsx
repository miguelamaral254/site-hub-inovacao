/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { PublishResponseDTO } from "@/interfaces/publishInterface";
import { FaExternalLinkAlt } from "react-icons/fa";

interface PublishCardProps {
  publish: PublishResponseDTO;
}

const PublishCard: React.FC<PublishCardProps> = ({ publish }) => {
  return (
    <div className="flex flex-col w-full max-w-[350px] h-auto bg-white shadow-lg rounded-lg px-3 py-4 transition-shadow duration-300 relative">
      <div className="flex justify-center w-full">
        <div className="mb-4 mt-5">
          <img
            src={publish.photoLink}
            alt={publish.title}
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
      </div>

      <div className="py-2 mt-3 mb-10">
        <h5 className="text-2xl font-bold text-gray-950">{publish.title}</h5>
        <p className="text-gray-800 mt-4 break-words max-h-24 overflow-auto">
          {publish.description}
        </p>
      </div>

      <div className="absolute bottom-4 right-4 flex">
        <a
          href={publish.acessLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-center py-1.5 px-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-200 flex items-center gap-2"
        >
          Acessar <FaExternalLinkAlt />
        </a>
      </div>
    </div>
  );
};

export default PublishCard;