import ProjectList from "@/features/projects/components/ProjectList";

interface PageContentProps {
  selectedPage: string | null;
}

export default function PageContent({ selectedPage }: PageContentProps) {
  return (
    <div className="flex-grow p-6">
      {selectedPage === "page1" && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Projetos Aprovados</h3>
          <ProjectList statusFilter="APROVADA" /> 
        </div>
      )}

      {selectedPage === "page2" && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Projetos Pendentes e Reprovados</h3>
          <ProjectList statusFilter="PENDENTE" />
        </div>
      )}

      {selectedPage === "page3" && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Página 3</h3>
          <p>Conteúdo da Página 3</p>
        </div>
      )}

      {!selectedPage && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Bem-vindo ao Dashboard</h3>
          <p>Selecione uma página para visualizar o conteúdo.</p>
        </div>
      )}
    </div>
  );
}