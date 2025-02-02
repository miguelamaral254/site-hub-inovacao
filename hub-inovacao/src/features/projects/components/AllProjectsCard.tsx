/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

interface ProjetoCardProps {
  id: string;
  title: string;
  description: string;
  urlPhoto: string;
  pdfLink: string;
  siteLink: string;
  typeAP: string;
  currentUserEmail: string;
  creationDate: string;
  studentName?: string;
  professorName?: string;
  coauthors: Array<{ name: string; email: string; phone: string }> | undefined;
}

const AllProjectsCard: React.FC<ProjetoCardProps> = ({
  title,
  description,
  urlPhoto,
  pdfLink,
  siteLink,
  typeAP,
  currentUserEmail,
  creationDate,
  studentName,
  professorName,
  coauthors = [],
}) => {
  // Define o autor do projeto (se for professor ou estudante)
  const author = studentName || professorName || 'Autor desconhecido';

  const renderCoauthors = () => {
    if (coauthors && coauthors.length > 0) {
      return (
        <div>
          <h4 className="font-semibold">Coautores:</h4>
          <ul className="list-disc pl-5 text-gray-600">
            {coauthors.map((coauthor, index) => (
              <li key={index}>
                {coauthor.name} - {coauthor.email} - {coauthor.phone}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 border border-gray-200 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">
        <img src={urlPhoto} alt={title} className="w-full h-48 object-cover rounded-md" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-sm text-gray-500 mt-2">Tipo: {typeAP}</p>
      <p className="text-sm text-gray-500 mt-2">Autor: {author}</p>
      <p className="text-sm text-gray-500 mt-2">Email: {currentUserEmail}</p>

      {renderCoauthors()}

      <div className="mt-4 flex space-x-4">
        {pdfLink && (
          <a href={pdfLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Ver PDF
          </a>
        )}
        {siteLink && (
          <a href={siteLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Visitar Site
          </a>
        )}
      </div>
    </div>
  );
};

export default AllProjectsCard;