/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { UserResponseCnpjDTO, CreateUserResponseDTO } from "@/interfaces/userInterface";
import CreatePublishForm from "../manager/CreatePublishForm";
import PublishList from "../manager/PublishList";
import TicketList from "../manager/TicketList";
import UsersList from "./UsersList";
import CreateManagerForm from "./CreateManagerForm";

interface AdminPageContentProps {
  selectedPage: string | null;
  userData: UserResponseCnpjDTO;
}

export default function AdminPageContent({ selectedPage, userData }: AdminPageContentProps) {
  const [isManagerFormOpen, setIsManagerFormOpen] = useState(false);
  const [isPublishFormOpen, setIsPublishFormOpen] = useState(false);


  // ✅ Função para tratar o sucesso da criação do gerente
  const handleManagerCreated = (newManager: CreateUserResponseDTO) => {
    console.log("Novo gerente criado:", newManager);
    setIsManagerFormOpen(false);
    // Aqui você pode adicionar lógica para atualizar a lista de usuários, se necessário
  };

  return (
    <div className="flex justify-center items-start">
      <div className="w-full max-w-7xl px-6 py-8">
        {selectedPage === "page1" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Projetos da Empresa</h3>
            <p className="text-lg text-gray-600 mb-4">Aqui você pode ver tickets respondidos por você.</p>
          </div>
        )}

        {selectedPage === "page2" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Tickets em aberto</h3>
            <p className="text-lg text-gray-600 mb-4">Veja os tickets em espera e tome as devidas providências.</p>
            <div className="space-y-4">
              <TicketList statusFilter={"PENDENTE"} />
            </div>
          </div>
        )}

        {selectedPage === "page3" && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Submeter Novo Edital</h3>
            <p className="text-lg text-gray-600 mb-6">Preencha os campos abaixo para submeter um novo edital.</p>
          
          </div>
        )}

{selectedPage === "page4" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Editais em aberto</h3>
              <button
                onClick={() => setIsPublishFormOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
              >
                Adicionar Publicação
              </button>
            </div>
            <div className="space-y-4">
              <PublishList />
            </div>
          </div>
        )}

        {selectedPage === "page5" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Usuários</h3>
              <button
                onClick={() => setIsManagerFormOpen(true)}
                className="bg-blue-600 text-white px-4 mt-10 py-2 rounded-lg shadow hover:bg-blue-700"
              >
                Adicionar Gerente
              </button>
            </div>
            <div className="space-y-4">
              <UsersList />
            </div>
          </div>
        )}
      </div>

      {/* ✅ Agora passando `onSuccess` corretamente */}
      {isManagerFormOpen && (
        <CreateManagerForm 
          onClose={() => setIsManagerFormOpen(false)}
          onSuccess={handleManagerCreated} 
        />
      )}
            {isPublishFormOpen && <CreatePublishForm onClose={() => setIsPublishFormOpen(false)} />}

    </div>
  );
}