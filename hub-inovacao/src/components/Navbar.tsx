import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="text-xl font-bold text-gray-800">Logo</div>
      
      <div className="flex space-x-6">
        <Link href="/inicio" className="text-gray-700 hover:text-blue-600">Início</Link>
        <Link href="/incubadora" className="text-gray-700 hover:text-blue-600">Incubadora</Link>
        <Link href="/projetos" className="text-gray-700 hover:text-blue-600">Projetos</Link>
        <Link href="/banco" className="text-gray-700 hover:text-blue-600">Banco</Link>
        <Link href="/editais" className="text-gray-700 hover:text-blue-600">Editais</Link>
      </div>
      
      <Link href="/signin" passHref>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Entrar
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;