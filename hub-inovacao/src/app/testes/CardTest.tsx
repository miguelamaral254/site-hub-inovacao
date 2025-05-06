"use client";

const CardTest = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
      
      <form action="#" method="POST">
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">CPF</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Digite seu e-mail"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Senha */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Digite sua senha"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
          <div>
            
          </div>
        {/* Botão de Login */}
        <button
          type="submit"
          className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Entrar
        </button>
      </form>

      {/* Link de Esqueci a Senha */}
      <div className="mt-4 text-center">
        <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">Esqueceu sua senha?</a>
      </div>
    </div>
  </div>
  );
};

export default CardTest;