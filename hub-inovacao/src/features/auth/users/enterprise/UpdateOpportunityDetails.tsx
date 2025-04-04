/*
"use client";

import React, { useState } from "react";
import useSwal from "@/hooks/useSwal";
import { Opportunity } from "@/features/opportunity/opportunity.interface";
import { updateOpportunityDetails } from "@/features/opportunity/opportunity.service";

interface UpdateOpportunityDetailsProps {
  opportunity: Opportunity;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void; 
}

const UpdateOpportunityDetails = ({ opportunity, isOpen, onClose, onSave }: UpdateOpportunityDetailsProps) => {
  const { showSuccess, showError } = useSwal();
  const [formData, setFormData] = useState({
    tituloDesafio: opportunity.tituloDesafio || "",
    descricaoProblema: opportunity.descricaoProblema || "",
    areaProblema: opportunity.areaProblema || "",
    impactoProblema: opportunity.impactoProblema || "",
    solucoesTestadas: opportunity.solucoesTestadas || "",
    expectativas: opportunity.expectativas || "",
    restricoes: opportunity.restricoes || "",
    disponibilidadeDados: opportunity.disponibilidadeDados || "",
    mentoriaSuporte: opportunity.mentoriaSuporte || false,
    visitasTecnicas: opportunity.visitasTecnicas || false,
    recursosDisponiveis: opportunity.recursosDisponiveis?.join(", ") || "", // assuming an array
    autorizacao: opportunity.autorizacao || false,
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
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

        {/* Campos para edição *
        {["tituloDesafio", "descricaoProblema", "areaProblema", "impactoProblema", "solucoesTestadas", "expectativas", "restricoes", "disponibilidadeDados", "recursosDisponiveis"].map((field) => (
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

        {/* Campos booleanos (checkboxes) *
        <div className="mb-4">
          <label className="block text-sm font-medium">Mentoria Suporte</label>
          <input
            type="checkbox"
            name="mentoriaSuporte"
            checked={formData.mentoriaSuporte}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Visitas Técnicas</label>
          <input
            type="checkbox"
            name="visitasTecnicas"
            checked={formData.visitasTecnicas}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
        </div>

        {/* Campos para autorização e recursos *
        <div className="mb-4">
          <label className="block text-sm font-medium">Autorização</label>
          <input
            type="checkbox"
            name="autorizacao"
            checked={formData.autorizacao}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancelar</button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">{isLoading ? "Salvando..." : "Atualizar"}</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOpportunityDetails; */