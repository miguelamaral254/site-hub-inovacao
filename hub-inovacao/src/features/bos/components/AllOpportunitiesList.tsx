/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from 'react';
import { getAllOpportunities } from '@/services/opportunityService';
import { OpportunityResponseDTO } from '@/interfaces/OpportunityInterfaces';
import AllOpportunitiesCard from './AllOpportunitiesCard';
import NameFilter from '@/components/NameFilter';

interface AllOpportunitiesListProps {
  visibleOpportunities: number;
  filterType: string | null;
}

const typeMap: Record<string, string> = {
  "Oportunidades": "OPORTUNIDADE",
  "Problemas": "PROBLEMA",
  "Ideias": "IDEIA",
};

const AllOpportunitiesList: React.FC<AllOpportunitiesListProps> = ({ visibleOpportunities, filterType }) => {
  const [opportunities, setOpportunities] = useState<OpportunityResponseDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [nameFilter, setNameFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await getAllOpportunities();
        setOpportunities(response);
      } catch (err) {
        setError('Erro ao carregar as oportunidades');
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  if (loading) return <div>Carregando oportunidades...</div>;
  if (error) return <div>{error}</div>;

  const filteredByType = filterType && filterType !== "Todos" && typeMap[filterType]
    ? opportunities.filter((opportunity) => opportunity.typeBO === typeMap[filterType as keyof typeof typeMap])
    : opportunities;

  const filteredByName = nameFilter
    ? filteredByType.filter(
        (opportunity) =>
          opportunity.title.toLowerCase().includes(nameFilter.toLowerCase())
      )
    : filteredByType;

  return (
    <div className="space-y-6">
      <div className="flex gap-6 justify-end items-center">
        <NameFilter onSelect={setNameFilter} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredByName.slice(0, visibleOpportunities).map((opportunity) => (
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
        ))}
      </div>
    </div>
  );
};

export default AllOpportunitiesList;