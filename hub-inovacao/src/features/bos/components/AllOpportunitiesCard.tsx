/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

interface OpportunityCardProps {
  id: string;
  title: string;
  description: string;
  urlPhoto: string;
  pdfLink: string;
  siteLink: string;
  typeBO: string;
  currentUserEmail: string;
  creationDate: string;

}

const AllOpportunitiesCard: React.FC<OpportunityCardProps> = ({
  title,
  description,
  urlPhoto,
  pdfLink,
  siteLink,
  typeBO,
  currentUserEmail,
  creationDate,

}) => {


  return (
    <div className="p-4 border border-gray-200 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">
        <img src={urlPhoto} alt={title} className="w-full h-48 object-cover rounded-md" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-sm text-gray-500 mt-2">Tipo: {typeBO}</p>
      <p className="text-sm text-gray-500 mt-2">Email: {currentUserEmail}</p>


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

export default AllOpportunitiesCard;