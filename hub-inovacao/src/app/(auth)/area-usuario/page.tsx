"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Usando o router para redirecionar
import { UserResponseCnpjDTO, UserResponseCpfDTO } from "@/interfaces/userInterface";
import { getUserByEmail } from "@/services/userService";
import Sidebar from "@/features/users/userscpf/dashboard/Sidebar";
import PageContent from "@/features/users/userscpf/dashboard/PageContent";

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserResponseCnpjDTO | UserResponseCpfDTO | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 
  const router = useRouter(); 

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (!email) {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const data = await getUserByEmail(email);
        setUserData(data);

        // Verifica se o 'role' é diferente de 'STUDENT' ou 'PROFESSOR'
        if (data.role !== "STUDENT" && data.role !== "PROFESSOR") {
          router.push("/"); // Redireciona para a página inicial
          return;
        }

        localStorage.setItem("userData", JSON.stringify(data));

        console.log("Dados armazenados no localStorage:", localStorage.getItem("userData"));
      } catch (error) {
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