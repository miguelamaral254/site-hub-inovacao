"use client";

import { useState } from "react";

interface DropdownProps {
  options: string[];
  defaultText?: string;
  onSelect: (selectedOption: string | null) => void;
}

const Dropdown = ({ options, defaultText = "Selecione uma opção", onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
    console.log("🔹 Filtro selecionado:", option);
  };

  const handleClear = () => {
    setSelectedOption(null);
    onSelect(null);
    console.log("❌ Filtros limpos");
  };

  return (
    <div className="relative flex items-center space-x-2">
      {/* Botão do Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-white border border-gray-300 text-blue-500 rounded-lg shadow-md flex items-center"
        >
          {selectedOption || defaultText}
        </button>
        {isOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg z-50">
            <ul className="py-2">
              {options.map((option, index) => (
                <li
                  key={index}
                  className="group flex items-center px-4 py-2 cursor-pointer transition-all duration-300 hover:bg-blue-100"
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Botão "❌" para limpar o filtro */}
      {selectedOption && (
        <button
          onClick={handleClear}
          className="text-red-500 text-lg hover:text-red-700 transition-all duration-300"
        >
          ❌
        </button>
      )}
    </div>
  );
};

export { Dropdown };