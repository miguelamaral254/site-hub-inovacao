import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { useAuth } from '@/context/useContext';
import login from '@/assets/Login.svg'
import { ButtonOutline } from '@/components/Button';
import logo from '@/assets/Logo.svg'

const LoginForm: React.FC = () => {
  const { loginUser, user } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (user) {
      const destination = user.role === "ENTERPRISE" ? "/area-empresa" : "/area-usuario";
      router.push(destination);
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await loginUser({ email, password }); 
      setSuccessMessage("Login bem-sucedido!");

      if (user) {
        if (user.role === "PARTNER_COMPANY") {
          router.push("/area-empresa");
        } else if (user.role === "ADMIN") {
          router.push("/area-admin");
        } else {
          router.push("/area-usuario");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-start min-h-screen bg-gray-100 px-40">
      <div className="w-auto flex justify-start items-center "><Image  src={login} alt="imagem Login" className="w-[300px] h-auto md:w-[600px] block"/></div>
      <div className="bg-white flex-col px-6 py-6 rounded-2xl shadow-lg w-full">
        <div className="flex justify-center items-center mb-4">
          <Image src={logo} alt="Logo HUBI" className="h-auto w-auto"/>
        </div>
        <h2 className="text-2xl font-medium text-blue-600 text-center mb-4">Login</h2>
        <p className="text-base font-medium text-blue-800 text-center mb-4">
          Compartilhe seus projetos, ideias e muito mais!
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-base font-medium text-blue-500 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-medium text-blue-500 mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm mb-4">{successMessage}</div>
          )}
          <p className="text-blue-600 text-sm font-normal">
            Esqueceu a senha?
          </p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-300"
          >
            Entrar
          </button>
        </form>
        <p className="text-center text-base font-medium mt-4">
          Não possui uma conta? <a href="/cadastro" className="text-blue-600 font-medium">Cadastre-se</a>
        </p>
        <div className=" mt-6 w-full justify-center" >
          <ButtonOutline
          onClick={() => (window.location.href = "/")}
          text="Voltar para o site" />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;