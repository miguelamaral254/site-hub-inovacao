/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import useSwal from "@/hooks/useSwal";
import { Course, Institution, Role, User } from "./user";
import { createUser } from "./userService";

const CreateUserForm: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [institution, setInstitution] = useState<Institution>(Institution.SENAC);
  const [course, setCourse] = useState<Course>(Course.ADS);
  const [role, setRole] = useState<Role>(Role.USER);

  const { showSuccess, showError } = useSwal();

  // Preparando os dados do usuário
  const userData: User = {
    name: name || "Nome de Exemplo",
    email: email || "email@exemplo.com",
    password: password || "senha123",
    cpf: cpf || "12345678901",
    institution: institution,
    course: course,
    role: role,
    imageUrl: "",  // Valor vazio ou URL de imagem caso exista
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      setErrorMessage("A imagem do usuário é obrigatória");
      return;
    }
  
    // Criando o FormData para enviar os dados
    const formData = new FormData();
    formData.append("dto", new Blob([JSON.stringify(userData)], { type: "application/json" }));
    formData.append("file", imageFile);
  
    // Log dos dados antes do envio
    console.log("Dados enviados para o backend:", userData);
    console.log("FormData com os dados:", formData);
  
    try {
      setIsLoading(true);
      await createUser(formData); // Agora passando apenas formData
      showSuccess("Usuário criado com sucesso!");
      setImageFile(null);
      setErrorMessage("");
      setName("");
      setEmail("");
      setPassword("");
      setCpf("");
    } catch (error) {
      console.error(error);
      showError("Erro ao criar usuário.");
      setErrorMessage("Falha ao criar usuário. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Criar Usuário</h2>

      {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nome do Usuário
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome do usuário"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite o email do usuário"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite a senha"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cpf" className="block text-sm font-medium mb-2">
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Digite o CPF do usuário"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imageFile" className="block text-sm font-medium mb-2">
            Escolher Imagem
          </label>
          <input
            type="file"
            id="imageFile"
            accept="image/*"
            onChange={(e) =>
              setImageFile(e.target.files ? e.target.files[0] : null)
            }
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="institution" className="block text-sm font-medium mb-2">
            Instituição
          </label>
          <select
            id="institution"
            value={institution}
            onChange={(e) => setInstitution(e.target.value as Institution)}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value={Institution.SENAC}>SENAC</option>
            <option value={Institution.UNIT}>UNIT</option>
            <option value={Institution.UNICAP}>UNICAP</option>
            <option value={Institution.CESAR}>CESAR</option>
            <option value={Institution.UNINASSAU}>UNINASSAU</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="course" className="block text-sm font-medium mb-2">
            Curso
          </label>
          <select
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value as Course)}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value={Course.ADS}>ADS</option>
            <option value={Course.SPI}>SPI</option>
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-md w-full hover:bg-blue-700 transition"
          >
            {isLoading ? "Enviando..." : "Criar Usuário"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;