"use client";
import React, { useEffect, useState } from "react";
import OpportunityCard from "./OpportunityCard";
import { Opportunity } from "./opportunity.interface";
import { searchOpportunities } from "./opportunity.service";
import { OpportunityType } from "./opportunity.interface";
import { Dropdown } from "@/components/Dropdown";
interface OpportunityListProps {
  filters: Record<string, string | number | boolean>;
}

const OpportunityList: React.FC<OpportunityListProps> = ({ filters }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
 
const opportunityTypeOptions = Object.entries(OpportunityType)
  .filter(([key]) => isNaN(Number(key))) // pega só as chaves string
  .map(([key, value]) => ({
    label: key
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()), // ex: "BANCO_DE_OPORTUNIDADE" → "Banco De Oportunidade"
    value: value as OpportunityType,
  }));

  const [selectedType, setSelectedType] = useState<OpportunityType | null>(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      try {
        const composedFilters = {
          ...filters,
          ...(selectedType !== null && { opportunityType: selectedType }), // adiciona `type` somente se selecionado
        };
      
        const params = new URLSearchParams(
          Object.entries(composedFilters).reduce((acc, [key, value]) => {
            acc[key] = String(value); // garante que o value é string
            return acc;
          }, {} as Record<string, string>)
        ).toString();

        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/opportunities?${params}`;
        console.log("Requisição enviada:", url);

        const response = await searchOpportunities(composedFilters);
        console.log("Oportunidades encontradas:", response);

        const opportunitiesData = (response?.data?.content || []).filter((opp: Opportunity) => {
          if (selectedType === null) return true;
        
          const typeValue = OpportunityType[opp.opportunityType as unknown as keyof typeof OpportunityType];
          return typeValue === selectedType;
        });
        setOpportunities(opportunitiesData);
      } catch (error) {
        console.error("Erro ao buscar oportunidades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, [filters, selectedType]);
  console.log("📦 Oportunidades carregadas:", opportunities);
  return (
    <div className="w-full py-6">
        <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-6">
        <Dropdown
            options={opportunityTypeOptions}
            onSelect={(selected) => {
              console.log("🔹 Filtro selecionado:", selected);
              setSelectedType(selected);
            }}
            value={selectedType} // <- AQUI
            defaultText="Filtrar por Tipo"
        />
        </div>
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