/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { useState } from "react";
import bannereditais from "@/assets/BannerEditais.svg";
import PublishList from "@/features/publish/PublishList";
import { ButtonOutline } from "@/components/Button";


export default function PublishPage() {
 const [visiblePublications, setvisiblePublications] = useState(2)
 const [filterType, setfilterType] = useState<string | null>(null);
 const [totalEditais, setTotalEditais] = useState(0);



  return (
    <div className="bg-[#F9F9F9]">
      <div className="flex w-full h-auto bg-gray-500">
        <Image 
        src={bannereditais} 
        alt="Banner Editais" 
        className="w-full h-auto object-cover"
        />
      </div>
      <div className="flex flex-row items-center min-h-[146px] justify-between w-full px-[166px] mt-6">
        <div className="flex flex-col w-full h-auto mt-4 px-4 md:ml-4">
          <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold">Editais</h2>
          <p className="mt-6 text-gray-800 text-left">
            Os editais de fomento à inovação são iniciativas que financiam pesquisas, startups e empresas, impulsionando o desenvolvimento de novas tecnologias, produtos e serviços. Eles servem para estimular a competitividade, sustentabilidade e transformação digital, conectando ideias inovadoras ao mercado e fortalecendo ecossistemas de inovação.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 py-6 justify-center mt-6 bg-white w-full h-auto">
        <PublishList />
      </div>
      <div className="flex flex-col w-full h-auto min-h-[200px] mt-2 px-[166px]">
        <div className="flex justify-end mr-2 md:mr-5"></div>
      </div>
    </div>
  );
}
