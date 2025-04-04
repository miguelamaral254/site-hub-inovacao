/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useCEP.ts
import { useState } from "react";
import axios from "axios";

const useCEP = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const getCEPData = async (cep: string) => {
    setLoading(true);
    setError(""); 
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setError("CEP não encontrado.");
        setAddress(null);
      } else {
        setAddress(response.data);
      }
    } catch (err) {
      setError("Erro ao buscar CEP.");
      setAddress(null);
      console.log((err))
    }
    setLoading(false);
  };

  return {
    loading,
    address,
    error,
    getCEPData,
  };
};

export default useCEP;