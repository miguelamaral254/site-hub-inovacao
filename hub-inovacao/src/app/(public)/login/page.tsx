"use client";  
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/useContext";

export default function LoginPage() {
  const { loginUser, user } = useAuth();  // Usando o login do contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === "PARTNER_COMPANY") {
        router.push("/area-empresa");
      } else if (user.role === "ADMIN") {
        router.push("/area-admin");
      } else if (user.role === "MANAGER") {
        router.push("/area-manager");
      } else {
        router.push("/area-usuario");
      }
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await loginUser({ email, password }); 
      setSuccessMessage("Login bem-sucedido!");

      if (user) {
        if (user.role === "PARTNER_COMPANY") {
          router.push("/area-empresa");
        } else if (user.role === "ADMIN") {
          router.push("/area-admin");
        } else if (user.role === "MANAGER") {
          router.push("/area-manager");
        } else {
          router.push("/area-usuario");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm mb-4">{successMessage}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>
        <p className="text-center mt-4">
          Não possui uma conta? <a href="/cadastro" className="text-blue-600 font-bold">Faça Cadastro</a>
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-4 w-full bg-gray-300 py-2 rounded-lg hover:bg-gray-400"
        >
          Voltar para o site
        </button>
      </div>
    </div>
  );
}