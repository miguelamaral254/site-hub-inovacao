"use client";

import React, { useState } from "react";

interface DateFilterProps {
  onSelect: (startDate: string | null, endDate: string | null) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onSelect }) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleApply = () => {
    onSelect(startDate, endDate);
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    onSelect(null, null);
  };

  const isFilterApplied = startDate || endDate;

  return (
    <div className="flex flex-col items-start gap-1">
      <label className="text-sm font-medium text-gray-700">Filtrar por data</label>
      <div className="flex gap-2 items-center">
        <input
          type="date"
          value={startDate || ""}
          onChange={handleStartDateChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-[150px] h-[40px]"
        />
        <input
          type="date"
          value={endDate || ""}
          onChange={handleEndDateChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-[150px] h-[40px]"
        />
        <button
          onClick={handleApply}
          className="bg-blue-500 text-white px-4 py-2 rounded-md h-[40px]"
        >
          Aplicar
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

export default DateFilter;