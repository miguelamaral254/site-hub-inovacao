"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserResponseCpfDTO } from "@/interfaces/userInterface"; // Importando o tipo correto
import { getUserById } from "@/services/userService";
import PageContentManager from "@/features/auth-components/users/userscpf/dashboard-manager/PageContentManager";
import SidebarManager from "@/features/auth-components/users/userscpf/dashboard-manager/SidebarManager";

export default function DashboardManagerPage() {
  const [userData, setUserData] = useState<UserResponseCpfDTO | null>(null); // Garantindo que sempre seja um CPF
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (id) {
      const fetchUserData = async () => {
        try {
          const response = await getUserById(parseInt(id));
          const data = response.data 

          if ((data as UserResponseCpfDTO)?.cpf) {
            setUserData(data as UserResponseCpfDTO);

            localStorage.setItem("userData", JSON.stringify(data));

            console.log("Dados armazenados no localStorage:", localStorage.getItem("userData"));
          } else {
            setErrorMessage("Usuário não encontrado ou não é um usuário com CPF.");
          }
        } catch (error) {
          console.log(error)
          setErrorMessage("Erro ao buscar os dados.");
        }
      };

      fetchUserData();
    } else {
      setErrorMessage("Email não encontrado.");
    }
  }, []);

  useEffect(() => {
    if (userData && userData.role !== "MANAGER") {
      router.push("/"); 
    }
  }, [userData, router]);
  console.log("Renderizando App...");
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarManager setSelectedPage={setSelectedPage} userData={userData} errorMessage={errorMessage} />

      <div className="flex-grow ml-40 p-6">
        {userData ? (
          <PageContentManager selectedPage={selectedPage} userData={userData} />
        ) : (
          <div>Carregando...</div>
        )}
      </div>
    </div>
  );
}