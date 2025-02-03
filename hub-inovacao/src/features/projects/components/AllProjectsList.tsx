/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { getAllProjects } from "@/services/projectService";
import { AcademicProjectResponseDTO } from "@/interfaces/AcademicProjectInterface";
import CardAcademicProjs from "./CardAcademicProjs";

interface AllProjectsListProps {
  visibleProjects: number;
  filterType: string | null;
}

const typeMap = {
  "Projeto de Inovação": "INOVACAO",
  "Projeto de Integração": "PI",
  "Projeto de Extensão": "EXTENSAO",
} as const; // 👈 Aqui garante que o objeto tem tipos fixos

type TypeAP = typeof typeMap[keyof typeof typeMap]; // 👈 Define um tipo seguro para os valores

const AllProjectsList: React.FC<AllProjectsListProps> = ({ visibleProjects, filterType }) => {
  const [projetos, setProjetos] = useState<AcademicProjectResponseDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

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

  if (loading) return <div>Carregando projetos...</div>;
  if (error) return <div>{error}</div>;

  const filteredProjects =
    filterType && filterType !== "Todos" && typeMap[filterType as keyof typeof typeMap]
      ? projetos.filter((projeto) => projeto.typeAP === typeMap[filterType as keyof typeof typeMap])
      : projetos;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {filteredProjects.slice(0, visibleProjects).map((projeto) => (
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
  );
};

export default AllProjectsList;