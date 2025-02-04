import { useState } from "react";
import Image from "next/image";
import { ButtonGrandeSeg } from "./Button";
import { StaticImageData } from "next/image";

interface CardProps {
    image: string | StaticImageData;
    alt: string;
    titulo?: string;
    dataPublicado?: string;
    texto?: string;
    textoLongo?:string;
    autor?: string;
    segmento?: string;
}

const CardStartup = ({ image, alt, titulo, texto, dataPublicado, autor, segmento, textoLongo }: CardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex w-full max-w-[390px] min-h-[200px] md:min-h-[390px] bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] rounded-lg flex-col px-3 py-6 ml-[32px]
            transition-shadow duration-300 hover:shadow-[0_0px_30px_rgba(78,95,181,0.44)]">
            <div className="flex justify-center items-center w-full">
                <Image className="w-[318px] h-auto md:max-h-[380px]" src={image} alt={alt} />
            </div>
            <div className="py-2 mt-3">
                <h5 className="text-2xl font-bold text-gray-950"> 
                    {titulo}
                </h5>
                <p className="text-gray-800 mt-4">
                    {texto} 
                </p>
            </div>
            <div className="mt-2">
                <a href="#" className="text-blue-600 text-xs">Link página Web</a>
            </div>
            <div className="mt-4 flex justify-end">
                <button onClick={() => setIsOpen(true)}>
                    <ButtonGrandeSeg text="Conheça Mais a Startup" />
                </button>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md shadow-lg relative">

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
                        <p className="text-gray-800 mt-2"><strong>Incubada desde:</strong> {dataPublicado}</p>
                        <p className="text-gray-800 mt-1"><strong>Autor:</strong> {autor}</p>
                        <p className="text-gray-800 mt-1"><strong>Segmento:</strong> {segmento}</p>
                        <p className="text-gray-800 mt-3">{textoLongo}</p>
                        <div className="mt-2">
                            <a href="#" className="text-blue-600 text-xs">Link página Web</a>
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    );
};

const CardSimples = ({image, alt, titulo, texto}: CardProps) => {
    return(
        <div className="flex w-full max-w-[390px] h-auto bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] rounded-lg flex-col px-3 py-6 ml-[32px]
            transition-shadow duration-300 hover:shadow-[0_0px_30px_rgba(78,95,181,0.44)] flex-grow">
            <div className="flex justify-center items-center w-full">
                <Image className="w-[318px] h-auto" src={image} alt={alt}
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

const CardServico = ({image, alt, titulo, texto}: CardProps) => {
    return(

        <div className="flex flex-col w-full max-w-[350px] min-h-[200px] md:min-h-[390px] bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] 
        rounded-lg px-3 py-4 ml-[32px] transition-shadow duration-300 hover:shadow-[0_0px_30px_rgba(78,95,181,0.44)] flex-grow">
        <div className="flex justify-center w-full">
            <Image className="md:w-[318px] h-auto" src={image} alt={alt}
            />
        </div>
        <div className="py-2 mt-3">
            <h5 className="text-2xl font-bold text-gray-950"> 
                {titulo}
            </h5>
            <p className="text-gray-800 text-base font-normal mt-3">
                {texto} 
            </p>
        </div>
    </div>  

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