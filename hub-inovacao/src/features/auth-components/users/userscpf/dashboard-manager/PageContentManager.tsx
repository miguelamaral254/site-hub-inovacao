/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import CreatePublishForm from "@/features/auth-components/manager/CreatePublishForm";
import PublishList from "@/features/auth-components/manager/PublishList";
import TicketList from "@/features/auth-components/manager/TicketList";
import { UserResponseCpfDTO } from "@/interfaces/userInterface";

interface PageContentManagerProps {
  selectedPage: string | null;
  userData: UserResponseCpfDTO 
}

export default function PageContentManager({ selectedPage, userData }: PageContentManagerProps) {
  const role = userData?.role;

  return (
    <div className="flex justify-center items-start">
      <div className="w-full max-w-7xl px-6 py-8">
        {selectedPage === "page1" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Projetos da Empresa</h3>
            <p className="text-lg text-gray-600 mb-4">Aqui você pode ver tickets respondidos por você.</p>
           
          </div>
        )}

        {selectedPage === "page2" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Tickets em aberto</h3>
            <p className="text-lg text-gray-600 mb-4">Veja os tickets em espera e tome as devidas providências.</p>
            <div className="space-y-4">
            <TicketList statusFilter={"PENDENTE"} />
            </div>
          </div>
        )}

        {selectedPage === "page3" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Submeter Novo Edital</h3>
            <p className="text-lg text-gray-600 mb-6">Preencha os campos abaixo para submeter um novo edital.</p>
            <CreatePublishForm />
          </div>
        )}

{selectedPage === "page4" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Editais em aberto</h3>
            <p className="text-lg text-gray-600 mb-4">Veja os Editais em aberto.</p>
            <div className="space-y-4">
      <PublishList/>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}