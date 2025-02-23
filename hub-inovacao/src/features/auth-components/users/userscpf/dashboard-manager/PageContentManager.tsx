/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import CreatePublishForm from "@/features/auth-components/manager/CreatePublishForm";
import PublishList from "@/features/auth-components/manager/PublishList";
import TicketList from "@/features/auth-components/manager/TicketList";
import { UserResponseCpfDTO } from "@/interfaces/userInterface";
import TicketListAnswered from "@/features/auth-components/manager/TicketListAnswered";

interface PageContentManagerProps {
  selectedPage: string | null;
  userData: UserResponseCpfDTO;
}


export default function PageContentManager({ selectedPage, userData }: PageContentManagerProps) {
  const [isPublishFormOpen, setIsPublishFormOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); 

  const handlePublishCreated = () => {
    setIsPublishFormOpen(false);
    setRefreshKey((prevKey) => prevKey + 1); 
  };

  return (
    <div className="ml-44 flex justify-center items-start">
      <div className="w-full max-w-6xl px-6 py-8">
       


        {selectedPage === "page1" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Tickets em aberto</h3>
            <p className="text-lg text-gray-600 mb-4">Veja os tickets em espera e tome as devidas providências.</p>
            <div className="space-y-4">
              <TicketList statusFilter={"PENDENTE"} />
            </div>
          </div>
        )}
         
        {selectedPage === "page2" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Projetos da Empresa</h3>
            <p className="text-lg text-gray-600 mb-4">Aqui você pode ver tickets respondidos por você.</p>
            <TicketListAnswered  />
          </div>
        )}
        {/*
            */ }

      {selectedPage === "page3" && (

          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Editais em aberto</h3>
              <button
                onClick={() => setIsPublishFormOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
              >
                Adicionar Publicação
              </button>
            </div>
            <div className="space-y-4">
              <PublishList key={refreshKey} /> 
            </div>
          </div>
        )}
      </div>

      {isPublishFormOpen && <CreatePublishForm onClose={() => setIsPublishFormOpen(false)} onPublishCreated={handlePublishCreated} />}
    </div>
  );
}