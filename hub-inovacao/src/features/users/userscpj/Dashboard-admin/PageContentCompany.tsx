/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { UserResponseCnpjDTO } from "@/interfaces/userInterface";
import OpportunityList from "@/features/authusers/company/components/OpportunityList";
import CreateOpportunityForm from "@/features/authusers/company/components/CreateOpportunityForm";

interface PageContentCompanyProps {
  selectedPage: string | null;
  userData: UserResponseCnpjDTO 
}

export default function PageContentCompany({ selectedPage, userData }: PageContentCompanyProps) {
  const role = userData?.role;

  return (
    <div className="flex justify-center items-start">
      <div className="w-full max-w-7xl px-6 py-8">
        {selectedPage === "page1" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Projetos da Empresa</h3>
            <p className="text-lg text-gray-600 mb-4">Aqui você pode ver os projetos da sua empresa.</p>
            <OpportunityList statusFilter="APROVADA" />
           
          </div>
        )}

        {selectedPage === "page2" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Acompanhar Projetos</h3>
            <p className="text-lg text-gray-600 mb-4">Veja os projetos em andamento e tome as devidas providências.</p>
            <div className="space-y-4">
              <OpportunityList statusFilter="PENDENTE" />
              <OpportunityList statusFilter="REPROVADA" />
            </div>
          </div>
        )}

        {selectedPage === "page3" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Submeter Novo Projeto</h3>
            <p className="text-lg text-gray-600 mb-6">Preencha os campos abaixo para submeter um novo projeto para a empresa.</p>
            <CreateOpportunityForm />
          </div>
        )}
      </div>
    </div>
  );
}