"use client"

import { CardEditais, CardServico, CardSimples } from "@/components/Card";

export default function Inicio() {
  return (
    <div className="flex">
      <CardSimples/>
      <CardServico/>
      <CardEditais/>
    </div>
  );
}