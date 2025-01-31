"use client"; 

import { useState, useEffect } from "react";
import { UserResponseCnpjDTO, UserResponseCpfDTO } from "@/interfaces/userInterface";
import { getUserByEmail } from "@/services/userService";

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserResponseCnpjDTO | UserResponseCpfDTO | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Recupera o email do localStorage
    const email = localStorage.getItem("email");
    
    if (email) {
      const fetchUserData = async () => {
        try {
          const data = await getUserByEmail(email);  // Faz a requisição com o email do localStorage
          setUserData(data);  // Armazena os dados do usuário
        } catch (error) {
          if (error instanceof Error) {
            setErrorMessage(error.message);  // Exibe a mensagem de erro
          } else {
            setErrorMessage("Erro inesperado ao buscar os dados.");
          }
        }
      };

      fetchUserData();
    } else {
      setErrorMessage("Email não encontrado no localStorage.");
    }
  }, []); // Executa apenas uma vez, quando a página for carregada

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Dashboard</h2>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        {userData ? (
          <div className="mt-4">
            <p><strong>Nome:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            {/* Exiba outras informações conforme necessário */}
          </div>
        ) : (
          <p className="text-gray-500 text-sm mb-4">Carregando dados do usuário...</p>
        )}
      </div>
    </div>
  );
}