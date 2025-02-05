import Link from 'next/link';
import Image from "next/image";
import logo from "@/assets/Logo -- FOOTER.png";

const Footer = () => {
  return (
    <>
      <footer className="bg-blue-900 text-white px-6 py-10 mt-6 w-full">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center text-sm space-y-6 md:space-y-0 md:space-x-6">
          <div className="flex flex-col items-center">
            <Image src={logo} alt="Logo HUBr" />
            <p className="text-orange-200 mt-2 font-semibold">Hub de Inovação</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-orange-200">Incubadora i.de.i.a.s</h3>
            <ul className="space-y-1">
              <li><Link href="/ideias" className="hover:text-gray-300">Saiba mais sobre a i.de.i.a.s</Link></li>
              <li><Link href="/startups" className="hover:text-gray-300">Conheça as Startups</Link></li>
              <li><Link href="/submissao" className="hover:text-gray-300">Submita uma ideia</Link></li>
            </ul>
          </div>
          
          {/* Sessão 3: Faculdade */}
          <div>
            <h3 className="font-semibold mb-2 text-orange-200">Faculdade Senac Pernambuco</h3>
            <ul className="space-y-1">
              <p className="text-orange-100">Cuscos Tech</p>
              <li><Link href="/cursos/ads" className="hover:text-gray-300">Análise e Desenvolvimento de Sistemas</Link></li>
              <li><Link href="/cursos/jogos-digitais" className="hover:text-gray-300">Jogos Digitais</Link></li>
            </ul>
          </div>
          
          {/* Sessão 4: Ajuda */}
          <div>
            <h3 className="font-semibold mb-2 text-orange-200">Ajuda</h3>
            <ul className="space-y-1">
              <li><Link href="/faq" className="hover:text-gray-300">Perguntas Frequentes</Link></li>
              <li><Link href="/privacidade" className="hover:text-gray-300">Política de Privacidade</Link></li>
              <li><Link href="/cookies" className="hover:text-gray-300">Política de Cookies</Link></li>
            </ul>
          </div>
          
          {/* Sessão 5: Contato */}
          <div>
            <h3 className="font-semibold mb-2 text-orange-200">Contato</h3>
            <p className="text-orange-100">inovacaohub@pe.senac.br</p>
            <p className="text-orange-100">(81) 3300-1122</p>
          </div>
        </div>
      </footer>
      
      <div className="bg-blue-700 text-center p-2">
        <p className="text-gray-300 text-sm font-semibold">
          © Faculdade Senac Pernambuco 2025
        </p>
      </div>
    </>
  );
};

export default Footer;
