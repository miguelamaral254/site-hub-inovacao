/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { getAllPublish } from "@/services/publishService";
import AllPublishCard from "./AllPublishCard";
import { PublishResponseDTO } from "@/interfaces/publishInterface";
import DateFilter from "@/components/DateFilter";
import NameFilter from "@/components/NameFilter";

interface AllPublishListProps {
  visiblePublications: number;
  filterType: string | null;
  setTotalEditais: (total: number) => void;
}

const AllPublishList: React.FC<AllPublishListProps> = ({
  visiblePublications,
  filterType,
  setTotalEditais,
}) => {
  const [publications, setPublications] = useState<PublishResponseDTO[]>([]);
  const [filteredPublications, setFilteredPublications] = useState<PublishResponseDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await getAllPublish(page, size);
        setPublications(response.content);
        setFilteredPublications(response.content);
      } catch (err) {
        setError("Erro ao carregar as publicações");
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, [page, size]);

  const handleNameFilter = (name: string | null) => {
    setNameFilter(name);
  };

  const handleDateFilter = (start: string | null, end: string | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  const filteredByType = filterType && filterType !== "Todos"
    ? publications.filter((publication) => publication.title.includes(filterType))
    : publications;

  const filteredByName = nameFilter
    ? filteredByType.filter((publication) =>
        publication.title.toLowerCase().includes(nameFilter.toLowerCase())
      )
    : filteredByType;

  const filteredByDate = filteredByName.filter((publication) => {
    const pubDate = new Date(publication.publishedDate);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    const isAfterStart = start ? pubDate >= start : true;
    const isBeforeEnd = end ? pubDate <= end : true;
    
    return isAfterStart && isBeforeEnd;
  });

  useEffect(() => {
    setTotalEditais(filteredByDate.length);
  }, [filteredByDate, setTotalEditais]);

  if (loading) return <div>Carregando publicações...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex gap-6 justify-end items-center">
        <NameFilter onSelect={handleNameFilter} />
        <DateFilter onSelect={handleDateFilter} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6 mt-6">
        {filteredByDate.slice(0, visiblePublications).map((publication) => (
          <AllPublishCard
            key={publication.id}
            id={publication.id}
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