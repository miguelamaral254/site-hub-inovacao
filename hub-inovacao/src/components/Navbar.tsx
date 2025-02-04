"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/useContext";
import logo from "@/assets/Logo -- Navbar.svg"
import Image from "next/image";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useRouter();

  const userName = user?.email.split('@')[0] || "";
  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    logoutUser();
    setDropdownOpen(false);
    router.push("/");
  };

  const handleCloseDropdown = () => {
    setDropdownOpen(false);
  };

  const handleProfileRedirect = () => {
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
      setDropdownOpen(false); // Fecha o dropdown ao redirecionar
    }
  };

  useEffect(() => {
    setDropdownOpen(false);
  }, [user]);

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <Image src={logo} alt={"Logo HUBr"} /> 

      <div className="flex space-x-6">
        <Link href="/inicio" className="text-gray-700 hover:text-blue-600">Início</Link>
        <Link href="/incubadora" className="text-gray-700 hover:text-blue-600">Incubadora i.de.i.a.S</Link>
        <Link href="/projetos" className="text-gray-700 hover:text-blue-600">Projetos Acadêmicos</Link>
        <Link href="/oportunidades" className="text-gray-700 hover:text-blue-600">Banco de B.Os</Link>
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
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
              <ul>
                <li>
                  <button
                    onClick={handleProfileRedirect}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Perfil
                  </button>
                </li>
                <li>
                  <Link href="/configuracoes" onClick={handleCloseDropdown} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Configurações
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => { handleLogout(); handleCloseDropdown(); }}
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
        <Link href="/login" passHref>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Entrar
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;