"use client"; 
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/features/auth/users/user.interface";
import { getUserById } from "@/features/auth/users/user.service";
import Sidebar from "@/features/auth/signin/Sidebar";
import PageContent from "@/features/auth/signin/PageContent";
import { useAuth } from "@/context/useContext";  // Importando o hook useAuth

export default function DashboardPage() {
  const [userData, setUserData] = useState<User | null>(null);
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

    const fetchUserData = async () => {
      try {
        const response = await getUserById(user.idUser);
        const data = response.data.data; 
    
        setUserData(data); 
        //console.log("Dados do usuário:", data); 
    
        if (
          data.role !== "STUDENT" &&
          data.role !== "PROFESSOR" &&
          data.role !== "MANAGER" 
        ) {
          router.push("/"); 
          return;
        }
      } catch (error) {
        console.log(error)
        setErrorMessage("Erro ao buscar os dados.");
        
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [router, user]); 

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