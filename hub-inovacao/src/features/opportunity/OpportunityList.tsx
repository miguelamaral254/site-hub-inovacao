"use client";
import React, { useEffect, useState } from "react";
import OpportunityCard from "./OpportunityCard";
import { Opportunity } from "./opportunity.interface";
import { searchOpportunities } from "./opportunity.service";

interface OpportunityListProps {
  filters: Record<string, string | number | boolean>;
}

const OpportunityList: React.FC<OpportunityListProps> = ({ filters }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(filters as Record<string, string>).toString();
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/opportunities?${params}`;
        console.log("Requisição enviada:", url);

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
      <h1 className="text-3xl font-bold text-center mb-8">Lista de Oportunidades</h1>
      {loading ? (
        <div className="text-center text-xl text-gray-600">Carregando oportunidades...</div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {opportunities.length > 0 ? (
            opportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))
          ) : (
            <div className="text-center text-xl text-gray-600">Nenhuma oportunidade encontrada</div>
          )}
        </div>
      )}
    </div>
  );
};

export default OpportunityList;