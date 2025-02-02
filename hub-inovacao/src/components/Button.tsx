interface ButtonProps {
    text: string;
}

const ButtonGrande = ({ text }: ButtonProps) => {
    return(
        <div className="flex items-center justify-center">
        <button className="w-auto min-w-[160px] h-auto text-white bg-blue-300 hover:bg-blue-700 rounded-lg py-2 px-4 transition-all duration-300 active:rounded-3xl">
            {text}
        </button>
    </div>
    )
}

const ButtonGrandeSeg = ({ text }: ButtonProps) => {
    return(
        <div className="flex items-center justify-center">
                <button className="w-auto min-w-[160px] h-auto text-white bg-orange-500 hover:bg-orange-600 rounded-lg py-2 px-4 transition-all duration-300 active:rounded-3xl">
                    {text}
                </button>
            </div>
    )
}

const ButtonPequeno = ({ text }: ButtonProps) => {
    return (
        <div className="flex items-center justify-center">
                <button className="w-auto min-w-[150px] h-auto text-white bg-blue-300 hover:bg-blue-700 rounded-lg py-2 px-4 transition-all duration-300 active:rounded-3xl">
                    {text}
                </button>
            </div>
    )
}

const ButtonPequenoSeg = ({ text }: ButtonProps) => {
    return (
            <div className="flex items-center justify-center">
                <button className="w-auto min-w-[150px] h-auto text-white bg-orange-500 hover:bg-orange-600 rounded-lg py-2 px-4 transition-all duration-300 active:rounded-3xl">
                    {text}
                </button>
            </div>
    )
}


export { ButtonGrande, ButtonPequeno, ButtonGrandeSeg, ButtonPequenoSeg }