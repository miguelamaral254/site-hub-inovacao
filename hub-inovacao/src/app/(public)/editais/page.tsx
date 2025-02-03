"use client"

import { ButtonOutline } from "@/components/Button";
import { useState } from "react";
import { CardEditais } from "@/components/Card";

export default function Inicio() {
 
  const CardsPorPagina = 4;  
  const cards = 12
  const [CardsVisiveis, SetCardsVisiveis] = useState(CardsPorPagina)

  const AlternarBotao = () => {
    if(CardsVisiveis < cards) {
      SetCardsVisiveis((prev) => Math.min(prev + CardsPorPagina, cards))
    } else {
      SetCardsVisiveis(CardsPorPagina)
    }
  }

  return (
    <div>
      <div className="flex w-full h-[560px] bg-gray-500">
        <h1>Imagens delimitadas</h1>
      </div>
      <div className="flex flex-row items-center min-h-[146px] justify-between w-full px-[166px]" /* Container do Ideias*/>
        <div className="flex flex-col w-full max-w-[642px] h-auto mt-4 px-4 md:ml-4" >
            <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold">
              Editais
            </h2>  
            <p className="mt-6 text-gray-800 text-left">
              texto grande
            </p>  
        </div>
      </div>
      <div className="flex flex-col w-full h-auto min-h-[200px] mt-2 px-[166px]" /*Conheça Startups*/ >
        <div className="flex justify-end mr-2 md:mr-5">
            
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 place-items-center"/* Components cards */>
          {Array.from({length: CardsVisiveis}).map((_, index) =>(
            <CardEditais key={index}/>
          ))}
        </div>
        <div className="flex justify-center mt-4 py-4">
            <ButtonOutline onClick={AlternarBotao} 
            text={CardsVisiveis < cards ? "Carregar mais" : "Mostrar menos"}/>
        </div>
      </div>
    </div>
  );
}