"use client";

import {
  UserResponseCnpjDTO,
  UserResponseCpfDTO,
} from "@/interfaces/userInterface";
import DashboardHeader from "./DashboardHeader";

interface SidebarCompanyProps {
  setSelectedPage: (page: string) => void;
  userData: UserResponseCnpjDTO | UserResponseCpfDTO | null;
  errorMessage: string;
}

export default function SidebarManager({
  setSelectedPage,
  userData,
  errorMessage,
}: SidebarCompanyProps) {
  return (
    <div className="flex flex-col items-start justify-start w-1/6 bg-white p-6 shadow-lg">
      <div className="mb-6 justify-center">
        <DashboardHeader userData={userData} errorMessage={errorMessage} />
      </div>
      <div className="space-y-4">
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          onClick={() => setSelectedPage("page1")}
        >
         Meus tickets
        </button>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          onClick={() => setSelectedPage("page2")}
        >
          Tickets em aberto (x)
        </button>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          onClick={() => setSelectedPage("page3")}
        >
          Submeter Edital
        </button>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          onClick={() => setSelectedPage("page4")}
        >
          Editais em aberto
        </button>
        
      </div>
    </div>
  );
}
