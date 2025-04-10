/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  RiHome2Line,
  RiHome2Fill,
  RiLogoutBoxRFill,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { RiMailLine } from "react-icons/ri";
import { RiMailFill } from "react-icons/ri";
import { RiFolderUploadLine } from "react-icons/ri";
import { RiFolderUploadFill } from "react-icons/ri";
import { useAuth } from "@/context/useContext";
import { useRouter } from "next/navigation";
import { User } from "../users/user.interface";
import DashboardHeader from "./DashboardHeader";

interface SidebarProps {
  setSelectedPage: (page: string) => void;
  userData: User | null;
  errorMessage: string;
}

export default function Sidebar({
  setSelectedPage,
  userData,
  errorMessage,
}: SidebarProps) {
  const { user, logoutUser } = useAuth();
  const router = useRouter();
  const role = userData?.role;

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  const handleInicio = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-start justify-start w-3xs bg-white p-6 shadow-lg">
      <div className="flex mb-6 justify-center items-center">
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
        <hr className="py-2" />
        {(role === "PROFESSOR" || role === "STUDENT")  && (
          <button
            className="group w-full flex flex-row justify-start items-center gap-4 text-blue-500 font-normal text-base py-4 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-800"
            onClick={() => setSelectedPage("page1")}
          >
            <RiMailLine className="text-xl block group-hover:hidden" />
            <RiMailFill className="text-xl hidden group-hover:block text-blue-900" />
            Caixa de Entrada
          </button>
        )}

        {(role === "PROFESSOR" || role === "STUDENT") && (
          <button
            className="group w-full flex flex-row justify-start items-center gap-4 text-blue-500 font-normal text-base py-4 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-800"
            onClick={() => setSelectedPage("page2")}
          >
            <RiFolderUploadLine className="text-xl block group-hover:hidden" />
            <RiFolderUploadFill className="text-xl hidden group-hover:block text-blue-900" />
            Submeter Projeto
          </button>
        )}
        {role === "MANAGER" && (
          <button
            className="group w-full flex flex-row justify-start items-center gap-4 text-blue-500 font-normal text-base py-4 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-800"
            onClick={() => setSelectedPage("page3")}
          >
            Meus tickets atribuidos
          </button>
        )}
        {role === "MANAGER" && (
          <button
            className="group w-full flex flex-row justify-start items-center gap-4 text-blue-500 font-normal text-base py-4 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-800"
            onClick={() => setSelectedPage("page4")}
          >
            Gerenciar tickets
          </button>
        )}
        {role === "MANAGER" && (
          <button
            className="group w-full flex flex-row justify-start items-center gap-4 text-blue-500 font-normal text-base py-4 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-800"
            onClick={() => setSelectedPage("page5")}
          >
            Gerenciar Editais
          </button>
        )}

        <hr />
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
