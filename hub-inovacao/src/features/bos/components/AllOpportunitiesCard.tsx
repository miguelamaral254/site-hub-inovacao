/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FaFilePdf, FaExternalLinkAlt, FaUser, FaTimes, FaBuilding, FaPhoneAlt } from 'react-icons/fa';

interface AllOpportunitiesCardProps {
  id: string;
  title: string;
  description: string;
  urlPhoto: string;
  pdfLink: string;
  siteLink: string;
  typeBO: string;
  currentUserEmail: string;
  creationDate: string;
  institutionOrganization: string;  
}

const AllOpportunitiesCard: React.FC<AllOpportunitiesCardProps> = ({
  title,
  description,
  urlPhoto,
  pdfLink,
  siteLink,
  typeBO,
  currentUserEmail,
  creationDate,
  institutionOrganization,  
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="p-4 border border-gray-200 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 relative max-w-xs">
      <div className="mb-4">
      <img src={urlPhoto || '/default-image.jpg'} alt={title} className="w-full h-48 object-cover rounded-md" />      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-800 mt-4 break-words max-h-24 overflow-auto">{description}</p>            <p className="text-sm text-gray-500 mt-2">Tipo: {typeBO}</p>
      <p className="text-sm text-gray-500 mb-16 mt-2">Instituição: {institutionOrganization}</p>

      {/* Botão "Mais Informações" no canto inferior direito */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={handleModalToggle}
          className="text-sm text-center py-2 px-4 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition duration-200"
        >
          Mais Informações
        </button>
      </div>

      {/* Modal com mais informações */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-[80%] max-w-[600px] relative">
            <button
              onClick={handleModalToggle}
              className="absolute top-2 right-2 text-2xl text-blue-500 hover:text-blue-700"
            >
              <FaTimes />
            </button>

            <div className="flex justify-center mb-4">
              <img src={urlPhoto} alt={title} className="w-full h-48 object-cover rounded-md" />
            </div>

            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <p className="mb-4">{description}</p>

            <p className="text-gray-600">Data de Criação: {creationDate}</p>
            <div className="flex items-center mt-4">
                <FaBuilding className="mr-2" />
                <div>
                    <p className="text-gray-600">Instituição: {institutionOrganization}</p> 
                    <p className="text-gray-600">Tipo: {typeBO}</p>
                </div>
            </div>

            <div className="flex items-center mt-4">
              <FaPhoneAlt className="mr-2" />
              <div>
                <div>
                <p className="text-gray-600">Contatos: {}</p>

                </div>
                <p className="text-gray-600">email: {currentUserEmail}</p>
              </div>
            </div>

            {pdfLink && (
              <a
                href={pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-start gap-2 text-sm text-gray-700 py-1.5 px-3 rounded-lg mt-2"
              >
                <FaFilePdf />
                <span>PDF</span>
              </a>
            )}

            {siteLink && (
              <a
                href={siteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-start gap-2 text-sm text-gray-700 py-1.5 px-3 rounded-lg mt-2"
              >
                <FaExternalLinkAlt />
                <span>Visitar Site</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOpportunitiesCard;