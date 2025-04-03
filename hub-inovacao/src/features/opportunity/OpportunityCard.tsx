/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Opportunity, OpportunityType } from './opportunity.interface';
import OpportunityModal from './OpportunityModal';  // Importe o modal

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full max-w-[350px] h-auto bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] rounded-lg px-3 py-4 ml-[32px] transition-shadow duration-300 relative">
      {/* Imagem da Oportunidade */}
      {opportunity.urlPhoto && (
        <div className="flex justify-center w-full">
          <div className="mb-4">
            <img
              src={opportunity.urlPhoto}
              alt={opportunity.tituloDesafio}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        </div>
      )}

      {/* Título e Descrição */}
      <div className="py-2 mt-3 mb-10">
        <h5 className="text-2xl font-bold text-gray-950">{opportunity.tituloDesafio}</h5>
        <p className="text-gray-800 mt-4">{opportunity.descricaoProblema}</p>
        <p className="text-gray-600 mt-4"><strong>Área do Problema:</strong> {opportunity.areaProblema}</p>
        <p className="text-gray-600 mt-4"><strong>Impacto:</strong> {opportunity.impactoProblema}</p>
        <p className="text-gray-600 mt-4"><strong>Expectativas:</strong> {opportunity.expectativas}</p>

        {/* Exibição do Tipo de Oportunidade */}
        <p className="text-gray-600 mt-4">
          <strong>Tipo:</strong> {opportunity.opportunityType ? OpportunityType[opportunity.opportunityType as unknown as keyof typeof OpportunityType] : 'Não especificado'}
        </p>

        {opportunity.mentoriaSuporte && (
          <p className="text-green-500 mt-4">Mentoria e Suporte disponível</p>
        )}
        {opportunity.visitasTecnicas && (
          <p className="text-blue-500 mt-4">Visitas Técnicas disponíveis</p>
        )}
      </div>

      {/* Botões */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={openModal}  // Chama a função para abrir o modal
          className="text-sm text-center py-1.5 px-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition duration-200"
        >
          Conheça mais a oportunidade
        </button>
      </div>

      {/* Modal chamado aqui */}
      <OpportunityModal
  isOpen={isModalOpen}
  onClose={closeModal}
  opportunity={opportunity}  // Passando a oportunidade completa, já que o modal está configurado para usá-la diretamente
/>
    </div>
  );
};

export default OpportunityCard;