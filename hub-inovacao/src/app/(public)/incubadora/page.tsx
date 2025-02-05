"use client"

import Image from "next/image";
import ideias from "@/assets/ImagensIncubadora/LogoIdeias.png";
import mentorias from "@/assets/ImagensIncubadora/MentoriasPersonalizadas.png";
import ecosistema from "@/assets/ImagensIncubadora/Ecossistema.png"
import desafios from "@/assets/ImagensIncubadora/Desafios.png";
import { Dropdown } from "@/components/Dropdown";
import { CardStartup, CardServico } from "@/components/Card";
import { ButtonOutline } from "@/components/Button";
import ImageProjeto from "@/assets/ImagemBOS.svg"

import { ButtonGrandeSeg } from "@/components/Button";
import bannerincubadora from "@/assets/BannerIncubadora.svg"
import PassouEncontrou from "@/assets/Startups/PassouEncontrou.png"
import DecodeByte from "@/assets/Startups/DecodeByte.png"
import Elementum from "@/assets/Startups/Elementum.png"
import NOOK from "@/assets/Startups/NOOK.png"

export default function Incubadora() {
  const options = ["Opção 1", "Opção 2", "Opção 3"];

  const handleSelect = (selectedOption: string | null) => {
    console.log("Opção selecionada:", selectedOption);
  };

  return (
    <div>
      <div className="flex w-full h-[560px] bg-gray-500">
        <Image src={bannerincubadora} alt="Banner Inicial" />
      </div>
      <div className="flex flex-row items-center min-h-[529px] justify-between w-full px-[166px]" /* Container do Ideias*/>
        <div className="flex flex-col w-full max-w-[642px] h-auto mt-4 px-4" >
          <h2 className="text-3xl md:text-5xl text-blue-500 font-semibold">
            A Incubadora i.d.e.i.a.S
          </h2>  
          <p className="mt-6 text-gray-800 text-left">
            A Incubadora i.de.i.a.S. (Incubadora para o Desenvolvimento de Inovação e Aceleração do SENAC) é um ambiente dedicado à inovação e ao empreendedorismo, oferecendo suporte para alunos e egressos do SENAC PE transformarem seus Projetos Integradores em startups sustentáveis e competitivas nos setores de Comércio, Bens, Serviços e Turismo.
          </p>  
        </div>
        <div className="flex justify-end mr-3">
          <Image src={ideias} alt="imagemTeste" className="w-full max-w-[400px] md:w-auto md:max-w-[500px] object-cover mr-2 md:mr-5 rounded-lg"/>
        </div>
      </div>
      <div className="flex flex-col w-full h-auto min-h-[200px] mt-20 px-[166px]" >
        <div className="">
          <h3 className="text-2xl md:text-4xl text-blue-500 font-semibold">
            Conheça as Startups incubadas no i.d.e.i.a.S
          </h3>
          <p className="mt-4 text-left">
            Aqui, projetos inovadores ganham vida! Nossas startups incubadas estão revolucionando os setores de Comércio, Bens, Serviços e Turismo com soluções criativas e sustentáveis. 
            Venha descobrir o futuro da inovação e do empreendedorismo no SENAC PE!   
          </p>      
        </div>
        <div className="flex justify-end mr-2 md:mr-5">
          <Dropdown options={options} onSelect={handleSelect} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch mt-6">
          <CardStartup 
            image={PassouEncontrou} 
            alt="Logo Passou Encontrou" 
            titulo="Passou Encontrou"
            texto="A Passou Encontrou é uma plataforma digital que conecta vendedores ambulantes a clientes por meio de um mapa interativo em tempo real..."
            textoLongo="A Passou Encontrou é uma plataforma digital que conecta vendedores ambulantes a clientes por meio de um mapa interativo em tempo real. Com isso, facilita o acesso a produtos locais, fortalece o comércio de rua e promove a inclusão social e a sustentabilidade. A solução usa tecnologia para dar visibilidade a pequenos empreendedores, tornando a experiência de compra mais prática e acessível."
            dataPublicado="Janeiro 2025"
            autor="Danilo Santos"
            segmento="Retailtech (tecnologia para o varejo)" 
            link="https://passouencontrou.netlify.app"
          />
          <CardStartup 
            image={DecodeByte}
            alt="Logo DecodeByte"
            titulo="DecodeByte"
            texto="A Decodebyte é uma startup de tecnologia focada na inovação e otimização de serviços digitais..."
            textoLongo="A Decodebyte é uma startup de tecnologia focada na inovação e otimização de serviços digitais. Nosso principal produto, o Tarefas Perto, conecta profissionais autônomos a clientes que precisam de serviços variados, desde reformas até cuidados pessoais. Utilizamos inteligência artificial para aprimorar a experiência dos usuários, melhorando a apresentação dos serviços e garantindo transações seguras por meio de integrações financeiras eficientes."
            dataPublicado="Fevereiro 2025"
            autor="James William"
            segmento="Service Tech" 
            link="https://www.instagram.com/decodebyte/"
          />
          <CardStartup 
            image={Elementum}
            alt="Logo Elementum"
            titulo="Elementum Fitocosméticos "
            texto="A Elementum Fitocosméticos é uma marca especializada em cosméticos naturais artesanais, comprometida em unir eficácia, sustentabilidade e inovação..."
            textoLongo="A Elementum Fitocosméticos é uma marca especializada em cosméticos naturais artesanais, comprometida em unir eficácia, sustentabilidade e inovação. Incubada no I.de.i.a.S., estamos desenvolvendo projetos inovadores que integram ativos botânicos e tecnologia de ponta para criar soluções únicas em cuidados com os cabelos. Cada produto é formulado com rigor científico e produzido à mão, preservando a essência natural dos ingredientes. Nossa missão é oferecer produtos de alta performance, respeitando a natureza e promovendo bem-estar. Escolha Elementum e experimente a beleza transformadora da inovação consciente."
            dataPublicado="Março 2025"
            autor="Gabriela Viana e Thais Souza"
            segmento="Saúde/Beleza"
            link="https://www.instagram.com/souelementum/"
          />
          <CardStartup 
            image={NOOK}
            alt="Logo Nook"
            titulo="NOOK"
            texto="A NOOK nasceu no MEDIOTEC SENAC, originada de um projeto integrador com o propósito de ir além da criação de produtos..."
            textoLongo=" A NOOK nasceu no MEDIOTEC SENAC, originada de um projeto integrador com o propósito de ir além da criação de produtos. A startup tem como missão gerar conhecimento e oportunidades para jovens e pessoas em situação de vulnerabilidade, promovendo inclusão e impacto social por meio da tecnologia. Com soluções inovadoras, a NOOK busca democratizar o acesso ao aprendizado e ao empreendedorismo, capacitando indivíduos e fortalecendo comunidades para um futuro mais sustentável e acessível."
            dataPublicado="Abril 2025"
            autor="Erick Carrasco"
            segmento="Service Tech"
            link="https://www.instagram.com/nook.corp/"
          />
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
              A Incubadora i.de.i.a.S oferece mentorias especializadas, conexões com investidores e participação em grandes eventos. Com desafios reais, Ideathons e Hackathons, preparamos startups para o mercado. 
            </p>      
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-6 ">
          <CardServico 
          image={mentorias} 
          alt="Mentorias" 
          titulo="Mentorias Especializadas" 
          texto="Os incubados têm acesso a mentorias e capacitações para desenvolverem competências em inovação, criatividade e gestão de negócios."/>
          <CardServico 
          image={ecosistema} 
          alt="Ecossistemas" 
          titulo="Ecossistema de Inovação" 
          texto="As Startups incubadas têm acesso a conexões estratégicas com empresas e investidores. 
          Além de oportunidades em eventos nacionais e internacionais."/>
          <CardServico 
          image={desafios} 
          alt="Desafios reais do mercado" 
          titulo="Desafios reais do mercado" 
          texto="A incubadora i.de.i.a.S promove eventos como Ideathons, Hackthons e qualificações em empreendedorismo. "/>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center min-h-[529px] justify-between w-full px-[166px] mt-6">
          <div className="w-full md:w-[744px] h-auto flex">
              <Image src={ImageProjeto} alt="ImagemProjetos" className="w-full h-full"/>
          </div>
          <div className="flex flex-col h-full justify-end items-end w-full md:max-w-[775px]">
              <h4 className="text-2xl md:text-4xl text-blue-500 font-semibold">
                Submeta seus projetos
              </h4>
              <p className="mt-4 text-right">
                Alunos e professores, inscrevam-se no i.de.i.a.S e desenvolvam projetos inovadores com suporte, mentorias e capacitações. Essa é sua chance de criar soluções impactantes e entrar no ecossistema de startups!
              </p>
              <div className="flex justify-end mt-4 py-4">
                <ButtonGrandeSeg text="Envie seu projeto agora"/>
              </div>
          </div>
      </div>
    </div>
  );
}