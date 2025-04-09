interface ButtonProps {
  text: string;
  onClick?: () => void; 
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const ButtonGrande = ({ text, onClick, type = "button", disabled = false }: ButtonProps) => {
  return (
    <div className="flex items-center justify-center">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`w-auto md:w-[160px] h-auto text-white font-medium text-base md:text-lg flex justify-center items-center rounded-lg py-2 px-4 transition-all duration-300 active:rounded-3xl ${
          disabled
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-300"
        }`}
      >
        {text}
      </button>
    </div>
  );
};

const ButtonGrandeSeg = ({ text, onClick }: ButtonProps) => {
  return (
    <div className="flex items-center justify-center">
      <button 
        onClick={onClick} 
        className="h-auto w-full text-white font-medium text-base md:text-lg flex justify-center items-center bg-orange-500 hover:bg-orange-600 rounded-lg py-1 px-2 lg:py-2 lg:px-4 transition-all duration-300 active:rounded-3xl whitespace-nowrap"
      >
        {text}
      </button>
    </div>
  );
};

const ButtonPequeno = ({ text, onClick }: ButtonProps) => {
  return (
      <div className="flex items-center justify-center">
              <button onClick={onClick} className="w-auto lg:w-[150px] h-auto text-white bg-blue-300 hover:bg-blue-700 rounded-lg py-2 px-4 transition-all duration-300 active:rounded-3xl">
                  {text}
              </button>
          </div>
  )
}

const ButtonPequenoSeg = ({ text, onClick }: ButtonProps) => {
  return (
          <div className="flex items-center justify-center">
              <button onClick={onClick} className="w-auto lg:w-[150px] h-auto text-white bg-orange-500 hover:bg-orange-600 rounded-lg py-2 px-4 transition-all duration-300 active:rounded-3xl">
                  {text}
              </button>
          </div>
  )
}

const ButtonOutline = ({ text, onClick, disabled }: ButtonProps) => {
  return(
      <div className="flex items-center justify-center">
              <button onClick={onClick} disabled={disabled} className={`h-auto text-blue-400 flex items-center justify-center text-base md:text-base 
                font-medium border border-blue-400 hover:border-blue-500 hover:text-blue-500 rounded-lg py-2 px-4 transition-all duration-300 
                active:rounded-3xl whitespace-nowrap ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
                  {text}
              </button>
          </div>
  )
}

export { ButtonGrande, ButtonPequeno, ButtonGrandeSeg, ButtonPequenoSeg, ButtonOutline }