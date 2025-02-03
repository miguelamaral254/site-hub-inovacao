"use client";

import React, { useState } from "react";
import Image from "next/image";
import Teste from "@/assets/testelogo.png";
import { Dropdown } from "@/components/Dropdown";
import { ButtonOutline, ButtonGrandeSeg } from "@/components/Button";
import ImagemBOS from "@/assets/ImagemBOS.svg";
import AllOpportunitiesList from "@/features/bos/components/AllOpportunitiesList";

const opportunityTypes = ["Oportunidades", "Problemas", "Ideias"];

export default function Oportunidades() {
  const [visibleOpportunities, setVisibleOpportunities] = useState(4);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleLoadMore = () => {
    setVisibleOpportunities((prev) => prev + 6);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex w-full h-[300px] md:h-[500px] bg-gray-500 items-center justify-center">
        <h1 className="text-white text-3xl md:text-5xl font-semibold">Banco de Oportunidades</h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-24 py-10">
        <div className="flex flex-col w-full md:w-1/2 h-auto">
          <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold leading-tight">
            Banco de Oportunidades
          </h2>
          <p className="mt-6 text-gray-800 text-lg">
            Descubra ideias inovadoras e oportunidades de impacto no nosso Banco de Oportunidades.
          </p>
        </div>
        <div className="flex justify-center mt-6 md:mt-0">
          <Image
            src={Teste}
            alt="Imagem Teste"
            className="w-full max-w-[300px] md:max-w-[450px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="flex flex-col w-full h-auto px-6 md:px-24 py-16">
        <div className="text-center md:text-left">
          <h3 className="text-2xl md:text-4xl text-blue-500 font-semibold">
            Descubra ideias no nosso Banco de Oportunidades
          </h3>
          <p className="mt-4 text-lg text-gray-700">
            Explore e participe de oportunidades criadas para conectar ideias inovadoras a soluções reais.
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-6">
          <Dropdown options={opportunityTypes} onSelect={setSelectedType} defaultText="Filtrar por Tipo" />
        </div>

        <AllOpportunitiesList visibleOpportunities={visibleOpportunities} filterType={selectedType} />

        <div className="flex justify-center mt-10">
          <ButtonOutline text="Carregar Mais" onClick={handleLoadMore} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center min-h-[529px] justify-between w-full px-[166px]">
        <div className="w-full md:w-[744px] h-auto flex">
          <Image src={ImagemBOS} alt="ImagemProjetos" className="w-full h-full" />
        </div>
        <div className="flex flex-col h-full justify-end items-end w-full md:max-w-[775px]">
          <h4 className="text-lg md:text-2xl text-blue-500 font-semibold">
            Submeta um B.O que precisa de uma solução!
          </h4>
          <p className="mt-4 text-right">
            Envie sua oportunidade agora e conecte-se a potenciais soluções para seu desafio.
          </p>
          <div className="flex justify-end mt-4 py-4">
            <ButtonGrandeSeg text="Envie seu projeto agora" />
          </div>
        </div>
      </div>

    </div>
  );
}