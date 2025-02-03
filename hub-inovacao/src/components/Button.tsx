interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const ButtonGrande = ({ text, onClick }: ButtonProps) => {
  return(
      <div className="flex items-center justify-center">
      <button onClick={onClick} className="w-auto min-w-[160px] h-auto text-white bg-blue-300 hover:bg-blue-700 rounded-lg py-2 px-4 transition-all duration-300 active:rounded-3xl">
          {text}
      </button>
  </div>
  )
}

const ButtonGrandeSeg = ({ text, onClick }: ButtonProps) => {
  return(
      <div className="flex items-center justify-center">
              <button onClick={onClick} className="w-auto min-w-[160px] h-auto text-white bg-orange-500 hover:bg-orange-600 rounded-lg py-2 px-4 transition-all duration-300 active:rounded-3xl">
                  {text}
              </button>
          </div>
  )
}

const ButtonPequeno = ({ text, onClick }: ButtonProps) => {
  return (
      <div className="flex items-center justify-center">
              <button onClick={onClick} className="w-auto min-w-[150px] h-auto text-white bg-blue-300 hover:bg-blue-700 rounded-lg py-2 px-4 transition-all duration-300 active:rounded-3xl">
                  {text}
              </button>
          </div>
  )
}

const ButtonPequenoSeg = ({ text, onClick }: ButtonProps) => {
  return (
          <div className="flex items-center justify-center">
              <button onClick={onClick} className="w-auto min-w-[150px] h-auto text-white bg-orange-500 hover:bg-orange-600 rounded-lg py-2 px-4 transition-all duration-300 active:rounded-3xl">
                  {text}
              </button>
          </div>
  )
}

const ButtonOutline = ({ text, onClick }: ButtonProps) => {
  return(
      <div className="flex items-center justify-center">
              <button onClick={onClick} className="w-auto min-w-[150px] h-auto text-blue-400 border border-blue-400 hover:border-blue-500 hover:text-blue-500 rounded-lg py-2 px-4 transition-all duration-300 active:rounded-3xl">
                  {text}
              </button>
          </div>
  )
}

export { ButtonGrande, ButtonPequeno, ButtonGrandeSeg, ButtonPequenoSeg, ButtonOutline }