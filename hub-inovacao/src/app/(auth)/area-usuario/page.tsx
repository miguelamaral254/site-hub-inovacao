"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserResponseCnpjDTO, UserResponseCpfDTO } from "@/interfaces/userInterface";
import { getUserByEmail, getUserById } from "@/services/userService";
import Sidebar from "@/features/auth-components/users/userscpf/dashboard-users/Sidebar";
import PageContent from "@/features/auth-components/users/userscpf/dashboard-users/PageContent";

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserResponseCnpjDTO | UserResponseCpfDTO | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 
  const router = useRouter(); 

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (!id) {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await getUserById(parseInt(id));
        const data = response.data 
        setUserData(data);


        // Verifica se o 'role' é diferente de 'STUDENT' ou 'PROFESSOR'
        if (data.role !== "STUDENT" && data.role !== "PROFESSOR") {
          router.push("/"); // Redireciona para a página inicial
          return;
        }

        localStorage.setItem("userData", JSON.stringify(data));

        console.log("Dados armazenados no localStorage:", localStorage.getItem("userData"));
      } catch (error) {
        console.log(error)

        setErrorMessage("Erro ao buscar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>; 
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar setSelectedPage={setSelectedPage} userData={userData} errorMessage={errorMessage} />
      
      <div className="flex-grow p-6">
        <PageContent selectedPage={selectedPage} userData={userData} />
      </div>
    </div>
  );
}