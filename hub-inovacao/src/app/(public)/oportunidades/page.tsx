"use client";

import React, { useState } from "react";
import Image from "next/image";
import eita from "@/assets/ImagensBOs/EITA.png"
import { Dropdown } from "@/components/Dropdown";
import { ButtonGrandeSeg } from "@/components/Button";
import { CardSimples } from "@/components/Card";
import ImagemBOS from "@/assets/ImagemBOS.svg";
import banneroportunidades from "@/assets/BannerOportunidades.svg"
import alagamento from "@/assets/Alagamento.png"
import teatro from "@/assets/Teatro.png"
import stop from "@/assets/ImagensBOs/stop.png"
import praias from "@/assets/ImagensBOs/praias.png"


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
        <Image src={banneroportunidades} alt="Banner de Oportunidades"/>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-24 py-10">
        <div className="flex flex-col w-full md:w-1/2 h-auto">
          <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold leading-tight">
            Banco de Oportunidades (B.O)
          </h2>
          <p className="mt-6 text-gray-800 text-lg">
            DO Banco de Oportunidades (BO) é uma plataforma que conecta empresas, estudantes e pesquisadores para desenvolver soluções inovadoras por meio de projetos de inovação e startups. 
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

      <div className="flex flex-col w-full h-auto px-6 md:px-24 py-16">
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

        <div className="grid grid-cols-1 md:grid-cols-4  items-stretch mt-6 ">
          <CardSimples 
          image={alagamento} 
          alt="Mentorias" 
          titulo="Alagamentos Constantes na Cidade do Recife" 
          texto="Recife enfrenta problemas frequentes de alagamento durante períodos de chuva intensa, afetando a mobilidade urbana, danificando infraestruturas e colocando em risco a segurança pública."/>
          <CardSimples 
          image={teatro} 
          alt="Ecossistemas" 
          titulo="Sistema de Gestão Integrada para Teatros" 
          texto="Os teatros carecem de um sistema de gestão integrada que inclua funcionalidades como bilheteria eletrônica, gestão e locação de espaços e eventos, assim como uma comunicação assertiva com o público."/>
          <CardSimples 
          image={stop} 
          alt="Desafios reais do mercado" 
          titulo="Sistemas Informatizados para Denunciar Casos de Violência" 
          texto="Mulheres enfrentam dificuldades de acesso a sistemas informatizados seguros e eficazes para denunciar casos de violência, o que pode desencorajar a denúncia e perpetuar a impunidade."/>
          <CardSimples 
          image={praias} 
          alt="Desafios reais do mercado" 
          titulo="Poucos atrativos na orla para cidadãos e turistas" 
          texto="A orla de Recife possui poucos atrativos além das praias, limitando as opções de lazer e entretenimento para cidadãos e turistas. Isso resulta em uma menor diversificação do turismo."/>
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
          Empresas, alunos e professores, submetam seus B.O.s no nosso Banco de Oportunidades e conectem-se a talentos prontos para desenvolver soluções tecnológicas e inovadoras. Juntos, podemos transformar ideias em impacto real.
          </p>
          <div className="flex justify-end mt-4 py-4">
            <ButtonGrandeSeg text="Envie seu projeto agora" />
          </div>
        </div>
      </div>
    </div>
  );
}