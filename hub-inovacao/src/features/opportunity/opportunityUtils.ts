/* eslint-disable @typescript-eslint/no-unused-vars */
import { OpportunityType } from "@/features/opportunity/opportunity.interface";

export const formatLabel = (value: string) =>
  value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const getOpportunityOptions = () => [
  { value: "", label: "Todos" },
  ...Object.entries(OpportunityType)
    .filter(([key, value]) => isNaN(Number(key))) 
    .map(([_, value]) => ({
      value,
      label: formatLabel(value as string), 
    })),
];