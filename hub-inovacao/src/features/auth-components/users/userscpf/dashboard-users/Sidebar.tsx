"use client";

import {
  UserResponseCnpjDTO,
  UserResponseCpfDTO,
} from "@/interfaces/userInterface";
import DashboardHeader from "./DashboardHeader";

interface SidebarProps {
  setSelectedPage: (page: string) => void;
  userData: UserResponseCnpjDTO | UserResponseCpfDTO | null;
  errorMessage: string;
}

import { RiHome2Line, RiHome2Fill } from "react-icons/ri";
import { RiFolderOpenLine, RiFolderOpenFill } from "react-icons/ri";
import { RiFileList3Line, RiFileList3Fill } from "react-icons/ri";
import { RiFolderUploadLine, RiFolderUploadFill } from "react-icons/ri";
import { RiLogoutBoxRLine, RiLogoutBoxRFill } from "react-icons/ri";

import { useAuth } from "@/context/useContext";
import { useRouter } from "next/navigation";

export default function Sidebar({ setSelectedPage, userData, errorMessage }: SidebarProps) {
  const { logoutUser } = useAuth();
  const router = useRouter();

  const handleInicio = () => {
    router.push("/")
  }

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

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
          <RiFolderOpenLine className="text-xl block group-hover:hidden" />
          <RiFolderOpenFill className="text-xl hidden group-hover:block text-blue-900" />
          Meus Projetos
        </button>
        <button
          className="group w-full flex flex-row justify-start items-center gap-4 text-blue-500 font-normal text-base py-4 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-800"
          onClick={() => setSelectedPage("page2")}
        >
          <RiFileList3Line className="text-xl block group-hover:hidden" />
          <RiFileList3Fill className="text-xl hidden group-hover:block text-blue-900" />
          Acompanhar Projeto
        </button>
        <button
          className="group w-full flex flex-row justify-start items-center gap-4 text-blue-500 font-normal text-base py-4 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-800"
          onClick={() => setSelectedPage("page3")}
        >
          <RiFolderUploadLine className="text-xl block group-hover:hidden" />
          <RiFolderUploadFill className="text-xl hidden group-hover:block text-blue-900" />
          Submeter Projeto
        </button>
        <hr className="py-4" />
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
