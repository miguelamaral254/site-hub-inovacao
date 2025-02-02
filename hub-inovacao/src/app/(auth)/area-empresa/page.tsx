"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Usando o router para redirecionar
import { UserResponseCnpjDTO, UserResponseCpfDTO } from "@/interfaces/userInterface";
import { getUserByEmail } from "@/services/userService";
import SidebarCompany from "@/features/users/userscpj/DashboardCompany/SidebarCompany";
import PageContentCompany from "@/features/users/userscpj/DashboardCompany/PageContentCompany";


export default function DashboardCompanyPage() {
  const [userData, setUserData] = useState<UserResponseCnpjDTO | UserResponseCpfDTO | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      const fetchUserData = async () => {
        try {
          const data = await getUserByEmail(email);
          setUserData(data);

          localStorage.setItem("userData", JSON.stringify(data));

        } catch (error) {
          setErrorMessage("Erro ao buscar os dados.");
        }
      };

      fetchUserData();
    } else {
      setErrorMessage("Email não encontrado.");
    }
  }, []);

  // Verifica se o role é PARTNER_COMPANY, se não redireciona
  useEffect(() => {
    if (userData && userData.role !== "PARTNER_COMPANY") {
      router.push("/"); // Redireciona para a página inicial se não for uma empresa
    }
  }, [userData, router]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarCompany setSelectedPage={setSelectedPage} userData={userData} errorMessage={errorMessage} />
      
      <div className="flex-grow p-6">
        <PageContentCompany selectedPage={selectedPage} userData={userData} />
      </div>
    </div>
  );
}