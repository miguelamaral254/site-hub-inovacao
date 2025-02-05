/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { getAllPublish } from "@/services/publishService";
import AllPublishCard from "./AllPublishCard";

import { PublishResponseDTO } from "@/interfaces/publishInterface";
import DateFilter from "@/components/DateFilter";
import NameFilter from "@/components/NameFilter";

interface AllPublishListProps {
  visiblePublications: number;
  filterType: string | null;
}

const AllPublishList: React.FC<AllPublishListProps> = ({
  visiblePublications,
  filterType,
}) => {
  const [publications, setPublications] = useState<PublishResponseDTO[]>([]);
  const [filteredPublications, setFilteredPublications] = useState<PublishResponseDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await getAllPublish();
        setPublications(response);
        setFilteredPublications(response);
      } catch (err) {
        setError("Erro ao carregar as publicações");
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  const handleDateFilter = (start: string | null, end: string | null) => {
    setStartDate(start);
    setEndDate(end);

    let filtered = publications;

    if (start) {
      filtered = filtered.filter((publication) => publication.initialDate >= start);
    }

    if (end) {
      filtered = filtered.filter((publication) => publication.finalDate <= end);
    }

    setFilteredPublications(filtered);
  };

  const handleNameFilter = (name: string | null) => {
    setNameFilter(name);

    if (name) {
      const filtered = publications.filter((publication) =>
        publication.title.toLowerCase().includes(name.toLowerCase())
      );
      setFilteredPublications(filtered);
    } else {
      setFilteredPublications(publications);
    }
  };

  if (loading) return <div>Carregando publicações...</div>;
  if (error) return <div>{error}</div>;

  const filteredByType = filterType && filterType !== "Todos"
    ? filteredPublications.filter((publication) => publication.title.includes(filterType))
    : filteredPublications;

  return (
    <div className="space-y-6">
     <div className="flex gap-6 justify-end items-center">
  <DateFilter onSelect={handleDateFilter} />
  <NameFilter onSelect={handleNameFilter} />
</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6 mt-6">
        {filteredByType.slice(0, visiblePublications).map((publication) => (
          <AllPublishCard
            key={publication.id}
            id={publication.id.toString()}
            title={publication.title}
            description={publication.description}
            photoLink={publication.photoLink || "/default-image.jpg"}
            acessLink={publication.acessLink}
            initialDate={publication.initialDate}
            finalDate={publication.finalDate}
            publishedDate={publication.publishedDate}
          />
        ))}
      </div>
    </div>
  );
};

export default AllPublishList;