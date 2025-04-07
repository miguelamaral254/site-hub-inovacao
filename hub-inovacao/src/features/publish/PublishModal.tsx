"use client";

import React, { useState } from "react";
import { Publish } from "./publish.interface";
import { updatePublishStatus } from "./publish.service";

interface PublishModalProps {
  publish: Publish;
  onClose: () => void;
  onPublishUpdated: () => void;
}

const PublishModal: React.FC<PublishModalProps> = ({
  publish,
  onClose,
  onPublishUpdated,
}) => {
  const [enabled, setEnabled] = useState(publish.enabled || false);
  const [error, setError] = useState<string>("");

  const handleSave = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/editals/${publish.id}/enabled?enabled=${enabled}`;
    console.log(`URL enviada: ${url}`);

    try {
      const response = await updatePublishStatus(publish.id!, enabled);
      console.log("Resposta da requisição:", response);
      onPublishUpdated();
      onClose();
    } catch (error) {
      console.log(error);
      setError("Erro ao atualizar o status da publicação.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h3 className="text-xl font-semibold mb-4">Editar Status da Publicação</h3>

        <div className="mb-4">
          <label htmlFor="enabled" className="block text-sm font-medium mb-2">
            Publicado
          </label>
          <input
            type="checkbox"
            id="enabled"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="enabled">Ativar Publicação</label>
        </div>

        {error && <p className="text-red-500">{error}</p>}

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

export default PublishModal;