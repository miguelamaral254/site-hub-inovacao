"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserResponseCnpjDTO, UserResponseCpfDTO } from "@/interfaces/userInterface";
import { getUserByEmail } from "@/services/userService";
import SidebarCompany from "@/features/auth-components/users/userscpj/DashboardCompany/SidebarCompany";
import PageContentCompany from "@/features/auth-components/users/userscpj/DashboardCompany/PageContentCompany";

export default function DashboardCompanyPage() {
  const [userData, setUserData] = useState<UserResponseCnpjDTO | UserResponseCpfDTO | undefined>(undefined);
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
    if (userData && "cnpj" in userData && userData.role !== "PARTNER_COMPANY") {
      router.push("/");
    }
  }, [userData, router]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarCompany setSelectedPage={setSelectedPage} userData={userData as UserResponseCnpjDTO} errorMessage={errorMessage} />
      
      <div className="flex-grow p-6">
        <PageContentCompany selectedPage={selectedPage} userData={userData as UserResponseCnpjDTO} />
      </div>
    </div>
  );
}