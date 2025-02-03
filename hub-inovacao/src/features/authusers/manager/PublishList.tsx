"use client";

import React, { useEffect, useState } from "react";
import { PublishResponseDTO } from "@/interfaces/publishInterface";
import { getAllPublish } from "@/services/publishService";
import PublishCardSkeleton from "./PublishCardSkeleton";
import PublishCard from "./PublishCard";
import EditPublishModal from "./EditPublishModal"; // Modal de Edição

export default function PublishList() {
  const [publishes, setPublishes] = useState<PublishResponseDTO[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPublish, setSelectedPublish] = useState<PublishResponseDTO | null>(null); // Publicação selecionada para edição

  const fetchPublishes = async () => {
    setLoading(true);
    try {
      const fetchedPublishes = await getAllPublish();
      setPublishes(fetchedPublishes);
    } catch (error) {
      console.log(error);
      setError("Erro ao carregar publicações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishes();
  }, []);

  const handleEditPublish = (publish: PublishResponseDTO) => {
    setSelectedPublish(publish); // Seleciona a publicação para edição
  };

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

      {/* Modal de Edição, fora do card */}
      {selectedPublish && (
        <EditPublishModal
          publish={selectedPublish}
          onClose={() => setSelectedPublish(null)} 
        />
      )}
    </div>
  );
}