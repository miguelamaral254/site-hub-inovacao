/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; 
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { login } from "@/features/auth/signin/auth.service";
import { LoginRequest, LoginResponse } from "@/features/auth/signin/login.interface";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  idUser: number;
  role: string;
  email: string;
  [key: string]: any;
}

interface AuthContextData {
  user: { role: string, email: string, idUser: number } | null;
  loginUser: (credentials: LoginRequest) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const useAuthToken = () => {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken: JwtPayload = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Erro ao decodificar token", error);
        setUser(null);
      }
    }
  }, []);

  return user;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ role: string, email: string, idUser: number } | null>(null);

  const userFromToken = useAuthToken(); 

  useEffect(() => {
    if (userFromToken) {
      setUser({
        role: userFromToken.role,
        email: userFromToken.email,
        idUser: userFromToken.idUser,
      });
    }
  }, [userFromToken]);

  const loginUser = async (credentials: LoginRequest) => {
    try {
      const response = await login(credentials);
      const { token } = response;

      localStorage.setItem("token", token);

      const decodedToken: LoginResponse = jwtDecode(token);
      setUser({
        role: decodedToken.role,
        email: decodedToken.email,
        idUser: decodedToken.idUser,
      });
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