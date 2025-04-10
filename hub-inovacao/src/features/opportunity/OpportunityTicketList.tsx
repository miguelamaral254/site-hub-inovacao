"use client";
import React, { useEffect, useState } from "react";
import OpportunityTicketCard from "./OpportunityTicketCard";
import { Opportunity } from "./opportunity.interface";
import { searchOpportunities } from "./opportunity.service";

interface OpportunityListProps {
  filters: Record<string, string | number | boolean>;
}

const OpportunityTicketList: React.FC<OpportunityListProps> = ({ filters }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(filters as Record<string, string>).toString();
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/opportunities?${params}`;
        console.log("Requisição enviada: ", url);

        const response = await searchOpportunities(filters);
        console.log("Oportunidades encontradas:", response);

        const opportunitiesData = response?.data?.content || [];
        setOpportunities(opportunitiesData);
      } catch (error) {
        console.error("Erro ao buscar oportunidades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, [filters]);

  return (
    <div className="w-full py-6">
      {loading ? (
        <div className="text-center text-xl text-gray-600">Carregando oportunidades...</div>
      ) : (
        <div className="flex flex-col gap-4">
          {opportunities.length > 0 ? (
            opportunities.map((opportunity, index) => (
              <div key={index} className="hover:bg-gray-100 p-4 rounded-lg shadow-sm border-b">
                <OpportunityTicketCard opportunity={opportunity} />
              </div>
            ))
          ) : (
            <div className="text-center text-xl text-gray-600">Nenhuma oportunidade encontrada</div>
          )}
        </div>
      )}
    </div>
  );
};

export default OpportunityTicketList;