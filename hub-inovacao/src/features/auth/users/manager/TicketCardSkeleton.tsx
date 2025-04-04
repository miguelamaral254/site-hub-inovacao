"use client";

import React from "react";

const TicketCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col w-full max-w-[350px] h-auto bg-white shadow-lg rounded-lg px-3 py-4 transition-shadow duration-300 relative">
      <div className="flex justify-center w-full">
        <div className="mb-4 mt-5">
          <div className="w-full h-48 bg-gray-300 animate-pulse rounded-md"></div>
        </div>
      </div>

      <div className="py-2 mt-3 mb-10">
        <div className="w-2/3 h-6 bg-gray-300 animate-pulse mb-2"></div>
        <div className="w-full h-4 bg-gray-300 animate-pulse"></div>
      </div>

      <div className="absolute bottom-4 right-4 flex">
        <div className="w-24 h-8 bg-blue-500 animate-pulse rounded-md"></div>
      </div>
    </div>
  );
};

export default TicketCardSkeleton;