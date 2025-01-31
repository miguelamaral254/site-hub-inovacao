"use client";
import { login } from "@/services/authService";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
  
    try {
      const response = await login({ email, password });
      setSuccessMessage(response.message);
      alert(`Login bem-sucedido!\nToken: ${response.token}\nEmail: ${response.email}\nRole: ${response.role}`);
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
          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
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
