"use client";

import React, { useState } from "react";
import useSwal from "@/hooks/useSwal";
import { Book, Gender } from "./Book";
import { createBook } from "./BookService"; // Serviço ajustado

const CreateBookForm: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { showSuccess, showError } = useSwal();

  // Preparando os dados do livro
  const bookData: Book = {
    title: title || "Livro de Exemplo",
    description: description || "Descrição do livro de exemplo.",
    userId: 1,  
    gender: Gender.AVENTURA
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      setErrorMessage("A imagem do livro é obrigatória");
      return;
    }
  
    // Criando o FormData para enviar os dados
    const formData = new FormData();
    formData.append("dto", new Blob([JSON.stringify(bookData)], { type: "application/json" }));
    formData.append("file", imageFile);
  
    try {
      setIsLoading(true);
      await createBook(formData); // Now passing only formData
      showSuccess("Livro criado com sucesso!");
      setImageFile(null);
      setErrorMessage("");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
      showError("Erro ao criar livro.");
      setErrorMessage("Falha ao criar livro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Criar Livro</h2>

      {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Título do Livro
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título do livro"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Descrição do Livro
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite a descrição do livro"
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

        <div className="flex justify-between mt-4">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-md w-full hover:bg-blue-700 transition"
          >
            {isLoading ? "Enviando..." : "Criar Livro"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBookForm;