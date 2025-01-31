"use client"
import { Role } from "../../interfaces/UserDTO"; // Ajuste o caminho conforme necessário
import { useState } from "react";

const roleLabels: Record<Role, string> = {
  [Role.ADMIN]: "Administrador",
  [Role.PROFESSOR]: "Professor",
  [Role.STUDENT]: "Estudante",
  [Role.MANAGER]: "Gestor",
  [Role.PARTNER_COMPANY]: "Empresa Parceira",
};

export default function RegisterForm () {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: Role.STUDENT, // Valor padrão
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    // enviar os dados para a API
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Criar Conta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nome Completo"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            {Object.values(Role).map((role) => (
              <option key={role} value={role}>
                {roleLabels[role]}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Cadastrar
          </button>
        </form>
        <p className="text-center mt-4">
          Já possui uma conta? <a href="/signin" className="text-blue-600 font-bold">Faça login</a>
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
};
