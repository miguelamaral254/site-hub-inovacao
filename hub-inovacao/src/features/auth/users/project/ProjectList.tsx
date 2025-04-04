/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectCardSkeleton from "./ProjectCardSkeleton"; // Importando o Skeleton
import { getProjectsByUserEmail } from "@/services/projectService";
import { AcademicProjectResponseProfessorDTO, AcademicProjectResponseStudentDTO } from "../../../interfaces/projectInterfaces";

interface ProjectListProps {
  statusFilter: string;
}

export default function ProjectList({ statusFilter }: ProjectListProps) {
  const [projects, setProjects] = useState<(AcademicProjectResponseProfessorDTO | AcademicProjectResponseStudentDTO)[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1); // Total de páginas

  const fetchProjects = async () => {
    setLoading(true);
    try {
        const email = localStorage.getItem("email");
        if (!email) {
            setError("Email não encontrado.");
            setLoading(false);
            return;
        }

        const fetchedProjects = await getProjectsByUserEmail(email, currentPage - 1, itemsPerPage); 

        // Loga os dados retornados da API
        console.log("Projetos retornados: ", fetchedProjects);

        setProjects(fetchedProjects.content);
        setTotalPages(fetchedProjects.totalPages); 
    } catch (error) {
        console.error("Erro ao carregar projetos: ", error);
        setError("Erro ao carregar projetos.");
    } finally {
        setLoading(false);
    }
};
  useEffect(() => {
    fetchProjects();
  }, [statusFilter, currentPage]); 

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-6">
      {error && <p className="text-red-500">{error}</p>}
      {projects.length === 0 && !error && <p className="text-gray-500"></p>}

      
      <div className="grid grid-cols-1 gap-6">
        <ul className="flex flex-col">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} fetchProjects={fetchProjects} />
          </li>
        ))}
        </ul>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50"
        >
          Voltar
        </button>
        <p className="text-gray-600 text-sm">
          Página {currentPage} de {totalPages}
        </p>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50"
        >
          Avançar
        </button>
      </div>
    </div>
  );
}