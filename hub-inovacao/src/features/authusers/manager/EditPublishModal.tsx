"use client";

import React, { useState } from "react";
import { PublishResponseDTO } from "@/interfaces/publishInterface";

interface EditPublishModalProps {
  publish: PublishResponseDTO;
  onClose: () => void;
}

const EditPublishModal: React.FC<EditPublishModalProps> = ({ publish, onClose }) => {
  const [title, setTitle] = useState(publish.title);
  const [description, setDescription] = useState(publish.description);
  const [acessLink, setAcessLink] = useState(publish.acessLink);
  const [photoLink, setPhotoLink] = useState(publish.photoLink);
  const [initialDate, setInitialDate] = useState(publish.initialDate);
  const [finalDate, setFinalDate] = useState(publish.finalDate);

  const handleSave = () => {
    // Função para salvar as alterações
    console.log("Publicação atualizada:", { title, description, acessLink, photoLink, initialDate, finalDate });
    onClose(); // Fecha o modal após salvar
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h3 className="text-xl font-semibold mb-4">Editar Publicação</h3>
        
        {/* Campo Título */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Campo Descrição */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-2">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Campo Link de Acesso */}
        <div className="mb-4">
          <label htmlFor="acessLink" className="block text-sm font-medium mb-2">Link de Acesso</label>
          <input
            type="text"
            id="acessLink"
            value={acessLink}
            onChange={(e) => setAcessLink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Campo Link da Foto */}
        <div className="mb-4">
          <label htmlFor="photoLink" className="block text-sm font-medium mb-2">Link da Foto</label>
          <input
            type="text"
            id="photoLink"
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Campo Data de Início */}
        <div className="mb-4">
          <label htmlFor="initialDate" className="block text-sm font-medium mb-2">Data de Início</label>
          <input
            type="date"
            id="initialDate"
            value={initialDate}
            onChange={(e) => setInitialDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Campo Data Final */}
        <div className="mb-4">
          <label htmlFor="finalDate" className="block text-sm font-medium mb-2">Data Final</label>
          <input
            type="date"
            id="finalDate"
            value={finalDate}
            onChange={(e) => setFinalDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Botões Salvar e Cancelar */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Salvar
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPublishModal;