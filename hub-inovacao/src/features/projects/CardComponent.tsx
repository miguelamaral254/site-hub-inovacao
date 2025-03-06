import React from 'react';
import { Project } from './projectInterface';

interface CardProps {
  project: Project;
}

const CardComponent: React.FC<CardProps> = ({ project }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border">
      <img src={project.urlPhoto} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" />
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{project.description}</p>
        <p className="text-sm text-gray-600"><strong>Tipo:</strong> {project.projectType}</p>
        <p className="text-sm text-gray-600"><strong>Status:</strong> {project.status}</p>
        <p className="text-sm text-gray-600"><strong>Autor:</strong> {project.idUser}</p>
        <div className="mt-4 flex justify-between">
          <a href={project.siteLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">Acesse o site</a>
          <a href={project.pdfLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">Baixar PDF</a>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
