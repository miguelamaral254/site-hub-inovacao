/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import eita from "@/assets/ImagensBOs/EITA.png";
import { Dropdown } from "@/components/Dropdown";
import { ButtonGrandeSeg } from "@/components/Button";
import ImagemBOS from "@/assets/ImagemBOS.svg";
import banneroportunidades from "@/assets/BannerOportunidades.svg";
import { ButtonOutline } from "@/components/Button";
import OpportunityList from "@/features/opportunity/OpportunityList";

const opportunityTypes = ["Oportunidades", "Problemas", "Ideias"];

export default function Oportunidades() {
  const [visibleOpportunities, setVisibleOpportunities] = useState(6);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [totalOpportunities, setTotalOpportunities] = useState(0);

  const filters = {
   status:"aprovada"  
  };

  return (
    <div className="flex flex-col bg-[#f9f9f9] min-h-screen">
      <div className="flex w-full h-auto bg-gray-500">
        <Image 
        src={banneroportunidades} 
        alt="Banner de Oportunidades" 
        className="w-full h-auto object-cover"
        />
      </div>

      <div className="w-full bg-white">
        <div className="flex flex-col  md:flex-row items-center justify-between section">
          <div className="flex flex-col w-full md:w-1/2 h-auto">
            <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold leading-tight">
              Banco de Oportunidades (B.O)
            </h2>
            <p className="mt-6 text-gray-800 text-lg">
              O Banco de Oportunidades (BO) é uma plataforma que conecta empresas, estudantes e pesquisadores para desenvolver soluções inovadoras por meio de projetos de inovação e startups.
              Empresas parceiras submetem desafios reais do mercado, e equipes acadêmicas e empreendedoras trabalham no desenvolvimento de tecnologias, produtos e serviços para resolvê-los.
              <br />
              <br />
              Ao participar, as empresas têm acesso a novas ideias, tecnologias e talentos, enquanto alunos e professores aplicam conhecimentos acadêmicos em problemas reais, gerando impacto e aprendizado prático.
              O BO é uma ponte entre demanda e inovação, acelerando o desenvolvimento de soluções tecnológicas e competitivas para diversos setores.
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <Image
              src={eita}
              alt="E.I.T.A"
              className="w-full max-w-[300px] md:max-w-[790px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col section">
        <div className="text-center md:text-left">
          <h3 className="text-2xl md:text-4xl text-blue-500 font-semibold">
            Descubra ideias no nosso Banco de Oportunidades
          </h3>
          <p className="mt-4 text-lg text-gray-700">
            Conectamos empresas, estudantes e pesquisadores para transformar desafios reais em inovação. Aqui, você pode desenvolver soluções, criar tecnologias e gerar impacto. Seja parte dessa rede que impulsiona talentos e acelera o futuro. Venha inovar com a gente!
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-6">
          <Dropdown options={opportunityTypes} onSelect={setSelectedType} defaultText="Filtrar por Tipo" />
        </div>

        <div>
        <OpportunityList filters={filters} />

        </div>

        {/* Exibir botão "Carregar Mais" apenas se houver mais oportunidades */}
        {totalOpportunities > 0 && (
          <div className="flex justify-center mt-6">
          <ButtonOutline text={visibleOpportunities >= totalOpportunities ? "Carregar menos" : "Carregar Mais"}
            onClick={() => {
              if (visibleOpportunities >= totalOpportunities) {
                setVisibleOpportunities(6);
              } else {
                setVisibleOpportunities((prev) => prev + 6)
              }
            }}
            disabled={totalOpportunities <= 6} />
        </div>
        )}
      </div>

      <div className="w-full bg-white">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between section">
          <div className="w-full h-auto flex">
            <Image src={ImagemBOS} alt="ImagemProjetos" className="w-full h-full" />
          </div>
          <div className="flex flex-col h-full items-center  w-full ">
            <h4 className="text-lg md:text-2xl text-blue-500 font-semibold text-center">
              Submeta um B.O que precisa de uma solução!
            </h4>
            <p className="mt-4 text-center">
              Empresas, alunos e professores, submetam seus B.O.s no nosso Banco de Oportunidades e conectem-se a talentos prontos para desenvolver soluções tecnológicas e inovadoras. Juntos, podemos transformar ideias em impacto real.
            </p>
            <div className="flex justify-end mt-4 py-4">
              <ButtonGrandeSeg text="Envie seu projeto agora" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}