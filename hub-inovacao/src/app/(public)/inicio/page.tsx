"use client"

import { Card, CardEditais, CardServico } from "@/components/Card";

export default function Inicio() {
  return (
    <div className="flex">
      <Card/>
      <CardServico/>
      <CardEditais/>
    </div>
  );
}