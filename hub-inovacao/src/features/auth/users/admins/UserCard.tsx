/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "@/interfaces/userInterface";
import { useState, useRef, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";

interface UserCardProps {
  user: User;
  userId: { [key: string]: number };
}

const roleMap: { [key: string]: string } = {
  ADMIN: "Administrador",
  MANAGER: "Gerente",
  STUDENT: "Aluno",
  PROFESSOR: "Professor",
  PARTNER_COMPANY: "Empresa Parceira"
};

const UserCard: React.FC<UserCardProps> = ({ user, userId }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <tr className="border">
      <td className="border p-2">{user.name}</td>
      <td className="border p-2">{user.email}</td>
      <td className="border p-2">{user.registration || "Não informado"}</td>
      <td className="border p-2">{roleMap[user.role] || user.role}</td>
      <td className="border p-2">{user.institutionOrganization || "Não informada"}</td>
      <td className="border p-2">{user.userStatus ? "Ativo" : "Inativo"}</td>
      <td className="border p-2">{user.cpf || user.cnpj || "Não informado"}</td>
      <td className="border p-2">{user.phones.map((p) => p.number).join(", ") || "Não informado"}</td>
      <td className="border p-2 relative">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <FaEllipsisV />
        </button>
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute right-0 z-50 mt-2 w-40 bg-white border shadow-lg rounded"
          >
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
              Editar
            </button>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
              Excluir
            </button>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
              Detalhes
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default UserCard;