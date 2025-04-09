"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { Enterprise } from "@/features/auth/users/enterprise.interface";
import { getEnterpriseById } from "@/features/auth/users/enterprise.service";

export default function DashboardCompanyPage() {
  const [userData, setUserData] = useState<Enterprise | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState("");

  //const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const router = useRouter();


  useEffect(() => {
    const id = localStorage.getItem("id");

    if (id) {
      const fetchUserData = async () => {
        try {
          const response = await getEnterpriseById(parseInt(id));
          const data = response.data;
          setUserData(data);
          localStorage.setItem("userData", JSON.stringify(data));
        } catch (error) {
          console.log(error);
          setErrorMessage("Erro ao buscar os dados.");
        }
      };

      fetchUserData();
    } else {
      setErrorMessage("ID não encontrado.");
    }
  }, []);


  useEffect(() => {
    if (userData && userData.cnpj && userData.role !== "ENTERPRISE") {
      router.push("/"); 
    }
  }, [userData, router]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/*

      <Sidebar setSelectedPage={setSelectedPage} userData={userData} errorMessage={errorMessage} />
      
      <div className="flex-grow p-6">
        <PageContent selectedPage={selectedPage} userData={userData} />
      </div>
        */}
    </div>
  );
}