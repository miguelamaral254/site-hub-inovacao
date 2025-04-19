/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { useState } from "react";
import bannereditais from "@/assets/BannerEditais.svg";
import PublishList from "@/features/publish/PublishList";



export default function PublishPage() {

  return (
    <div className="bg-[#F9F9F9] w-full">
        <div className="flex w-full h-auto bg-gray-500">
          <Image
          src={bannereditais}
          alt="Banner Editais"
          className="w-full h-auto object-cover"
          />
        </div>

        <div className="bg-white w-full">
          <div className="flex flex-row items-center justify-between section">
            <div className="flex flex-col w-full h-auto mt-4 px-4 md:ml-4">
              <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold">Editais</h2>
              <p className="mt-6 text-gray-800 text-left">
                Os editais de fomento à inovação são iniciativas que financiam pesquisas, startups e empresas, impulsionando o desenvolvimento de novas tecnologias, produtos e serviços. Eles servem para estimular a competitividade, sustentabilidade e transformação digital, conectando ideias inovadoras ao mercado e fortalecendo ecossistemas de inovação.
              </p>
            </div>
          </div>

          <div className="bg-[#F9F9F9] w-full">
            <div className="flex flex-col items-center gap-4  justify-center mt-6 section">
              <PublishList />
            </div>
          </div>

          <div className="flex flex-col w-full h-auto  mt-2 ">
            <div className="flex justify-end mr-2 md:mr-5"></div>
          </div>
        </div>
      
    </div>
  );
}
