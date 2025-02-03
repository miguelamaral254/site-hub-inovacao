/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { PublishResponseDTO } from "@/interfaces/publishInterface";
import { getAllPublish } from "@/services/publishService";
import PublishCardSkeleton from "./PublishCardSkeleton";
import PublishCard from "./PublishCard";


export default function PublishList() {
  const [publishes, setPublishes] = useState<PublishResponseDTO[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <div className="p-6">
      {error && <p className="text-red-500">{error}</p>}
      {publishes.length === 0 && !error && !loading && (
        <p className="text-gray-500">Nenhuma publicação encontrada.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading
          ? [...Array(3)].map((_, index) => <PublishCardSkeleton key={index} />)
          : publishes.map((publish, index) => (
              <PublishCard key={index} publish={publish} />
            ))}
      </div>
    </div>
  );
}