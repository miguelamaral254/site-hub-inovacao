"use client"

import Image from "next/image";
import Teste from "@/assets/testelogo.png"
import { ButtonOutline } from "@/components/Button";
import ImageProjeto from "@/assets/ImageProjeto.svg"
import { ButtonGrandeSeg } from "@/components/Button";
import { CardEditais, CardServico, CardStartup } from "@/components/Card";

export default function Incubadora() {
  return (
    <div>
      <div className="flex w-full h-[560px] bg-gray-500">
        <h1>Imagens delimitadas</h1>
      </div>
      <div className="flex flex-row items-center min-h-[529px] justify-between w-full px-[166px]" /* Container do Ideias*/>
        <div className="flex flex-col w-full max-w-[642px] h-auto mt-4 px-4 md:ml-4" >
            <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold">
              A Incubadora i.d.e.i.a.S
            </h2>  
            <p className="mt-6 text-gray-800 text-left">
              texto grande
            </p>  
        </div>
        <div className="flex justify-end mr-3">
          <Image src={Teste} alt="imagemTeste" className="w-full max-w-[400px] md:w-auto md:max-w-[500px] object-cover mr-2 md:mr-5 rounded-lg"/>
        </div>
      </div>
      <div className="flex flex-col w-full h-auto min-h-[200px] mt-20 px-[166px]" /*Conheça Startups*/ >
        <div className="" /* Textos */>
          <h3 className="text-2xl md:text-4xl text-blue-500 font-semibold">
            Conheça as Startups incubadas no i.d.e.i.a.S
          </h3>
          <p className="mt-4 text-left">
             Texto grande aqui   
          </p>      
        </div>
        <div className="flex justify-end mr-2 md:mr-5"/* dropdown aqui */>
            
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-6"/* Components cards */>
          <CardStartup />
          <CardStartup />
          <CardStartup />
          <CardStartup />
        </div>
        <div className="flex justify-center mt-4 py-4">
          <ButtonOutline text="Carregar Mais"/>
        </div>
      </div>
      <div className="flex flex-col h-auto min-h-[200px] mt-20 px-[166px]" /* Serviços incubadora */>
        <div className="flex flex-col max-w-4xl h-auto mt-4" /* Textos */>
            <h3 className="text-2xl md:text-3xl text-blue-500 font-semibold">
              Serviços que a incubadora i.de.i.a.S oferece as Startups
            </h3>
            <p className="mt-4 text-left">
              Texto grande aqui   
            </p>      
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-6 ">
          <CardServico />
          <CardServico />
          <CardServico />
          <CardServico />
        </div>
      </div>
      <div className="flex flex-row items-center min-h-[529px] justify-between w-full px-[166px]" /* Editais */>
        <div className="flex flex-col w-full max-w-[642px] h-auto px-4 ml-4 " /* Textos */>
            <h3 className="text-2xl md:text-4xl text-blue-500 font-semibold">
              Editais da Incubadora
            </h3>
            <p className="mt-4 text-left">
              Texto grande aqui   
            </p>      
        </div>
        <div className="px-3 flex justify-center items-center mt-[140px]">
           <CardEditais />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center min-h-[529px] justify-between w-full px-[166px]">
          <div className="w-full md:w-[744px] h-auto flex">
              <Image src={ImageProjeto} alt="ImagemProjetos" className="w-full h-full"/>
          </div>
          <div className="flex flex-col h-full justify-end items-end w-full md:max-w-[775px]">
              <h4 className="text-2xl md:text-4xl text-blue-500 font-semibold">
                Submeta seus projetos
              </h4>
              <p className="mt-4 text-right">
                Texto grande aqui
              </p>
              <div className="flex justify-end mt-4 py-4">
                <ButtonGrandeSeg text="Envie seu projeto agora"/>
              </div>
          </div>
      </div>
    </div>
  );
}