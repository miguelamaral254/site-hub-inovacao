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
    <div className="flex justify-center items-start">
      <div className="w-full max-w-7xl px-6 py-8">
        {selectedPage === "page1" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Projetos Aprovados</h3>
            <p className="text-lg text-gray-600 mb-4">Aqui você pode ver os projetos acadêmicos aprovados pela sua instituição.</p>
            <ProjectList statusFilter="APROVADA" />
          </div>
        )}

        {selectedPage === "page2" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Projetos Pendentes e Reprovados</h3>
            <p className="text-lg text-gray-600 mb-4">Verifique os projetos pendentes ou reprovados para poder acompanhar seu progresso e melhorias necessárias.</p>
            <div className="space-y-4">
              <ProjectList statusFilter="PENDENTE" />
              <ProjectList statusFilter="REPROVADA" />
            </div>
          </div>
        )}

        {selectedPage === "page3" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Submeter Projeto Acadêmico</h3>
            <p className="text-lg text-gray-600 mb-6">Preencha os campos abaixo para criar um novo projeto acadêmico. Certifique-se de fornecer informações precisas e completas.</p>
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