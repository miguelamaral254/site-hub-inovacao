"use client";

import { ButtonOutline } from "@/components/Button";
import { useState, useEffect } from "react";
import AllPublishList from "@/features/publish/AllPublishList";

export default function PublishPage() {
  const [CardsVisiveis, SetCardsVisiveis] = useState<number>(4);
  const [cards, setCards] = useState<number>(120);

  const handleLoadMore = () => {
    SetCardsVisiveis((prev) => Math.min(prev + 4, cards));
  };

  useEffect(() => {
    const fetchData = async () => {
      setCards(120);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex w-full h-[560px] bg-gray-500">
        <h1>Imagens delimitadas</h1>
      </div>
      <div className="flex flex-row items-center min-h-[146px] justify-between w-full px-[166px]">
        <div className="flex flex-col w-full max-w-[642px] h-auto mt-4 px-4 md:ml-4">
          <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold">
            Editais
          </h2>  
          <p className="mt-6 text-gray-800 text-left">
            texto grande
          </p>  
        </div>
      </div>
      <div className="flex flex-col w-full h-auto min-h-[200px] mt-2 px-[166px]">
        <div className="flex justify-end mr-2 md:mr-5"></div>
        <AllPublishList visiblePublications={CardsVisiveis} filterType={null} />
        <div className="flex justify-center mt-4 py-4">
          <ButtonOutline 
            onClick={handleLoadMore} 
            text={CardsVisiveis < cards ? "Carregar mais" : "Não há mais publicações"} 
          />
        </div>
      </div>
    </div>
  );
}