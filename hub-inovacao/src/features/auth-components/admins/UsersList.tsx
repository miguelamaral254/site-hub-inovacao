import React, { useEffect, useState } from "react";
import { getAllPlatformUsers } from "@/services/userService";
import UserCard from "./UserCard";
import { User } from "@/interfaces/userInterface";
import { Page } from "@/interfaces/PaginationInterface";

const getUserId = (user: User): { [key: string]: number } => {
  switch (user.role) {
    case "MANAGER":
      return { idManager: user.id };
    case "PROFESSOR":
      return { professorId: user.id };
    case "STUDENT":
      return { studentId: user.id };
    case "ADMIN":
      return { idAdmin: user.id };
    case "PARTNER_COMPANY":
      return { idCompany: user.id };
    default:
      return { id: user.id };
  }
};

const UsersList: React.FC = () => {
  const [userPage, setUserPage] = useState<Page<User> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllPlatformUsers(currentPage, pageSize);
        setUserPage(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  if (loading) return <p className="text-center">Carregando usuários...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Usuários da Plataforma</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Registro</th>
            <th className="border p-2">Função</th>
            <th className="border p-2">Instituição</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">CPF/CNPJ</th>
            <th className="border p-2">Telefones</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {userPage?.content.map((user) => (
            <UserCard key={`${user.id}-${user.role}`} user={user} userId={getUserId(user)} />
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded ${
            currentPage === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
        >
          Anterior
        </button>
        <span className="text-lg font-semibold">
          Página {currentPage + 1} de {userPage?.totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => (userPage && prev < userPage.totalPages - 1 ? prev + 1 : prev))}
          disabled={!userPage || currentPage >= userPage.totalPages - 1}
          className={`px-4 py-2 rounded ${
            !userPage || currentPage >= userPage.totalPages - 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default UsersList;