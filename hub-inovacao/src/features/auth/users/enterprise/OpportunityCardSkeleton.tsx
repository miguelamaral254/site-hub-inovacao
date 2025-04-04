"use client";

import React from "react";

const PublishCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row bg-gray-200 shadow-md rounded-lg overflow-hidden border border-gray-300 animate-pulse">
      <div className="w-full sm:w-36 h-36 bg-gray-300"></div>

      <div className="flex flex-col justify-between p-4 w-full">
        <div>
          <div className="w-2/3 h-6 bg-gray-400 rounded-md"></div>
          <div className="w-full h-4 bg-gray-400 mt-2 rounded-md"></div>
          <div className="w-3/4 h-4 bg-gray-400 mt-2 rounded-md"></div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="w-1/3 h-4 bg-gray-400 rounded-md"></div>
          <div className="w-20 h-8 bg-blue-400 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default PublishCardSkeleton;