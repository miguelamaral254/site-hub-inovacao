"use client";

import React, { useEffect, useState } from "react";
import PublishCard from "./PublishCard";
import { Publish } from "./publish.interface";
import { searchPublishs } from "./publish.service";

const PublishList: React.FC = () => {
  const [publications, setPublications] = useState<Publish[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPublications = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await searchPublishs({}, 0, 10);
        if (response.data && Array.isArray(response.data.content)) {
          setPublications(response.data.content);
        } else {
          setError("Resposta da API não contém um array válido de publicações");
        }
      } catch (err) {
        setError("Erro ao buscar publicações");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Lista de Publicações</h1>
      {loading && <p className="text-center">Carregando...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(publications) && publications.length > 0 ? (
          publications.map((publication) => (
            <PublishCard
              key={publication.id}
              id={publication.id}
              title={publication.title}
              description={publication.description}
              acessLink={publication.acessLink}
              createdDate={publication.createdDate} 
              />
          ))
        ) : (
          <p className="text-center">Nenhuma publicação encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default PublishList;