/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Opportunity, OpportunityType } from './Opportunity';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md w-80">
      {opportunity.urlPhoto && (
        <img
          src={opportunity.urlPhoto}
          alt={opportunity.tituloDesafio}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h3 className="text-xl font-semibold mb-2">{opportunity.tituloDesafio}</h3>
      <p><span className="font-bold">Área do Problema:</span> {opportunity.areaProblema}</p>
      <p><span className="font-bold">Descrição:</span> {opportunity.descricaoProblema}</p>
      <p><span className="font-bold">Impacto:</span> {opportunity.impactoProblema}</p>
      <p><span className="font-bold">Expectativas:</span> {opportunity.expectativas}</p>
      <p><span className="font-bold">Status:</span> {opportunity.status}</p>
      <p><span className="font-bold">Tipo:</span> {opportunity.opportunityType ? OpportunityType[opportunity.opportunityType] : 'Não especificado'}</p>      {opportunity.mentoriaSuporte && <p className="text-green-500">Mentoria e Suporte disponível</p>}
      {opportunity.visitasTecnicas && <p className="text-blue-500">Visitas Técnicas disponíveis</p>}
    </div>
  );
};

export default OpportunityCard;