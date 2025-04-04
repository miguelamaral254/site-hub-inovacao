"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/features/auth/users/users/Sidebar"; 
import PageContent from "@/features/auth/users/users/PageContent"; 
import { User } from "@/features/auth/users/users/user.interface";
import { getUserById } from "@/features/auth/users/users/user.service";

export default function DashboardPage() {
  const [userData, setUserData] = useState<User | null>(null);
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
        const numericId = parseInt(id);
        if (isNaN(numericId)) {
          throw new Error("ID inválido");
        }

        const response = await getUserById(numericId);
        const data = response.data;
        setUserData(data);

        localStorage.setItem("userData", JSON.stringify(data));

        const storedUserData = localStorage.getItem("userData");
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
        
        if (parsedUserData && parsedUserData.data.role !== "STUDENT" && parsedUserData.data.role !== "PROFESSOR") {
          console.log("Redirecionando para a página inicial devido à role inválida:", parsedUserData.data.role);
          router.push("/"); 
          return;
        }
      } catch (error) {
        console.log(error);
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