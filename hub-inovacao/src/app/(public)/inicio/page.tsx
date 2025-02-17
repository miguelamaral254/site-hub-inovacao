"use client"

import Image from "next/image";
import inicio from "@/assets/Inicio.svg"
import { CardServico, CardEditais } from "@/components/Card";
import HUBI from "@/assets/Logo.svg"
import SenacEventos from "@/assets/SENAC Eventos.png"
import alagamentos from "@/assets/Alagamento.png"
import teatro from "@/assets/Teatro.png"
import Banner from "@/assets/BannerInicio.svg"
import Carrocel from "@/components/Carrocel"

export default function Inicio() {
  return (
    <div>
      <div className="flex w-full h-auto bg-gray-500">
        <Image 
          src={Banner} 
          alt="Banner Inicial" 
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="flex flex-row items-center min-h-[529px] justify-between w-full px-[166px]" /* Container HUB */>
        <div className="flex flex-col w-full max-w-[642px] h-auto mt-4 px-4 md:ml-4" >
            <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold">
              Hub de Inovação (hubi)
            </h2>  
            <p className="mt-6 text-base font-normal text-gray-800 text-left">
              O hubi é um ambiente dinâmico e colaborativo que conecta estudantes, professores, empreendedores e empresas em uma rede de inovação e oportunidades. Aqui, ideias se transformam em soluções reais, impulsionando projetos acadêmicos, startups e iniciativas que fazem a diferença no mercado e na sociedade.

              Nosso Banco de Oportunidades aproxima empresas de talentos acadêmicos, permitindo que desafios reais do mercado sejam resolvidos com criatividade e tecnologia. Já os Projetos Acadêmicos promovem a aplicação prática do conhecimento, estimulando a pesquisa, a inovação e o impacto social.

              A Incubadora i.de.i.a.S apoia alunos e egressos do SENAC PE na jornada empreendedora, oferecendo mentorias, capacitações e conexões estratégicas para transformar ideias em startups competitivas. Além disso, no hubi você encontra os principais Editais de Fomento, facilitando o acesso a recursos e programas que impulsionam o desenvolvimento de novos negócios e pesquisas.

              Seja criando, inovando ou empreendendo, o hubi é o espaço ideal para quem busca oportunidades, aprendizado e crescimento no ecossistema da inovação!    
            </p>  
        </div>
        <div className="flex justify-end mr-3">
          <Image src={inicio} alt="imagem login" className="w-full md:max-w-[500px] object-cover mr-2 md:mr-5 rounded-lg"/>
        </div>
      </div>
      <div className="flex flex-col bg-[#f9f9f9] w-full h-auto md:min-h-[500px] mt-6 items-start text-center">
        {/* Texto */}
        <h2 className="text-3xl md:text-5xl text-blue-500 px-40 font-semibold mt-10 md:mt-16">
          Conheça nossas Startups
        </h2>  

        {/* Carrossel */}
        <div className="w-full flex justify-center ">
          <Carrocel />
        </div>
      </div>
      <div className="flex flex-col bg-white w-full h-auto md:min-h-[500px] mt-6 px-[166px]" /* Projetos Academicos */ >
        <div className="flex flex-row justify-center items-start mt-20 w-full"/* Projetos Academicos */>
          <div className="flex flex-col justify-start items-start w-full md:max-w-[658px]" /* Textos */>
            <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold">
              Projeto Acadêmicos
            </h2>  
            <p className="mt-6 text-gray-800 text-left">
            Os Projetos Acadêmicos incentivam alunos e professores a aplicar seus conhecimentos em desafios reais. 
            Divididos entre projetos de extensão, que impactam comunidades e empresas, e projetos integradores, que criam soluções inovadoras, 
            essas iniciativas fortalecem a criatividade, a pesquisa e o empreendedorismo, preparando profissionais para o mercado.
            </p>  
          </div>
          <div className="flex flex-row w-full justify-end items-end gap-4">
            <CardServico titulo="Hub de Inovação (hubi)" texto="Plataforma que promove ambiente dinâmico e colaborativo, 
            apresentando projetos acadêmicos, Startups, editais e muito mais." image={HUBI} alt="Logo HUBI" link="/inicio"/>
            <CardServico titulo="Senac Eventos (NRF 2025)" texto="Aplicativo de agenda desenvolvido para a missão NRF 2025 realizada em janeiro de 2025. "
            image={SenacEventos} alt="Logo SenacEventos"/>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-[#F9F9F9] w-full h-auto min-h-[200px] mt-20 py-3 " >
        <div className="flex flex-row justify-center items-start mt-6 w-full"/* Banco de Oportunidades */>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <CardServico titulo="Alagamentos Constantes na Cidade do Recife" texto="Recife enfrenta problemas frequentes de alagamento durante períodos de chuva intensa, 
            afetando a mobilidade urbana, danificando infraestruturas e colocando em risco a segurança pública." image={alagamentos} alt="Imagem de alagamento"/>
            <CardServico titulo="Sistema de Gestão Integrada para Teatros" texto="Os teatros carecem de um sistema de gestão integrada que inclua funcionalidades como bilheteria eletrônica, gestão e locação de espaços e eventos, 
            assim como uma comunicação assertiva com o público." image={teatro} alt="Imagem de um teatro"/>
          </div>
          <div className="flex flex-col justify-end items-end w-auto md:w-[658px]">
            <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold text-right">
              Conheça nosso Banco de Oportunidades
            </h2>  
            <p className="mt-6 text-gray-800 text-right flex-col ">
            O Banco de Oportunidades (BO) conecta empresas, estudantes e pesquisadores para desenvolver soluções inovadoras. 
            Empresas submetem desafios reais, e equipes acadêmicas e empreendedoras criam tecnologias, produtos e serviços, aproximando a academia do setor produtivo.
            </p>  
          </div>
        </div>
      </div>
      <div className="flex flex-row bg-white items-center min-h-[529px] justify-between w-full px-[166px]" /* Editais */>
        <div className="flex flex-col w-full max-w-[642px] h-auto px-4 ml-4 " /* Textos */>
            <h3 className="text-2xl md:text-4xl text-blue-500 font-semibold">
              Editais
            </h3>
            <p className="mt-4 text-left">
            Os Editais são oportunidades essenciais para impulsionar projetos inovadores, startups e pesquisas. Eles oferecem recursos financeiros para o desenvolvimento de novas tecnologias, produtos e serviços, 
            estimulando a competitividade e a transformação digital. Além disso, conectam empreendedores, pesquisadores e empresas ao mercado, 
            fortalecendo o ecossistema de inovação. Com acesso a esses editais, ideias promissoras ganham estrutura e suporte para crescer, gerando impacto e novas oportunidades no setor produtivo.  
            </p>      
        </div>
        <div className="px-3 flex justify-center items-center">
           <CardEditais titulo="Catalisa ICT - Ciclo 02" image={"https://picsum.photos/200/300"} alt="sem imagem" dataPublicado="Publicado em: 04/02/2025" texto="O Catalisa ICT é uma iniciativa do Sebrae que transforma pesquisas acadêmicas em inovações de alto impacto."/>
        </div>
      </div>
    </div>
  );
}