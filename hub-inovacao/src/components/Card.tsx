import { useState, useEffect } from "react";
import Image from "next/image";
import { ButtonGrandeSeg } from "./Button";
import { StaticImageData } from "next/image";

interface CardProps {
  image: string | StaticImageData;
  alt: string;
  titulo?: string;
  dataPublicado?: string;
  texto?: string;
  textoLongo?: string;
  autor?: string;
  segmento?: string;
  link?: string;
  ButtonGrandSeg?: void
}

const CardStartup = ({ image, alt, titulo, texto , autor, segmento, textoLongo, link }: CardProps) => {
    const [isOpen, setIsOpen] = useState(false);
  
    useEffect(() => {
      if (isOpen) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
  
      return () => {
        document.body.classList.remove("overflow-hidden");
      };
    }, [isOpen]);
  
    return (
      <div className="flex flex-col w-full max-w-[390px] min-h-[420px] md:min-h-[450px] bg-white shadow-lg rounded-lg px-3 py-6 ml-8 transition-shadow duration-300 hover:shadow-[0_0px_30px_rgba(78,95,181,0.44)]">
        
            <div className="flex justify-center items-center w-full">
                <Image className="w-[318px] h-auto md:max-h-[380px]" src={image} alt={alt} />
            </div>
    
            <div className="flex flex-col flex-grow py-2 mt-3">
            <h5 className="text-2xl font-bold text-gray-950 line-clamp-2 h-[56px]">
                {titulo}
            </h5>
                <p className="text-gray-800 mt-4 line-clamp-3 h-[72px]">{texto} </p>
            </div>
    
            <div className="mt-auto">
                <a href={link} className="text-blue-600 text-xs" target="_blank" rel="noopener noreferrer">
                    Link da StartUp
                </a>
            </div>
    
            <div className="mt-4 flex justify-end">
                <ButtonGrandeSeg text="Conheça Mais a Startup" onClick={() => setIsOpen(true)} />
            </div>
    
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md max-h-[80vh] shadow-lg relative overflow-auto w-full mx-4">

                        <div className="mt-4 flex">
                            <button 
                                onClick={() => setIsOpen(false)} 
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl font-bold z-10"
                            >
                                &times;
                            </button>
                        </div>
            
                        <Image className="w-full max-h-[300px] object-cover mb-4 rounded-t-lg" src={image} alt={alt} />
                        <h5 className="text-2xl font-bold text-gray-950"> {titulo}</h5>
                        <p className="text-gray-800 mt-1"><strong>CEO:</strong> {autor}</p>
                        <p className="text-gray-800 mt-1"><strong>Segmento:</strong> {segmento}</p>
                        <p className="text-gray-800 mt-3">{textoLongo}</p>

                        <div className="mt-2">
                            <a href={link} className="text-blue-600 text-xs" target="_blank" rel="noopener noreferrer">
                            Link da StartUp        
                            </a>
                        </div>
                    </div>
                </div>
            )}
      </div>
    );
};  

const CardSimples = ({image, alt, titulo, texto}: CardProps) => {
    return(
        <div className="flex w-full max-w-[390px] h-auto bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] rounded-lg flex-col px-3 py-4
            transition-shadow duration-300 hover:shadow-[0_0px_30px_rgba(78,95,181,0.44)] flex-grow">
            <div className="flex justify-center items-center w-full">
                <Image className="w-[318px] h-auto md:h-[190px]" src={image} alt={alt} width={366} height={190}
                />
            </div>
            <div className="py-2 mt-3">
                <h5 className="text-2xl font-bold text-gray-950"> 
                    {titulo}
                </h5>
                <p className="text-gray-800 mt-4">
                    {texto} 
                </p>
            </div>
            <div className="mt-4 flex justify-end">
                <ButtonGrandeSeg text="Saiba Mais"/>
            </div>
        </div>
    )
}

const CardServico = ({image, alt, titulo, texto, link}: CardProps) => {
    return(
<a href={link}>
        <div className="flex flex-col w-full bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] 
        rounded-lg px-6 py-4 transition-shadow duration-300 hover:shadow-[0_0px_30px_rgba(78,95,181,0.44)] flex-grow cursor-pointer">
        
        <div className="flex justify-center w-full">
            <Image className="w-[200px] md:w-[366px] h-auto md:h-[190px]" src={image} alt={alt} width={366} height={190}
            />
        </div>
        <div className="py-2 mt-3">
            <h5 className="text-xl sm:text-2xl font-bold text-gray-950"> 
                {titulo}
            </h5>
            <p className="text-gray-800 text-base font-normal mt-3">
                {texto} 
            </p>
        </div>
    </div>  
</a>
    )
}

const CardEditais = ({titulo, texto, dataPublicado}: CardProps) => {
    return (
        <div className="flex bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] mt-3
            transition-shadow duration-300 hover:shadow-[0_0px_30px_rgba(78,95,181,0.44)] rounded-lg flex-col lg:flex-row w-full w-2xs md:max-w-[516px] h-auto py-3 px-3 ml-4 items-center" /*padding podendo alterar*/> 
            <div className="ml-3 w-full w-2xs md:w-md h-auto"> 
                <h2 className="text-2xl font-medium">
                    {titulo}
                </h2>
                <p className="text-base font-normal text-blue-800 mt-4">
                    {dataPublicado}
                </p>
                <p className="text-base font-normal text-gray-800 mt-3">
                    {texto}
                </p>
                <p className="text-base font-normal text-blue-600 mt-4">
                    Acessar o edital 
                </p>
            </div>
        </div>
    )
}

export { CardStartup, CardServico, CardEditais, CardSimples }