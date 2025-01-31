"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/useContext";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useRouter();

  const userName = user?.email.split('@')[0] || "";
  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="text-xl font-bold text-gray-800">Logo</div>

      <div className="flex space-x-6">
        <Link href="/inicio" className="text-gray-700 hover:text-blue-600">Início</Link>
        <Link href="/incubadora" className="text-gray-700 hover:text-blue-600">Incubadora i.de.i.a.S</Link>
        <Link href="/projetos" className="text-gray-700 hover:text-blue-600">Projetos Acadêmicos</Link>
        <Link href="/banco" className="text-gray-700 hover:text-blue-600">Banco de B.Os</Link>
        <Link href="/editais" className="text-gray-700 hover:text-blue-600">Editais</Link>
      </div>

      {user ? (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition flex items-center justify-center"
          >
            {userInitial}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
              <ul>
                <li>
                  <Link href="/perfil" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Perfil
                  </Link>
                </li>
                <li>
                  <Link href="/configuracoes" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Configurações
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sair
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link href="/signin" passHref>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Entrar
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;