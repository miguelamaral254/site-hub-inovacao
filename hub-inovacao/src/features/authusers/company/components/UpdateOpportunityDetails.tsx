/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { OpportunityResponseDTO } from "@/interfaces/OpportunityInterfaces";
import { updateOpportunityDetails } from "@/services/opportunityService";
import useSwal from "@/hooks/useSwal";

interface UpdateOpportunityDetailsProps {
  opportunity: OpportunityResponseDTO;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void; 
}

const UpdateOpportunityDetails = ({ opportunity, isOpen, onClose, onSave }: UpdateOpportunityDetailsProps) => {
  const { showSuccess, showError } = useSwal();
  const [formData, setFormData] = useState({
    title: opportunity.title,
    description: opportunity.description,
    urlPhoto: opportunity.urlPhoto,
    pdfLink: opportunity.pdfLink,
    siteLink: opportunity.siteLink,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await updateOpportunityDetails(opportunity.id, formData);
      showSuccess("Atualização bem-sucedida!", "Os detalhes foram atualizados com sucesso.");
      onSave();
      onClose();
    } catch (error) {
      showError("Erro ao atualizar", "Houve um problema ao atualizar a oportunidade.");
      setErrorMessage("Erro ao atualizar a oportunidade. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Editar Oportunidade</h2>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

        {["title", "description", "urlPhoto", "pdfLink", "siteLink"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-sm font-medium">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancelar</button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">{isLoading ? "Salvando..." : "Atualizar"}</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOpportunityDetails;