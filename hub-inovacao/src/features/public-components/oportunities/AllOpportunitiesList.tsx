"use client";

import React, { useEffect, useState } from "react";
import AllOpportunitiesCard from "./AllOpportunitiesCard";
import NameFilter from "@/components/NameFilter";
import PublishCardSkeleton from "@/features/auth-components/manager/PublishCardSkeleton";
import { Opportunity, OpportunityType } from "@/features/teste/Opportunity";
import { searchOpportunities } from "@/features/teste/opportunityService";

interface AllOpportunitiesListProps {
  visibleOpportunities: number;
  filterType: string | null;
  setTotalOpportunities: (total: number) => void;
}

const typeMap: Record<string, OpportunityType> = {
  "Oportunidades": OpportunityType.BANCO_DE_OPORTUNIDADE,
  "Problemas": OpportunityType.BANCO_DE_PROBLEMA,
  "Ideias": OpportunityType.BANCO_DE_IDEIA,
  "Desafio": OpportunityType.DESAFIO
};

const AllOpportunitiesList: React.FC<AllOpportunitiesListProps> = ({
  visibleOpportunities,
  filterType,
  setTotalOpportunities,
}) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(10);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const filters: Record<string, any> = {};

        // Adicionando filtros corretamente
        if (filterType && filterType !== "Todos" && typeMap[filterType]) {
          filters.opportunityType = typeMap[filterType].toString();
        }

        if (nameFilter) {
          filters.tituloDesafio = nameFilter;
        }

        console.log("Filtros a enviar:", filters); // Verificando os filtros que estão sendo enviados

        const response = await searchOpportunities(filters, page, size);
        console.log("Oportunidades recuperadas:", response.data.content); // Verificando a resposta

        if (response.data?.content) {
          setOpportunities(response.data.content);
          setTotalOpportunities(response.data.totalElements);
        } else {
          setError("Nenhuma oportunidade encontrada.");
        }
      } catch (err) {
        console.log("Erro ao carregar oportunidades:", err);
        setError("Erro ao carregar as oportunidades");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, [page, size, filterType, nameFilter, setTotalOpportunities]);

  const filteredByType =
    filterType && filterType !== "Todos" && typeMap[filterType]
      ? opportunities.filter(
          (opportunity) => opportunity.opportunityType?.toString() === typeMap[filterType].toString()
        )
      : opportunities;

  const filteredByName = nameFilter
    ? filteredByType.filter((opportunity) =>
        opportunity.tituloDesafio?.toLowerCase().includes(nameFilter.toLowerCase())
      )
    : filteredByType;

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {Array.from({ length: visibleOpportunities }).map((_, index) => (
          <PublishCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex gap-6 justify-end items-center">
        <NameFilter onSelect={setNameFilter} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredByName && filteredByName.length > 0
          ? filteredByName.slice(0, visibleOpportunities).map((opportunity) => (
              <AllOpportunitiesCard
                key={opportunity.id}
                id={opportunity.id?.toString() || ""}
                tituloDesafio={opportunity.tituloDesafio || ""}
                descricaoProblema={opportunity.descricaoProblema || ""}
                urlPhoto={opportunity.urlPhoto || "/default-image.jpg"}
                pdfLink={""} // Pode ser alterado conforme necessário
                siteLink={""} // Pode ser alterado conforme necessário
                opportunityType={opportunity.opportunityType?.toString() as "BANCO_DE_OPORTUNIDADE" | "BANCO_DE_PROBLEMA" | "BANCO_DE_IDEIA" | "DESAFIO"} // Garantindo o tipo correto
                createdDate={opportunity.createdDate || ""}
                status={opportunity.status?.toString() || ""}
              />
            ))
          : null}
      </div>

      {filteredByName && filteredByName.length < opportunities.length && (
        <div className="text-center mt-4">
          <button onClick={() => setPage(page + 1)} className="btn btn-primary">
            Carregar Mais
          </button>
        </div>
      )}
    </div>
  );
};

export default AllOpportunitiesList;