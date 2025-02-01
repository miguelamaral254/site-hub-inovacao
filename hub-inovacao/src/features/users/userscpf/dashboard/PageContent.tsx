import { UserResponseCnpjDTO, UserResponseCpfDTO } from "@/interfaces/userInterface";
import ProjectList from "@/features/authusers/components/ProjectList";
import CreateProjectForm from "@/features/authusers/components/ModalCreateProject";

interface PageContentProps {
  selectedPage: string | null;
  userData: UserResponseCnpjDTO | UserResponseCpfDTO | null;
}

export default function PageContent({ selectedPage, userData }: PageContentProps) {
  const role = userData?.role; 

  const isForProfessor = role === "PROFESSOR"; 
  const isForStudent = role === "STUDENT";  

  return (
    <div className="flex">
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
            <ProjectList statusFilter="REPROVADA" />
          </div>
        )}

        {selectedPage === "page3" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Criar Projeto Acadêmico</h3>
            <p className="mb-6">Preencha os campos abaixo para criar um novo projeto acadêmico.</p>

            <CreateProjectForm
              isForProfessor={isForProfessor}
              isForStudent={isForStudent}
            />
          </div>
        )}
      </div>
    </div>
  );
}