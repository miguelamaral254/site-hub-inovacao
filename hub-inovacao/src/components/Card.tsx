import Image from "next/image"
import teste from "@/assets/testelogo.png"


const Card = () => {
    return(
        <div className="flex w-full max-w-[390px] h-auto bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] rounded-lg flex-col px-3 py-6 ml-[32px]
            transition-shadow duration-300 hover:shadow-[0_0px_30px_rgba(78,95,181,0.44)]">
            <div className="flex justify-center items-center w-full">
                <Image className="w-[318px] h-auto"
                src={teste}
                alt="logo do senac"
                />
            </div>
            <div className="py-2 mt-3">
                <h5 className="text-2xl font-bold text-gray-950"> 
                    Nome da Startup
                </h5>
                <p className="text-gray-800 mt-4">
                Lorem ipsum dolor sit amet consectetur. 
                Lobortis venenatis mi in vulputate hendrerit magnis ut et. 
                Amet enim curabitur id id aliquet. 
                </p>
            </div>
            <div className="mt-2">
                <a href="" className="text-blue-600 text-xs">Link página Web</a>
            </div>
            <div className="mt-4 flex justify-end">
                <button className="w-3xs h-[50] bg-orange-500 text-white rounded-lg px-3">
                    Conheça mais a Startup.
                </button>
            </div>
        </div>
    )
}

const CardServico = () => {
    return(

        <div className="flex flex-col w-full max-w-[350px] h-auto bg-white shadow-[0_0px_30px_rgba(162,166,188,0.25)] rounded-lg px-3 py-4 ml-[32px] transition-shadow duration-300 hover:shadow-[0_0px_30px_rgba(78,95,181,0.44)]">
        <div className="flex justify-center w-full">
            <Image className="md:w-[318px] h-auto"
            src={teste}
            alt="logo do senac"
            />
        </div>
        <div className="py-2 mt-3">
            <h5 className="text-2xl font-bold text-gray-950"> 
                Nome da Startup
            </h5>
            <p className="text-gray-800 mt-4">
            Lorem ipsum dolor sit amet consectetur. 
            Lobortis venenatis mi in vulputate hendrerit magnis ut et. 
            Amet enim curabitur id id aliquet. 
            </p>
        </div>
    </div>  

    )
}

const CardEditais = () => {
    return (
        <div className="flex bg-white rounded-lg flex-col lg:flex-row w-full max-w-[716px] h-auto py-3 px-3 ml-4 items-center" > 
            <div className="w-full lg:w-[366px] h-auto">
                <Image src={teste}
                alt="Imagem edital"/>
            </div>
            <div className="ml-3 "> 
                <h2 className="text-2xl font-medium">
                    Título
                </h2>
                <p className="text-base font-normal text-blue-800 mt-4">
                    Publicado em: 31/02/2025
                </p>
                <p className="text-base font-normal text-gray-800 mt-3">
                    Lorem ipsum dolor sit amet consectetur. 
                    Lobortis venenatis mi in vulputate hendrerit magnis ut et. 
                    Amet enim curabitur id id aliquet. 
                </p>
                <p className="text-base font-normal text-blue-600 mt-4">
                    Acessar o edital 
                </p>
            </div>
        </div>
    )
}

export { Card, CardServico, CardEditais }