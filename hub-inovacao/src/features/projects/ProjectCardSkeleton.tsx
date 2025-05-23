import React from "react";

const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="p-4 border-b bg-white">
      <div className="grid grid-cols-6 items-center gap-4">
        <div className="col-span-2 w-2/3 h-6 bg-gray-300 animate-pulse mb-2"></div> 
        <div className="w-full h-4 bg-gray-300 animate-pulse"></div> 
        <div className="w-full h-4 bg-gray-300 animate-pulse"></div> 
        <div className="w-full h-4 bg-gray-300 animate-pulse"></div> 
        <div className="w-20 h-8 bg-blue-500 animate-pulse rounded-md"></div> 
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        
      </div>
    </div>
    
  );
};

export default ProjectCardSkeleton;