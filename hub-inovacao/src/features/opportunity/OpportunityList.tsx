"use client";
import React, { useEffect, useState } from "react";
import OpportunityCard from "./OpportunityCard";
import { Opportunity } from "./opportunity.interface";
import { searchOpportunities } from "./opportunity.service";
import { OpportunityType } from "./opportunity.interface";
import { Dropdown } from "@/components/Dropdown";
import { Select } from "@/components/Form/Select";
interface OpportunityListProps {
  filters: Record<string, string | number | boolean>;
}

const OpportunityList: React.FC<OpportunityListProps> = ({ filters }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<OpportunityType | string>("");
 
const opportunityTypeOptions = Object.entries(OpportunityType)
  .filter(([key]) => isNaN(Number(key))) 
  .map(([key, value]) => ({
    label: key
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()), 
    value: value as OpportunityType,
  }));


  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      try {
        const response = await searchOpportunities(filters);
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

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesTitle = opportunity.tituloDesafio?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType ? opportunity.opportunityType === selectedType : true;
    return matchesTitle && matchesType;
  });

  return (
    <div className="w-full py-6">
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />

          <Select
            label=""
            value={selectedType as string}
            onChange={(val) => setSelectedType(val)}
            selectText='Tipo de Oportunidade'
            options={[
              { label: "Banco de Oportunidade", value: "BANCO_DE_OPORTUNIDADE" },
              { label: "Banco de Problema", value: "BANCO_DE_PROBLEMA" },
              { label: "Banco de ideia", value: "BANCO_DE_IDEIA" },
              { label: "Desafio", value: "DESAFIO" },
            ]}
          />
        </div>
      <h1 className="text-3xl font-bold text-center mb-8">Lista de Oportunidades</h1>
      {loading ? (
        <div className="text-center text-xl text-gray-600">Carregando oportunidades...</div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.map((opportunity) => (
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