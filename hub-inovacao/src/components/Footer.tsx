import Link from 'next/link';

const Footer = () => {
  return (

    <>
      <footer className="bg-blue-900 text-white p-7 mt-6">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-xl font-bold text-gray-300">Logo</div>

          <div className="flex space-x-6">
            <Link href="/" className="hover:text-gray-300">Contato</Link>
            <Link href="/Faq" className="hover:text-gray-300">FAQ</Link>
          </div>
        </div>
      </footer>

      <div className="bg-blue-700 text-center p-1">
        <p className="text-gray-300 text-sm font-semibold">
          © Faculdade Senac Pernambuco 2025
        </p>
      </div>
    </>
  );
};

export default Footer;
