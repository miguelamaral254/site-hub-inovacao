"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/useContext";
import { ButtonGrande } from "./Button";
import logo from "@/assets/Logo.svg";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname(); // Obtém a rota atual

  const userName = user?.email.split("@")[0] || "";
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
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    setDropdownOpen(false);
  }, [user]);

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between px-20 py-4 bg-white shadow-md w-full">
      <div className="flex items-center justify-start w-auto min-w-[100px] md:min-w-[136px]">
        <Image src={logo} alt="Logo HUBI" className="w-full h-auto" />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-end px-[32px] space-x-6 gap-[32px] w-full">
        {[
          { href: "/inicio", label: "Início" },
          { href: "/incubadora", label: "Incubadora i.de.i.a.S" },
          { href: "/projetos", label: "Projetos Acadêmicos" },
          { href: "/oportunidades", label: "Banco de Oportunidades" },
          { href: "/editais", label: "Editais" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-lg text-medium hover:text-blue-600 ${
              pathname === link.href ? "text-blue-600 font-bold border-b-2 border-blue-600" : "text-blue-900"
            }`}
          >
            {link.label}
          </Link>
        ))}
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
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
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
                    onClick={() => {
                      handleLogout();
                      handleCloseDropdown();
                    }}
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
          <ButtonGrande text="Entrar" />
        </Link>
      )}
    </nav>
  );
};

export default Navbar;