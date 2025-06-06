"use client";
import React, { useEffect, useState } from "react";
import PublishCard from "./PublishCard";
import { Publish } from "./publish.interface";
import { searchPublishes } from "./publish.service";
import PublishForm from "./PublishForm";
import { useAuth } from "@/context/useContext";
import PublishCardSkeleton from "./PublishCardSkeleton";
import PublishModal from "./PublishModal"; 

const PublishList: React.FC = () => {
  const [publications, setPublications] = useState<Publish[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] =
    useState<Publish | null>(null);
  const { user } = useAuth();
  const role = user?.role;

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPublications = async () => {
      setLoading(true);
      setError("");

      try {
        const pageable = { page: 0, size: 10 }; 
        const response = await searchPublishes({}, pageable);
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

  const openModal = (publication: Publish) => {
    setSelectedPublication(publication);
  };

  const closeModal = () => {
    setSelectedPublication(null); 
  };

  const filteredProjects = publications.filter((publications) => {
    const matchesTitle = publications.title?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTitle;
  });

  return (
    <div className="p-6">
      <h1 className="text-xl sm:text-3xl font-bold text-center mb-8">Lista de Publicações</h1>

      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 text-center">Publicações</h3>
        {role === "ROLE_MANAGER" && (
          <button
            onClick={openForm}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Criar Publicação
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="Buscar por título..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border rounded-md "
      />

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <PublishCardSkeleton key={index} />
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="list-cards mt-8"
        style={{ display: filteredProjects.length > 0 ? 'grid' : 'flex' }}
      >
        {!loading && Array.isArray(publications) && filteredProjects.length > 0 ? (
          filteredProjects.map((publication) => (
            <PublishCard
              key={publication.id}
              id={publication.id}
              title={publication.title}
              description={publication.description}
              acessLink={publication.acessLink}
              createdDate={publication.createdDate}
              onClick={() => openModal(publication)}
            />
          ))
        ) : (
          !loading && <p className="not-found-title">Nenhuma publicação encontrada.</p>
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

      {selectedPublication && role === "ROLE_MANAGER" && (
        <PublishModal
          publish={selectedPublication}
          onClose={closeModal}
          onPublishUpdated={() => {
            setPublications(publications.map((p) =>
              p.id === selectedPublication.id ? selectedPublication : p
            ));
            closeModal();
          }}
        />
      )}
    </div>
  );
};

export default PublishList;