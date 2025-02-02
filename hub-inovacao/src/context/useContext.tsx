"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login } from "@/services/authService";
import { LoginRequestDTO, LoginResponseDTO } from "@/interfaces/loginInterface";

interface AuthContextData {
  user: LoginResponseDTO | null;
  loginUser: (credentials: LoginRequestDTO) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<LoginResponseDTO | null>(null);

  useEffect(() => {
    const storedUserEmail = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("token");

    if (storedUserEmail && storedRole && storedToken) {
      // Se os dados estiverem no localStorage, restaurar o estado, incluindo a propriedade `message`
      setUser({
        email: storedUserEmail,
        role: storedRole,
        token: storedToken,
        message: "Usuário restaurado com sucesso", 
      });
    }
  }, []);

  const loginUser = async (credentials: LoginRequestDTO) => {
    try {
      const response = await login(credentials);
      setUser(response);  
      localStorage.setItem("token", response.token);
      localStorage.setItem("email", response.email);
      localStorage.setItem("role", response.role);
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