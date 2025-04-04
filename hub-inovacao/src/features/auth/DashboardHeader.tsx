import { User } from "./users/users/user.interface";

interface DashboardHeaderProps {
  userData: User | null;
  errorMessage: string;
}

export default function DashboardHeader({ userData, errorMessage }: DashboardHeaderProps) {
  const userName = userData?.name || "Usuário";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="text-center mb-4">
      <h2 className="text-xl font-bold">Painel do usuário</h2>
      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
      {userData ? (
        <div className="mt-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full text-lg font-bold">
            {userInitial}
          </div>
          <p className="mt-2">Seja bem-vindo, {userName}!</p>
        </div>
      ) : (
        <p className="text-gray-500 text-sm mt-2">Carregando dados...</p>
      )}
    </div>
  );
}