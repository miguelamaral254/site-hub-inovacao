"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import bannereditais from "@/assets/BannerEditais.svg"
import { CardEditais } from "@/components/Card";

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
      <div className="flex w-full h-auto">
        <Image src={bannereditais} alt="Banner Editais"/>
      </div>
      <div className="flex flex-row items-center min-h-[146px] justify-between w-full px-[166px] mt-6">
        <div className="flex flex-col w-full  h-auto mt-4 px-4 md:ml-4">
          <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold">
            Editais
          </h2>  
          <p className="mt-6 text-gray-800 text-left">
          Os editais de fomento à inovação são iniciativas que financiam pesquisas, startups e empresas, impulsionando o desenvolvimento de novas tecnologias, produtos e serviços. Eles servem para estimular a competitividade, sustentabilidade e transformação digital, conectando ideias inovadoras ao mercado e fortalecendo ecossistemas de inovação.
          </p>  
        </div>
      </div>
      <div className="grid grid-flow-col grid-rows-2 gap-4 flex justify-center mt-6">
           <CardEditais titulo="Catalisa ICT - Ciclo 02" image={null} alt="sem imagem" dataPublicado="Publicado em: 04/02/2025" texto="O Catalisa ICT é uma iniciativa do Sebrae que transforma pesquisas acadêmicas em inovações de alto impacto."/>
           <CardEditais titulo="Compete Superior" image={null} alt="sem imagem" dataPublicado="Publicado em: 04/02/2025" texto=" A chamada convida docentes vinculados a uma Instituição de Ciência, Tecnologia e Inovação com sede no Estado de Pernambuco (ICT-PE) a submeterem propostas até 20 de janeiro de 2025."/>
           <CardEditais titulo="Compet Soluções" image={null} alt="sem imagem" dataPublicado="Publicado em: 04/02/2025" texto="Micro e pequenas empresas de Pernambuco que apresentem soluções inovadoras e ampliem a competitividade territorial do estado."/>
           <CardEditais titulo="Incubação de Startups Senac" image={null} alt="sem imagem" dataPublicado="Publicado em: 04/02/2025" texto="Uma iniciativa do Senac Pernambuco voltada para fomentar empreendimentos de base tecnológica nas áreas de atuação da instituição. "/>
      </div>
      <div className="flex flex-col w-full h-auto min-h-[200px] mt-2 px-[166px]">
        <div className="flex justify-end mr-2 md:mr-5"></div>
      </div>
    </div>
  );
}