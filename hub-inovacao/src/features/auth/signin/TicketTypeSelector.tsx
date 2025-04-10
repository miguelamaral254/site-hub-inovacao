/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import OpportunityTicketList from "@/features/opportunity/OpportunityTicketList";
import ProjectTicketList from "@/features/projects/ProjectTicketList";

interface TicketTypeSelectorProps {
  managerProjectTicket: Record<string, any>;
  managerOpportunityTicket: Record<string, any>;
}

const TicketTypeSelector: React.FC<TicketTypeSelectorProps> = ({
  managerProjectTicket,
  managerOpportunityTicket,
}) => {
  const [selectedTicketType, setSelectedTicketType] = useState<string>("project");

  return (
    <div>
      <div className="flex  mb-6">
        <button
          className={`px-4 py-2 rounded-md ${selectedTicketType === "project" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedTicketType("project")}
        >
          Projetos
        </button>
        <button
          className={`px-4 py-2 rounded-md ${selectedTicketType === "opportunity" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedTicketType("opportunity")}
        >
          Oportunidades
        </button>
      </div>

      {/* Renderizando o componente selecionado */}
      {selectedTicketType === "project" ? (
        <ProjectTicketList filters={managerProjectTicket} />
      ) : (
        <OpportunityTicketList filters={managerOpportunityTicket} />
      )}
    </div>
  );
};

export default TicketTypeSelector;