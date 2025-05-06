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
import Oportunidades from '../../../app/(public)/oportunidades/page';
import { useState } from "react";

import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { menuItems } from "@/utils/menu-items";

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

  const [isOpen, setIsOpen] = useState(true)

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  const handleInicio = () => {
    router.push("/");
  };

  return (
    <div>
      <div
        className=
        {`flex flex-col items-start justify-start w-3xs fixed top-[7%] ${isOpen ? "left-0" : "-left-[150%]"} md:static h-full bg-white p-6 shadow-lg transition-all duration-500 z-20`}
        >
        <div className="flex mb-6 justify-center items-center" >
          <DashboardHeader userData={userData} errorMessage={errorMessage} />
        </div>

        <button className="absolute top-10 right-4 cursor-pointer md:hidden" onClick={() => setIsOpen(false)}>
          <FaRegArrowAltCircleLeft className="text-2xl text-blue-500"/>
        </button>

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
          {menuItems
            .filter((item) => item.roles.includes(role as string))
            .map((item, index) => (
              <button
                key={index}
                className="group w-full flex flex-row justify-start items-center gap-4 text-blue-500 font-normal text-base py-4 px-2 rounded-lg hover:bg-blue-50 hover:text-blue-800"
                onClick={() => (setSelectedPage(item.page), setIsOpen(false))}
              >
                {item.icon}
                {item.hoverIcon}
                {item.label}
              </button>
            ))}

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

      <button 
        className="fixed mt-8 left-4 cursor-pointer md:hidden transition-all duration-500" 
        onClick={() => setIsOpen(true)}
        style={{ display: isOpen ? 'none' : 'block' }}
      >
          <FaRegArrowAltCircleRight className="text-2xl text-blue-500"/>
        </button>
    </div>
  );
}
