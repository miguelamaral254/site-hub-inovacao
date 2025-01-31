import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6 fixed bottom-0 left-0 w-full">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-xl font-bold text-gray-300">Logo</div>

        <div className="flex space-x-6">
          <Link href="/" className="hover:text-gray-300">Contato</Link>
          <Link href="/" className="hover:text-gray-300">FAQ</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
