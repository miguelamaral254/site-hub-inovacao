import { useAuth } from "@/context/useContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonGrande } from "./Button";

type Props = {
    isMenu: boolean
}

export const UserButtonAction = ({ isMenu }: Props) => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const { user, logoutUser } = useAuth();  
    const router = useRouter();

    const handleLogout = () => {
        logoutUser(); 
        setDropdownOpen(false);
        router.push("/");
      };
    
      useEffect(() => {
        setDropdownOpen(false);
      }, [user]);

      const handleProfileRedirect = () => {
        if (user) {
          if (user.role === "ROLE_ENTERPRISE") {
            router.push("/area-empresa");
          } else {
            router.push("/area-usuario");
          }
          setDropdownOpen(false);
        }
      }

    return(
        <>
        {user ? (
            <div className={`relative ${isMenu ? 'block md:hidden' : 'hidden md:block'}`}>
                <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition  items-center justify-center "
                >
                ☰ {/* Profile Icon */}
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
                        <Link href="/configuracoes" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
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
            <Link href="/login" passHref className={`${isMenu ? 'block md:hidden' : 'hidden md:block'}`}>
                <ButtonGrande text="Entrar" />
            </Link>
            )}
            </>
    )

}