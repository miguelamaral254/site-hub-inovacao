"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/useContext";
import RegisterForm from "@/features/public-components/signup/RegisterForm";
export default function Register() {
  const { user } = useAuth();  
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/"); 
    }
  }, [user, router]);

  return <RegisterForm />;
}