"use client";

import React, { useState } from "react";

interface NameFilterProps {
  onSelect: (name: string | null) => void;
}

const NameFilter: React.FC<NameFilterProps> = ({ onSelect }) => {
  const [name, setName] = useState<string | null>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleApply = () => {
    onSelect(name);
  };

  const handleClear = () => {
    setName(null);
    onSelect(null);
  };

  const isFilterApplied = name && name.trim() !== "";

  return (
    <div className="flex flex-col items-start gap-1">
      <label className="text-sm font-medium text-gray-700">Filtrar por nome</label>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={name || ""}
          onChange={handleNameChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-[200px] h-[40px]"
          placeholder="Digite um nome"
        />
        <button
          onClick={handleApply}
          className="bg-blue-500 text-white px-4 py-2 rounded-md h-[40px]"
        >
          Buscar
        </button>
        {isFilterApplied && (
          <button
            onClick={handleClear}
            className="bg-gray-500 text-white px-4 py-2 rounded-md h-[40px]"
          >
            Limpar
          </button>
        )}
      </div>
    </div>
  );
};

export default NameFilter;