import React from "react";
import { Publish } from "./publish.interface";

interface PublishCardProps extends Publish {
  onClick: () => void;
}

const PublishCard: React.FC<PublishCardProps> = ({
  title,
  description,
  acessLink,
  createdDate,
  onClick,
}) => {
  const truncatedDescription = description && description.length > 600 ? `${description.slice(0, 600)}...` : description;

  return (
    <div
      className="flex bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] mt-3
      transition-shadow duration-300 hover:shadow-[0_0px_30px_rgba(78,95,181,0.44)] rounded-lg flex-col lg:flex-row w-full py-3 px-3 items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full flex flex-col">
        <h2 className="text-2xl font-medium text-gray-950 truncate mb-4">{title}</h2>
        <p className="text-base text-blue-800 mb-4">Publicado em: {createdDate}</p>

        <div className="flex-1 max-h-[150px] overflow-y-auto mb-4">
          <p className="text-base text-gray-800 whitespace-normal break-words">
            {truncatedDescription}
          </p>
        </div>

        <a href={acessLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-2 mb-4 text-sm">
          Acesso ao Edital
        </a>
      </div>
    </div>
  );
};

export default PublishCard;