"use client";
import { useState } from "react";
import { createUserWithCpf } from "@/services/userService"; 
import { Role } from "@/interfaces/userInterface"; 

const roleLabels: Record<Role, string> = {
  [Role.PROFESSOR]: "Professor",
  [Role.STUDENT]: "Estudante",
  [Role.PARTNER_COMPANY]: "Parceiro de Empresa",
  // Os papéis ADMIN e MANAGER não precisam ser mostrados no frontend, mas ainda são definidos no mapeamento
  [Role.ADMIN]: "Administrador", 
  [Role.MANAGER]: "Gerente",     
};

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: Role.STUDENT,
    cpf: "",
    registration: "",
    phones: [{ number: "" }],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const phones = [...formData.phones];
    phones[index].number = e.target.value;
    setFormData({ ...formData, phones });
  };

  const handleAddPhone = () => {
    setFormData({ ...formData, phones: [...formData.phones, { number: "" }] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);

    try {
      const response = await createUserWithCpf(formData);
      console.log("Usuário criado com sucesso:", response);
    } catch (error) {
      console.error("Erro ao criar usuário:", error.message);
    }
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
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="registration"
            placeholder="Matrícula"
            value={formData.registration}
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
            {Object.values(Role)
              .filter((role) => role !== Role.ADMIN && role !== Role.MANAGER) // Excluindo ADMIN e MANAGER da lista
              .map((role) => (
                <option key={role} value={role}>
                  {roleLabels[role]} {/* Exibe o nome traduzido */}
                </option>
              ))}
          </select>
          <div className="space-y-2">
            {formData.phones.map((phone, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  name={`phone-${index}`}
                  value={phone.number}
                  onChange={(e) => handlePhoneChange(index, e)}
                  placeholder="Número de telefone"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddPhone}
              className="text-blue-600 hover:underline"
            >
              Adicionar outro telefone
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Cadastrar
          </button>
        </form>
        <p className="text-center mt-4">
          Já possui uma conta?{" "}
          <a href="/signin" className="text-blue-600 font-bold">
            Faça login
          </a>
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