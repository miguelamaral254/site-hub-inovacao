import React, { useEffect, useState } from "react";
import PublishCard from "./PublishCard";
import { Publish } from "./publish.interface";
import { searchPublishes } from "./publish.service";
import PublishForm from "./PublishForm";
import { useAuth } from "@/context/useContext";
import PublishCardSkeleton from "./PublishCardSkeleton"; 

const PublishList: React.FC = () => {
  const [publications, setPublications] = useState<Publish[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = useAuth();
  const role = user?.role;

  useEffect(() => {
    const fetchPublications = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await searchPublishes({}, 0, 10);
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

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Lista de Publicações</h1>

      <div className="flex justify-between mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">Publicações</h3>
        {role === "ROLE_MANAGER" && (
          <button
            onClick={openForm}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Criar Publicação
          </button>
        )}
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Renderiza 6 skeletons enquanto os dados estão carregando */}
          {Array.from({ length: 6 }).map((_, index) => (
            <PublishCardSkeleton key={index} />
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!loading && Array.isArray(publications) && publications.length > 0 ? (
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
          !loading && <p className="text-center">Nenhuma publicação encontrada.</p>
        )}
      </div>

      {isFormOpen && role === "ROLE_MANAGER" && (
        <PublishForm
          onClose={closeForm}
          onPublishCreated={() => {
            closeForm(); 
          }}
        />
      )}
    </div>
  );
};

export default PublishList;