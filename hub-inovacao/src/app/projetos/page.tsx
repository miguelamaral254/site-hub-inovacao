"use cliet";
//import AllProjectsList from '@/features/projects/components/AllProjectsList';
import React from 'react';
import Footer from "@/components/Footer";
import Image from "next/image";
import Teste from "@/assets/testelogo.png"
import { Dropdown } from "@/components/Dropdown";
import { CardSimples} from "@/components/Cards";
import { ButtonOutline } from "@/components/Button";

const Projetos = () => {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <div>
      <div className="flex w-full h-[560px] bg-gray-500">
        <h1>Imagens delimitadas</h1>
      </div>
      <div className="flex flex-row items-center min-h-[529px] justify-between w-full px-[166px]" /* Container do Ideias*/>
        <div className="flex flex-col w-full max-w-[642px] h-auto mt-4 px-4 md:ml-4" >
            <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold">
              Projetos Acadêmicos
            </h2>  
            <p className="mt-6 text-gray-800 text-left">
              texto grande
            </p>  
        </div>
        <div className="flex justify-end  mr-3">
          <Image src={Teste} alt="imagemTeste" className="w-full max-w-[400px] md:w-auto md:max-w-[500px] object-cover mr-2 md:mr-5 rounded-lg"/>
        </div>
      </div>
      <div className="flex flex-col w-full h-auto min-h-[200px] mt-20 px-[166px]" /*Conheça Startups*/ >
        <div className="" /* Textos */>
          <h3 className="text-2xl md:text-4xl text-blue-500 font-semibold">
            Conheça os projetos desenvolvidos por alunos e professores         
          </h3>
          <p className="mt-4 text-left">
             Texto grande aqui   
          </p>      
        </div>
        <div className="flex justify-end mr-2 md:mr-5"/* dropdown aqui */>
            <Dropdown />
            <Dropdown />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6 place-items-center"/* Components cards */>
          {cards.map((_, index) =>(
            <CardSimples key={index}/>
          ))}
        </div>
        <div className="flex justify-center mt-4 py-4">
          <ButtonOutline text="Carregar Mais"/>
        </div>
      </div>
      <Footer />  
    </div>
    /*
    <div>
      <AllProjectsList />
    </div>*/
  );
};

export default Projetos