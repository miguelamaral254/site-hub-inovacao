"use client";
import { User } from "../users/user.interface";
import TicketTypeSelector from "./TicketTypeSelector";
import ProjectTicketList from "@/features/projects/ProjectTicketList";
import PublishList from "@/features/publish/PublishList";

interface PageContentProps {
  selectedPage: string | null;
  userData: User | null;
}

export default function PageContent({
  selectedPage,
  userData,
}: PageContentProps) {
  const role = userData?.role;
  const userId = userData?.id;

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
    enabled: true,
  };

  return (
    <div className="flex justify-center items-start">
      <div className="w-full max-w-7xl px-6 py-8">
        {selectedPage === "page1" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Projetos Aprovados
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Aqui você pode ver os projetos acadêmicos aprovados pela sua
              instituição.
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
              Projetos Pendentes e Reprovados
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Verifique os projetos pendentes ou reprovados para poder
              acompanhar seu progresso e melhorias necessárias.
            </p>
            <div className="space-y-4">
              <PublishList />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}