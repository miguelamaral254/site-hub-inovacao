/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { OpportunityResponseDTO } from "@/interfaces/OpportunityInterfaces"; 
import { getOpportunitiesByCompanyName } from "@/services/opportunityService";
import OpportunityCard from "./OpportunityCard";
import OpportunityCardSkeleton from "./OpportunityCardSkeleton";

interface OpportunityListProps {
  statusFilter: string;
}

export default function OpportunityList({ statusFilter }: OpportunityListProps) {
  const [opportunities, setOpportunities] = useState<OpportunityResponseDTO[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const userName = localStorage.getItem("userData");

      if (!userName) {
        setError("Nome da empresa não encontrado.");
        setLoading(false);
        return;
      }
      const userData = JSON.parse(userName);
      const companyName = userData.name; 
  
      const fetchedOpportunities = await getOpportunitiesByCompanyName(companyName); 

      const validStatus = ["APROVADA", "PENDENTE", "REPROVADA"];
      
      if (statusFilter && !validStatus.includes(statusFilter)) {
        setError("Status inválido.");
        setLoading(false);
        return;
      }

      const filteredOpportunities = fetchedOpportunities.filter((opportunity) => {
        const status = opportunity.status?.toString().toUpperCase();
        return status && status === statusFilter.toUpperCase();
      });

      setOpportunities(filteredOpportunities);
    } catch (error) {
      console.log(error)
      setError("Erro ao carregar oportunidades.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [statusFilter]);

  return (
    <div className="p-6">
      {error && <p className="text-red-500">{error}</p>}
      {opportunities.length === 0 && !error && <p className="text-gray-500">Nenhuma oportunidade encontrada.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading
          ? [...Array(3)].map((_, index) => <OpportunityCardSkeleton key={index} />)
          : opportunities.map((opportunity, index) => (
              <OpportunityCard key={index} opportunity={opportunity} fetchOpportunities={fetchOpportunities} />
            ))}
      </div>
    </div>
  );
}