"use client";

import React, { useState } from "react";
import Image from "next/image";
import Teste from "@/assets/testelogo.png";
import { Dropdown } from "@/components/Dropdown";
import AllProjectsList from "@/features/projects/components/AllProjectsList";
import { ButtonOutline } from "@/components/Button";

const projectTypes = ["Projeto de Inovação", "Projeto de Integração", "Projeto de Extensão"];

const Projetos = () => {
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleLoadMore = () => {
    setVisibleProjects((prev) => prev + 6);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex w-full h-[300px] md:h-[500px] bg-gray-500 items-center justify-center">
        <h1 className="text-white text-3xl md:text-5xl font-semibold">Projetos Acadêmicos</h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-24 py-10">
        <div className="flex flex-col w-full md:w-1/2 h-auto">
          <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold leading-tight">
            Projetos Acadêmicos
          </h2>
          <p className="mt-6 text-gray-800 text-lg">
            Conheça os projetos desenvolvidos por alunos e professores, com foco em inovação e impacto acadêmico.
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
            Conheça os projetos desenvolvidos por alunos e professores
          </h3>
          <p className="mt-4 text-lg text-gray-700">
            Explore os projetos acadêmicos mais inovadores e impactantes dentro da nossa comunidade acadêmica.
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-6">
          <Dropdown
            options={projectTypes}
            onSelect={setSelectedType}
            defaultText="Filtrar por Tipo"
          />
        </div>

        <AllProjectsList visibleProjects={visibleProjects} filterType={selectedType} />

        <div className="flex justify-center mt-10">
          <ButtonOutline text="Carregar Mais" onClick={handleLoadMore} />
        </div>
      </div>

    </div>
  );
};

export default Projetos;