"use client"; 
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import logo from "@/assets/Logo.svg";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { UserButtonAction } from "./UserButtonAction";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname(); 

  const handleRedirect = () => {
    router.push("/");
    window.scrollTo(0, 0);
  }

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className={`flex ${openMenu ? 'flex-col' : 'flex-row'} md:flex-row items-center py-4 gap-5 justify-between section`}>
        <div className="flex items-center justify-start w-auto min-w-[100px] md:min-w-[136px] cursor-pointer" onClick={handleRedirect}>
          <Image src={logo} alt="Logo HUBI" className={`w-[60%] ${openMenu ? 'w-full' : 'w-[60%]'} h-auto`} />
        </div>
        <div className={`${openMenu ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center justify-end gap-12 w-full`}>
          {[
            { href: "/inicio", label: "Início" },
            { href: "/incubadora", label: "ICT Senac" },
            { href: "/projetos", label: "Projetos Acadêmicos" },
            { href: "/oportunidades", label: "Banco de Oportunidades" },
            { href: "/editais", label: "Editais" },
            
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpenMenu(false)}
              className={`text-lg text-medium hover:text-blue-600 ${
                pathname === link.href ? "text-blue-600 font-bold border-b-2 border-blue-600" : "text-blue-900"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <UserButtonAction isMenu/>
          
        </div>
        <div className="flex items-center gap-6">
          <div
            className={`block ${openMenu ? 'hidden' : 'block'} md:hidden`}
            onClick={() => setOpenMenu(true)}
          >
            <IoMdMenu className="text-xl cursor-pointer" />
          </div>
          {openMenu && (
            <IoMdClose
              className="text-2xl absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpenMenu(false)}
            />
          )}
          <UserButtonAction isMenu={false}/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;