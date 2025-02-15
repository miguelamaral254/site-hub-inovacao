"use client";

import {
  UserResponseCnpjDTO,
} from "@/interfaces/userInterface";
import DashboardHeader from "./DashboardHeader";

import { RiHome2Line, RiHome2Fill } from "react-icons/ri";
import { RiTicket2Line,RiTicket2Fill } from "react-icons/ri";
import { RiLogoutBoxRLine, RiLogoutBoxRFill } from "react-icons/ri";
import { RiFolderUploadLine } from "react-icons/ri";
import { RiFolderUploadFill } from "react-icons/ri";
import { RiBookOpenLine } from "react-icons/ri";
import { RiBookOpenFill } from "react-icons/ri";

import { useAuth } from "@/context/useContext";
import { useRouter } from "next/navigation";

interface SidebarCompanyProps {
  setSelectedPage: (page: string) => void;
  userData: UserResponseCnpjDTO;
  errorMessage: string;
}

export default function SidebarCompany({
  setSelectedPage,
  userData,
  errorMessage,
}: SidebarCompanyProps) {
  const { user, logoutUser } = useAuth();
const router = useRouter();

const handleLogout = () => {
  logoutUser();
  router.push("/");
};

const handleInicio = () => {
  router.push("/")
}
  return (
    <div className="flex flex-col items-start justify-start w-3xs bg-white p-6 shadow-lg">
      <div className="flex mb-6 justify-center items-center ">
        <DashboardHeader userData={userData} errorMessage={errorMessage} />
      </div>
      <div className="space-y-4">
      <button
          className="group w-full flex flex-row justify-start items-center gap-4 text-blue-500 font-normal text-base py-4 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-800"
          onClick={() => handleInicio()}
        >
         <RiHome2Line className="text-xl block group-hover:hidden" /> 
         <RiHome2Fill className="text-xl hidden group-hover:block text-blue-900" />
         Página Inicial
        </button>
        <hr className="py-3" />
        <button
          className="group w-full flex flex-row justify-start items-center gap-4 text-blue-500 font-normal text-base py-4 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-800"
          onClick={() => setSelectedPage("page1")}
        >
          Submissões aprovadas
        </button>
        <button
          className="group w-full flex flex-row justify-start items-center gap-4 text-blue-500 font-normal text-base py-4 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-800"
          onClick={() => setSelectedPage("page2")}
        >
          Acompanhar Submissões
        </button>
        <button
          className="group w-full flex flex-row justify-start items-center gap-4 text-blue-500 font-normal text-base py-4 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-800"
          onClick={() => setSelectedPage("page3")}
        >
          Nova Submissão
        </button>
        <hr className="py-4"/>
        <button
          className="group w-full flex flex-row justify-start items-center gap-4 text-[#6F0608] font-normal text-base py-4 px-2 rounded-lg"
          onClick={() => handleLogout()}
        >
         <RiLogoutBoxRLine className="text-xl block group-hover:hidden" /> 
         <RiLogoutBoxRFill className="text-xl hidden group-hover:block" />
          Sair
        </button>
      </div>
    </div>
  );
}
