"use client";
import { login } from "@/features/auth/auth.service";
import { LoginRequest, LoginResponse } from "@/features/auth/login.interface";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";


interface AuthContextData {
  user: LoginResponse | null;
  loginUser: (credentials: LoginRequest) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);

  useEffect(() => {
    const storedUserEmail = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("token");
    const storedId = localStorage.getItem("id")

    if (storedUserEmail && storedRole && storedToken && storedId) {
      // Se os dados estiverem no localStorage, restaurar o estado, incluindo a propriedade `message`
      setUser({
        email: storedUserEmail,
        role: storedRole,
        token: storedToken,
        idUser: parseInt(storedId as string),
        message: "Usuário restaurado com sucesso", 
      });
    }
  }, []);

  const loginUser = async (credentials: LoginRequest) => {
    try {
      const response = await login(credentials);
      setUser(response);  
      localStorage.setItem("token", response.token);
      localStorage.setItem("email", response.email);
      localStorage.setItem("role", response.role);
      localStorage.setItem("id", response.idUser.toString())
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erro desconhecido ao tentar realizar login");
    }
  };

  const logoutUser = () => {
    setUser(null); 
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};