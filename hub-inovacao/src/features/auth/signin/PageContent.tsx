"use client";
import { User } from "../users/user.interface";
import TicketTypeSelector from "./TicketTypeSelector";
import ProjectTicketList from "@/features/projects/ProjectTicketList";
import PublishList from "@/features/publish/PublishList";
import ProjectList from "@/features/projects/ProjectList";
// import { ProjectForm } from "@/features/projects/cadastro_projeto";
import { useContext } from "react";
import { multiStepContext } from "@/features/projects/project-form/StepContext";
import OpportunityList from "@/features/opportunity/OpportunityList";
import CreateOpportunityForm from "@/features/opportunity/OpportunityForms";
import { ProjectForm } from "@/components/Form/ProjectForm";

interface PageContentProps {
  selectedPage: string | null;
  userData: User | null;
}

export default function PageContent({
  selectedPage,
  userData,
}: PageContentProps) {
  const { step, setStep } = useContext(multiStepContext);
  const role = userData?.role;
  const userId = userData?.id;
  const regularUser = {
    userId: userId ?? 0,
  };

  const managerProjectTicket = {
    status: "pendente",
    enabled: true,
  };
  const managerOpportunityTicket = {
    status: "pendente",
    enabled: true,
  };

  const managerList = {
    idmanager: userId ?? 0,
  };
  const opportunityFilterList = {
    enterprise:userId ?? 0
  };

  return (
    <div className="flex justify-center items-start">
      <div className="w-full max-w-7xl px-6 py-8">
        {selectedPage === "page1" &&
          (role === "PROFESSOR" || role === "STUDENT") && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Projetos Aprovados
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                Aqui você pode ver os projetos acadêmicos aprovados pela sua
                instituição.
              </p>
              <ProjectList filters={regularUser} />
            </div>
          )}
        {selectedPage === "page2" &&
          (role === "PROFESSOR" || role === "STUDENT") && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Submeter Projeto{" "}
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                Aqui você pode submeter projetos acadêmicos.
              </p>
              <ProjectForm step={step} setStep={setStep} />
            </div>
          )}

        {selectedPage === "page3" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Meus Tickets atribuidos
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Aqui você pode ver os projetos acadêmicos e oportunidades
              atribuidos a você.
            </p>
            <ProjectTicketList filters={managerList} />
          </div>
        )}

        {selectedPage === "page4" && role === "MANAGER" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Selecione o tipo de Ticket
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Escolha entre visualizar os Projetos ou Oportunidades Pendentes.
            </p>
            <TicketTypeSelector
              managerProjectTicket={managerProjectTicket}
              managerOpportunityTicket={managerOpportunityTicket}
            />
          </div>
        )}

        {selectedPage === "page5" && role === "MANAGER" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Gerenciar Editais
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Crie e acompanhar seu progresso e melhorias necessárias.
            </p>
            <div className="space-y-4">
              <PublishList />
            </div>
          </div>
        )}

      {selectedPage === "page6" && role === "ENTERPRISE" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Gerenciar Oportunidades
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Crie e acompanhar seu progresso e melhorias necessárias.
            </p>
            <div className="space-y-4">
              <OpportunityList filters={opportunityFilterList} />
            </div>
          </div>
        )}
        {selectedPage === "page7" && role === "ENTERPRISE" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Submeter Oportunidades
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Crie e acompanhar seu progresso e melhorias necessárias.
            </p>
            <div className="space-y-4">
             <CreateOpportunityForm/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}            

