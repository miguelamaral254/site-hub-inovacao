/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { UserResponseCnpjDTO, UserResponseCpfDTO } from "@/interfaces/userInterface";
import { getUserByEmail } from "@/services/userService";
import Sidebar from "@/features/users/userscpf/dashboard/Sidebar";
import PageContent from "@/features/users/userscpf/dashboard/PageContent";

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserResponseCnpjDTO | UserResponseCpfDTO | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      const fetchUserData = async () => {
        try {
          const data = await getUserByEmail(email);
          setUserData(data);

          // Armazenando userData completo no localStorage para ser acessado em outras páginas
          localStorage.setItem("userData", JSON.stringify(data));

          // Console log para verificar o que foi armazenado no localStorage
          console.log("Dados armazenados no localStorage:", localStorage.getItem("userData"));
        } catch (error) {
          setErrorMessage("Erro ao buscar os dados.");
        }
      };

      fetchUserData();
    } else {
      setErrorMessage("Email não encontrado.");
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar setSelectedPage={setSelectedPage} userData={userData} errorMessage={errorMessage} />
      
      <div className="flex-grow p-6">
        <PageContent selectedPage={selectedPage} userData={userData} />
      </div>
    </div>
  );
}