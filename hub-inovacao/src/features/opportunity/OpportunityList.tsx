"use client";
import React, { useEffect, useState } from "react";
import OpportunityCard from "./OpportunityCard";
import { Opportunity } from "./opportunity.interface";
import { searchOpportunities } from "./opportunity.service";
import { OpportunityType } from "./opportunity.interface";
import { Select } from "@/components/Form/Select";
import OpportunityCardSkeleton from "./OpportunityCardSkeleton"; // Certifique-se de importar o esqueleto de oportunidade

interface OpportunityListProps {
  filters: Record<string, string | number | boolean>;
}

const OpportunityList: React.FC<OpportunityListProps> = ({ filters }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<OpportunityType | string>("");
  const [visibleItems, setVisibleItems] = useState(6);

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      try {
        const response = await searchOpportunities(filters, { page: 0, size: 300 });
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

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  return (
    <div className="w-full py-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
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
          selectText="Tipo de Oportunidade"
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
        <div className="text-center text-xl text-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <OpportunityCardSkeleton key={index} />
              ))}
          </div>
        </div>
      ) : (
        <div
          className="list-cards"
          style={{ display: filteredOpportunities.length > 0 ? "grid" : "flex" }}
        >
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.slice(0, visibleItems).map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))
          ) : (
            <div className="not-found-title">Nenhuma oportunidade encontrada</div>
          )}
        </div>
      )}

      {filteredOpportunities.length > visibleItems && (
        <div className="text-center mt-4">
          <button
            onClick={handleShowMore}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Exibir mais
          </button>
        </div>
      )}
    </div>
  );
};

export default OpportunityList;