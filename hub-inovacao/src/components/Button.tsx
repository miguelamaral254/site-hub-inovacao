interface ButtonProps {
  text: string;
  onClick?: () => void; 
  type?: "button" | "submit" | "reset"
}

const ButtonGrande = ({ text, onClick, type = "button" }: ButtonProps) => {
  return(
      <div className="flex items-center justify-center">
      <button type={type} onClick={onClick} className="w-auto w-[100px] md:w-[160px] h-auto text-white font-medium text-base md:text-lg flex justify-center items-center bg-blue-300 hover:bg-blue-700 rounded-lg py-2 px-4 transition-all duration-300 active:rounded-3xl">
          {text}
      </button>
  </div>
  )
}

const ButtonGrandeSeg = ({ text, onClick }: ButtonProps) => {
  return (
    <div className="flex items-center justify-center">
      <button 
        onClick={onClick} 
        className="h-auto text-white font-medium text-base md:text-lg flex justify-center items-center bg-orange-500 hover:bg-orange-600 rounded-lg py-2 px-4 transition-all duration-300 active:rounded-3xl whitespace-nowrap"
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

const ButtonOutline = ({ text, onClick }: ButtonProps) => {
  return(
      <div className="flex items-center justify-center">
              <button onClick={onClick} className="w-auto w-[80px] md:w-[150px] text-blue-400 flex items-center justify-center text-base md:text-base font-medium border border-blue-400 hover:border-blue-500 hover:text-blue-500 rounded-lg py-2 px-4 transition-all duration-300 active:rounded-3xl">
                  {text}
              </button>
          </div>
  )
}

export { ButtonGrande, ButtonPequeno, ButtonGrandeSeg, ButtonPequenoSeg, ButtonOutline }