/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState } from 'react';
import AllProjectsCard from './AllProjectsCard';
import { getAllProjects } from '@/services/projectService';
import { AcademicProjectResponseDTO } from '@/interfaces/AcademicProjectInterface';

const AllProjectsList: React.FC = () => {
  const [projetos, setProjetos] = useState<(AcademicProjectResponseDTO)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        setProjetos(response);
      } catch (err) {
        setError('Erro ao carregar os projetos');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Carregando projetos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Projetos Acadêmicos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projetos.length === 0 ? (
          <p className="text-gray-500">Nenhum projeto encontrado.</p>
        ) : (
          projetos.map((projeto) => {
            if (projeto.professorId) {
              const professorName = projeto.professorName || 'Professor não encontrado';
              return (
                <AllProjectsCard
                  key={projeto.id}
                  id={projeto.id}
                  title={projeto.title}
                  description={projeto.description}
                  urlPhoto={projeto.urlPhoto}
                  pdfLink={projeto.pdfLink}
                  siteLink={projeto.siteLink}
                  typeAP={projeto.typeAP}
                  currentUserEmail={projeto.currentUserEmail}
                  creationDate={projeto.creationDate}
                  professorName={professorName}
                  coauthors={projeto.coauthors}
                  studentName={undefined}
                />
              );
            } else if (projeto.studentId) {
              const studentName = projeto.studentName || 'Aluno não encontrado';
              return (
                <AllProjectsCard
                  key={projeto.id}
                  id={projeto.id}
                  title={projeto.title}
                  description={projeto.description}
                  urlPhoto={projeto.urlPhoto}
                  pdfLink={projeto.pdfLink}
                  siteLink={projeto.siteLink}
                  typeAP={projeto.typeAP}
                  currentUserEmail={projeto.currentUserEmail}
                  creationDate={projeto.creationDate}
                  studentName={studentName}
                  professorName={undefined}
                  coauthors={projeto.coauthors}
                />
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default AllProjectsList;