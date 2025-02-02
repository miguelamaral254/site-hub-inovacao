import React from "react";

const OpportunityCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col w-full max-w-[350px] h-auto bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] rounded-lg px-3 py-4 ml-[32px] transition-shadow duration-300 relative">
      <div className="flex justify-center w-full">
        <div className="mb-4 mt-5">
          <div className="w-full h-48 bg-gray-300 animate-pulse rounded-md"></div> {/* Skeleton da imagem */}
        </div>
      </div>

      <div className="py-2 mt-3 mb-10">
        <div className="w-2/3 h-6 bg-gray-300 animate-pulse mb-2"></div> {/* Skeleton do título */}
        <div className="w-full h-4 bg-gray-300 animate-pulse"></div> {/* Skeleton da descrição */}
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <div className="w-20 h-8 bg-blue-500 animate-pulse rounded-md"></div> {/* Skeleton do botão Editar */}
      </div>
    </div>
  );
};

export default OpportunityCardSkeleton;