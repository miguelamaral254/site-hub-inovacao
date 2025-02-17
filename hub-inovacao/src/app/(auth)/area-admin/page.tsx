"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserResponseCnpjDTO } from "@/interfaces/userInterface";
import { getUserByEmail } from "@/services/userService";
import AdminPageContent from "@/features/auth-components/admins/AdminPageContent";
import AdminSidebar from "@/features/auth-components/admins/AdminSidebar";


export default function AdminPage() {
  const [userData, setUserData] = useState<UserResponseCnpjDTO | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      const fetchUserData = async () => {
        try {
          const data = await getUserByEmail(email);

          if ((data as UserResponseCnpjDTO)?.cnpj) {
            setUserData(data as UserResponseCnpjDTO);

            localStorage.setItem("userData", JSON.stringify(data));

            console.log("Dados armazenados no localStorage:", localStorage.getItem("userData"));
          } else {
            setErrorMessage("Usuário não encontrado ou não é um usuário com CPF.");
          }
        } catch (error) {
          console.log(error);
          setErrorMessage("Erro ao buscar os dados.");
        }
      };

      fetchUserData();
    } else {
      setErrorMessage("Email não encontrado.");
    }
  }, []);

  useEffect(() => {
    if (userData && userData.role !== "ADMIN") {
      router.push("/"); 
    }
  }, [userData, router]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar setSelectedPage={setSelectedPage} userData={userData} errorMessage={errorMessage} />

      <div className="flex-grow p-6">
        {userData ? (
          <AdminPageContent selectedPage={selectedPage} userData={userData} />
        ) : (
          <div>Carregando...</div>
        )}
      </div>
    </div>
  );
}