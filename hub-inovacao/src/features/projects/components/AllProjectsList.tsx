/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { getAllProjects } from "@/services/projectService";
import { AcademicProjectResponseDTO } from "@/interfaces/AcademicProjectInterface";
import CardAcademicProjs from "./CardAcademicProjs";
import NameFilter from "@/components/NameFilter";
import ProjectCardSkeleton from "@/features/authusers/project/components/ProjectCardSkeleton";

interface AllProjectsListProps {
  visibleProjects: number;
  filterType: string | null;
}

const typeMap = {
  "Projeto de Inovação": "INOVACAO",
  "Projeto de Integração": "PI",
  "Projeto de Extensão": "EXTENSAO",
} as const;

type TypeAP = typeof typeMap[keyof typeof typeMap];

const AllProjectsList: React.FC<AllProjectsListProps> = ({ visibleProjects, filterType }) => {
  const [projetos, setProjetos] = useState<AcademicProjectResponseDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        setProjetos(response);
      } catch (err) {
        setError("Erro ao carregar os projetos");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    filterType && filterType !== "Todos" && typeMap[filterType as keyof typeof typeMap]
      ? projetos.filter((projeto) => projeto.typeAP === typeMap[filterType as keyof typeof typeMap])
      : projetos;

  const filteredByName = nameFilter
    ? filteredProjects.filter(
        (projeto) =>
          projeto.title.toLowerCase().includes(nameFilter.toLowerCase()) ||
          (projeto.studentName && projeto.studentName.toLowerCase().includes(nameFilter.toLowerCase())) ||
          (projeto.professorName && projeto.professorName.toLowerCase().includes(nameFilter.toLowerCase()))
      )
    : filteredProjects;

  if (loading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {[...Array(visibleProjects)].map((_, idx) => <ProjectCardSkeleton key={idx} />)}
      </div>
    );

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex gap-6 justify-end items-center">
        <NameFilter onSelect={setNameFilter} />
      </div>

      {filteredByName.length === 0 ? (
        <div className="text-center text-gray-600">
          <h2>Ainda não temos nenhum disponível</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {filteredByName.slice(0, visibleProjects).map((projeto) => (
            <CardAcademicProjs
              key={projeto.id}
              id={projeto.id}
              title={projeto.title}
              description={projeto.description}
              urlPhoto={projeto.urlPhoto || "/default-image.jpg"}
              pdfLink={projeto.pdfLink}
              siteLink={projeto.siteLink}
              typeAP={projeto.typeAP as TypeAP}
              currentUserEmail={projeto.currentUserEmail}
              creationDate={projeto.creationDate}
              studentName={projeto.studentId ? projeto.studentName : undefined}
              professorName={projeto.professorId ? projeto.professorName : undefined}
              coauthors={projeto.coauthors}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProjectsList;