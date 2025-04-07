"use client";
import ProjectsList from "@/features/projects/ProjectsList";
import { User } from "../users/user.interface";
import PublishList from "@/features/publish/PublishList";

interface PageContentProps {
  selectedPage: string | null;
  userData: User | null;
}

export default function PageContent({ selectedPage, userData }: PageContentProps) {
  const role = userData?.role;

  return (
    <div className="flex justify-center items-start">
      <div className="w-full max-w-7xl px-6 py-8">
        {selectedPage === "page1" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Projetos Aprovados</h3>
            <p className="text-lg text-gray-600 mb-4">Aqui você pode ver os projetos acadêmicos aprovados pela sua instituição.</p>
            <div className="grid grid-cols-6 font-bold bg-gray-100 px-6 gap-6 border-gray-300 text-left mt-20 mb-2">
              <span className="col-span-2">Título</span>
              <span>Data</span>
              <span>Tipo</span>
              <span>Status</span>
            </div>
            <ProjectsList />
          </div>
        )}

        {selectedPage === "page2" && role === "PROFESSOR" || role === "STUDENT" &&(
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Submeter Projeto Acadêmico</h3>
            <p className="text-lg text-gray-600 mb-6">Preencha os campos abaixo para criar um novo projeto acadêmico. Certifique-se de fornecer informações precisas e completas.</p>
          </div>
        )}

        {selectedPage === "page3" && role === "MANAGER" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Meus tickets atribuidos</h3>
            <p className="text-lg text-gray-600 mb-4">Verifique os projetos pendentes ou reprovados para poder acompanhar seu progresso e melhorias necessárias.</p>
            <div className="space-y-4"></div>
          </div>
        )}
         
         {selectedPage === "page4" && role === "MANAGER" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Projetos Pendentes e Reprovados</h3>
            <p className="text-lg text-gray-600 mb-4">Verifique os projetos pendentes ou reprovados para poder acompanhar seu progresso e melhorias necessárias.</p>
            <div className="space-y-4"></div>
          </div>
        )}


        {selectedPage === "page5" && role === "MANAGER" && (
          <div>
            <PublishList />
          </div>
        )}
      </div>
    </div>
  );
}