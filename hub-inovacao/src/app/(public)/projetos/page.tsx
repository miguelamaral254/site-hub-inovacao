"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dropdown } from "@/components/Dropdown";
import bannerprojetos from "@/assets/BannerProjetos.svg";
import construcao from "@/assets/ProjetoConstrução.svg";
import senac from "@/assets/ImagensProjetos/SENAC.png";
import AllProjectsList from "@/features/projects/AllProjectsList";
import { ButtonOutline } from "@/components/Button";
const projectTypes = ["Projeto de Inovação", "Projeto de Integração", "Projeto de Extensão"];

const Projetos = () => {
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [totalProjects, setTotalProjects] = useState(0);



  return (
    <div className="flex flex-col bg-[#F9F9F9] min-h-screen">
      <div className="flex w-full h-auto bg-gray-500">
        <Image 
        src={bannerprojetos} 
        alt="Banner Projetos"
        className="w-full h-auto object-cover" 
        />
      </div>

      <div className="flex flex-col bg-white md:flex-row items-center justify-between w-full px-6 md:px-24 py-10">
        <div className="flex flex-col w-full md:w-1/2 h-auto">
          <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold leading-tight">
            Projetos Acadêmicos
          </h2>
          <p className="mt-6 text-gray-800 text-lg">
            Os Projetos Acadêmicos são iniciativas desenvolvidas por alunos e professores do SENAC PE...
          </p>
        </div>
        <div className="flex justify-center mt-6 md:mt-6">
          <Image
            src={senac}
            alt="Entrada Senac"
            className="w-full max-w-[300px] md:max-w-[790px] object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="flex flex-col w-full h-auto px-6 md:px-24 py-16">
        <div className="text-center md:text-left">
          <h3 className="text-2xl md:text-4xl text-blue-500 font-semibold">
            Conheça os projetos desenvolvidos por alunos e professores
          </h3>
          <p className="mt-4 text-lg text-gray-700">
            Alunos e professores transformam conhecimento em inovação...
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-6 mb-6">
          <Dropdown options={projectTypes} onSelect={setSelectedType} defaultText="Filtrar por Tipo" />
        </div>

        <AllProjectsList
          visibleProjects={visibleProjects}
          filterType={selectedType}
          setTotalProjects={setTotalProjects} // Passa o total de projetos para controle do botão
        />

        {/* Exibe o botão "Carregar Mais" apenas se houver mais projetos a serem exibidos */}
        {totalProjects > 0 && visibleProjects < totalProjects && (
          <div className="flex justify-center mt-6">
          <ButtonOutline text={visibleProjects >= totalProjects ? "Carregar menos" : "Carregar Mais"}
            onClick={() => {
              if (visibleProjects >= totalProjects) {
                setVisibleProjects(4);
              } else {
                setVisibleProjects((prev) => prev + 4)
              }
            }}
            disabled={totalProjects <= 2} />
        </div>
        )}

        {/* Se não houver projetos, exibe a imagem de "Projetos em Construção" */}
        {totalProjects === 0 && (
          <div className="flex justify-center items-center mt-6">
            <Image src={construcao} alt="Projetos em Construção" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Projetos;