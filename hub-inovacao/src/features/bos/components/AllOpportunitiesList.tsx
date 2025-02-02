/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from 'react';
import { getAllOpportunities } from '@/services/opportunityService';
import { OpportunityResponseDTO } from '@/interfaces/OpportunityInterfaces';
import AllOpportunitiesCard from './AllOpportunitiesCard';

const AllOpportunitiesList: React.FC = () => {
  const [opportunities, setOpportunities] = useState<OpportunityResponseDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await getAllOpportunities();
        console.log('Oportunidades carregadas:', response);

        setOpportunities(response);
      } catch (err) {
        setError('Erro ao carregar as oportunidades');
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  if (loading) {
    return <div>Carregando oportunidades...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Oportunidades</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.length === 0 ? (
          <p className="text-gray-500">Nenhuma oportunidade encontrada.</p>
        ) : (
          opportunities.map((opportunity) => (
            <AllOpportunitiesCard
              key={opportunity.id}
              id={opportunity.id.toString()}
              title={opportunity.title}
              description={opportunity.description}
              urlPhoto={opportunity.urlPhoto || '/default-image.jpg'}
              pdfLink={opportunity.pdfLink}
              siteLink={opportunity.siteLink}
              typeBO={opportunity.typeBO}
              currentUserEmail={opportunity.authorEmail}
              creationDate={opportunity.creationDate}
              institutionOrganization={opportunity.institutionOrganization}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AllOpportunitiesList;