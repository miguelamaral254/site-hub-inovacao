// components/DashboardHeader.tsx
import { UserResponseCnpjDTO, UserResponseCpfDTO } from "@/interfaces/userInterface";

interface DashboardHeaderProps {
  userData: UserResponseCnpjDTO | UserResponseCpfDTO | null;
  errorMessage: string;
}

export default function DashboardHeader({ userData, errorMessage }: DashboardHeaderProps) {
  return (
    <div className="text-center mb-4">
      <h2 className="text-xl font-bold">Painel do usuario</h2>
      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
      {userData ? (
        <div className="mt-4">
          <p><strong>Nome:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      ) : (
        <p className="text-gray-500 text-sm mt-2">Carregando dados...</p>
      )}
    </div>
  );
}