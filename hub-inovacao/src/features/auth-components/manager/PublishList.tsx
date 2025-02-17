"use client";

import React, { useEffect, useState } from "react";
import { PublishResponseDTO } from "@/interfaces/publishInterface";
import { getAllPublish } from "@/services/publishService";
import PublishCardSkeleton from "./PublishCardSkeleton";
import PublishCard from "./PublishCard";
import EditPublishModal from "./EditPublishModal";

export default function PublishList() {
  const [publishes, setPublishes] = useState<PublishResponseDTO[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPublish, setSelectedPublish] = useState<PublishResponseDTO | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchPublishes = async () => {
    setLoading(true);
    try {
      const fetchedPublishes = await getAllPublish(currentPage, itemsPerPage); // Passando os parâmetros de paginação
      setPublishes(fetchedPublishes.content); // Ajustando para pegar apenas o conteúdo
    } catch (error) {
      console.log(error);
      setError("Erro ao carregar publicações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]); // Recarrega quando a página for alterada

  const handleEditPublish = (publish: PublishResponseDTO) => {
    setSelectedPublish(publish);
  };

  const totalPages = Math.ceil(publishes.length / itemsPerPage);

  return (
    <div className="p-6 space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {publishes.length === 0 && !error && !loading && (
        <p className="text-gray-500">Nenhuma publicação encontrada.</p>
      )}

      <div className="space-y-4">
        {loading
          ? [...Array(3)].map((_, index) => <PublishCardSkeleton key={index} />)
          : publishes.map((publish, index) => (
              <PublishCard key={index} publish={publish} onEdit={handleEditPublish} />
            ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Anterior
          </button>

          <span className="text-gray-700">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Próximo
          </button>
        </div>
      )}

      {/* Modal de Edição */}
      {selectedPublish && (
        <EditPublishModal
          publish={selectedPublish}
          onClose={() => setSelectedPublish(null)}
        />
      )}
    </div>
  );
}