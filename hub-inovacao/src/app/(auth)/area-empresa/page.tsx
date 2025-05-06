"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/features/auth/signin/Sidebar";
import PageContent from "@/features/auth/signin/PageContent";
import { useAuth } from "@/context/useContext";
import { Enterprise } from "@/features/auth/users/enterprise.interface";
import { getEnterpriseById } from "@/features/auth/users/enterprise.service";

export default function EnterpriseDashboardPage() {
  const [enterpriseData, setEnterpriseData] = useState<Enterprise | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth(); 

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchEnterpriseData = async () => {
      try {
        const response = await getEnterpriseById(user.idUser); 
        const data = response.data.data;

        setEnterpriseData(data);

        if (data.role !== "ENTERPRISE") {
          router.push("/");
          return;
        }
      } catch (error) {
        console.log(error);
        setErrorMessage("Erro ao buscar os dados da empresa.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnterpriseData();
  }, [router, user]);

  if (loading) return <div>Loading...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        setSelectedPage={setSelectedPage}
        userData={enterpriseData}
        errorMessage={errorMessage}
      />

      <div className="flex-grow p-6">
        <PageContent selectedPage={selectedPage} userData={enterpriseData} />
      </div>
    </div>
  );
}