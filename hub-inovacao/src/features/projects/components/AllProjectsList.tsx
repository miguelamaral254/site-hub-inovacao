/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState } from 'react';
import { getAllProjects } from '@/services/projectService';
import { AcademicProjectResponseDTO } from '@/interfaces/AcademicProjectInterface';
import CardAcademicProjs from './CardAcademicProjs';

const AllProjectsList: React.FC = () => {
  const [projetos, setProjetos] = useState<(AcademicProjectResponseDTO)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        console.log('Projetos carregados:', response);  

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
            const studentName = projeto.studentName || 'Aluno não encontrado';
            const professorName = projeto.professorName || 'Professor não encontrado';

            return (
              <CardAcademicProjs
                key={projeto.id}
                id={projeto.id}
                title={projeto.title}
                description={projeto.description}
                urlPhoto={projeto.urlPhoto || '/default-image.jpg'}  
                pdfLink={projeto.pdfLink}
                siteLink={projeto.siteLink}
                typeAP={projeto.typeAP}
                currentUserEmail={projeto.currentUserEmail}
                creationDate={projeto.creationDate}
                studentName={projeto.studentId ? studentName : undefined}
                professorName={projeto.professorId ? professorName : undefined}
                coauthors={projeto.coauthors}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllProjectsList;