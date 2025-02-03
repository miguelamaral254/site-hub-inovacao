import { useState } from "react"


const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectOption] = useState<string | null>(null);
    const options = ["Selecione uma opção", "opção 1", "opção 2", "opção 3"]


    return(
        <div className="relative ml-4">
            <button onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-white stroke-gray-200 text-blue-500 rounded-lg shadow-md">
                    {selectedOption || "Selecione uma opção"}
            </button>
            {isOpen && (
                <div className="absolute text-blue-500 mt-2 w-48 bg-white stroke-gray-200 border border-gray-300 shadow-lg">
                    <ul className="py-2">
                        {options.map((option, index) => (
                            <li 
                                key={index}
                                className="group flex items-center px-4 py-2 cursor-pointer relative transition-all duration 300"
                                onClick={() => {setSelectOption(option)
                                    setIsOpen(false)
                                }}
                            >
                                <div className="absolute left-0 top-0 h-full w-1 bg-transparent rounded-r-md transition-all duration-300 group-hover:bg-orange-200"></div> 
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export { Dropdown }