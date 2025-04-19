/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { Opportunity } from "./opportunity.interface";
import { searchOpportunities } from "./opportunity.service";
import OpportunityTicketCard from "./OpportunityTicketCard";

interface OpportunityListProps {
  filters: Record<string, string | number | boolean>;
}

const OpportunityTicketList: React.FC<OpportunityListProps> = ({ filters }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchOpportunities();
  }, [filters, currentPage]);

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const response = await searchOpportunities({ ...filters }, { page: currentPage, size: pageSize });
      if (response && response.data && response.data.content) {
        const opportunitiesData = response.data.content || [];
        setOpportunities(opportunitiesData);
        const totalPages = response.data.page.totalPages || 1;
        setTotalPages(totalPages);
      } else {
        console.error("Resposta da API está faltando a estrutura esperada.");
      }
    } catch (error) {
      console.error("Erro ao buscar oportunidades:", error);
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full py-6">
      {loading ? (
        <div className="text-center text-xl text-gray-600">Carregando oportunidades...</div>
      ) : (
        <div className="flex flex-col">
          {opportunities.length > 0 ? (
            opportunities.map((opportunity, index) => (
              <div key={index} className="hover:bg-gray-100 p-0 m-0 rounded-lg shadow-sm border-b">
                <OpportunityTicketCard opportunity={opportunity} />
              </div>
            ))
          ) : (
            <div className="text-center text-xl text-gray-600">Nenhuma oportunidade encontrada</div>
          )}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Anterior
        </button>
        <span className="text-sm text-gray-600">
          Página {currentPage + 1} de {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default OpportunityTicketList;