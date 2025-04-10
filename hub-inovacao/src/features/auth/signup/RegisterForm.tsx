/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { FaUser, FaBuilding } from "react-icons/fa";
import Image from "next/image";
import logo from "@/assets/Logo.svg";
import cadastro from "@/assets/Cadastro.svg";
import UserForm from "./UserForm";
import useSwal from "@/hooks/useSwal";
import { Role } from "../users/users/user.interface";
import EnterpriseForm from "./EnterpriseForm";

type CustomChangeEvent = {
  target: {
    name: string;
    value: any;
  };
};

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: Role.STUDENT,
    cpf: "",
    registration: "",
    phones: [{ number: "", countryCode: "55" }],
    enabled: true,
  });

  const [formDataEnterprise, setFormDataEnterprise] = useState({
    nomeEmpresa: "",
    email: "",
    password: "",
    cnpj: "",
    setorAtuacao: "",
    reprentantName: "",
    reprentantPosition: "",
    reprentantEmail: "",
    reprentantPhone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    }
  });

  const [isPartnerCompany, setIsPartnerCompany] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const { showSuccess, showError } = useSwal();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | CustomChangeEvent
  ) => {
    const { name, value } = "nativeEvent" in e ? e.target : e.target;
  
    if (isPartnerCompany) {
      setFormDataEnterprise(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePhoneChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!isPartnerCompany) {
      const phones = [...formData.phones];
      const { name, value } = e.target;
      phones[index] = { ...phones[index], [name]: value };
      setFormData(prev => ({ ...prev, phones }));
    } else {
      const { name, value } = e.target;
      setFormDataEnterprise(prev => ({
        ...prev,
        reprentantPhone: value, 
      }));
    }
  };

  const handleAddPhone = () => {
    setFormData(prev => ({
      ...prev,
      phones: [...prev.phones, { number: "", countryCode: "55" }]
    }));
  };

  const handleRemovePhone = (index: number) => {
    const updatedPhones = formData.phones.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, phones: updatedPhones }));
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 py-8">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full lg:max-w-2xl order-2 lg:order-1">
          <div className="flex justify-center items-center mb-6">
            <Image 
              src={logo} 
              alt="Logo HUBI" 
              className="h-auto w-auto max-h-16"
              priority
            />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 text-center mb-2">
            Cadastre-se
          </h2>
          
          <p className="text-base sm:text-lg text-blue-800 text-center mb-6">
            Compartilhe seus projetos, ideias e muito mais!
          </p>

          <div className="flex justify-around mb-6 sm:mb-8 bg-gray-50 p-2 rounded-lg">
            <button
              type="button"
              className={`flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-2 rounded-lg w-full transition-colors ${
                !isPartnerCompany 
                  ? 'bg-blue-100 text-blue-600 shadow-inner' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              onClick={() => {
                setIsPartnerCompany(false);
                setFormData(prev => ({ ...prev, role: Role.STUDENT }));
              }}
            >
              <FaUser size={24} />
              <span className="text-sm sm:text-base font-medium">Usuário</span>
            </button>

            <button
              type="button"
              className={`flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-2 rounded-lg w-full transition-colors ${
                isPartnerCompany 
                  ? 'bg-blue-100 text-blue-600 shadow-inner' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              onClick={() => {
                setIsPartnerCompany(true);
                setFormData(prev => ({ ...prev, role: Role.ENTERPRISE }));
              }}
            >
              <FaBuilding size={24} />
              <span className="text-sm sm:text-base font-medium">Empresa Parceira</span>
            </button>
          </div>

          <div className="mt-4">
            {isPartnerCompany ? (
              <EnterpriseForm/>
            ) : (
              <UserForm
                formData={formData}
                handleChange={handleChange}
                handleAddPhone={handleAddPhone}
                handleRemovePhone={handleRemovePhone}
                errors={errors}
                showSuccess={showSuccess}
                showError={showError}
              />
            )}
          </div>
        </div>

        <div className="flex justify-center items-center w-full lg:w-auto order-1 lg:order-2 mb-6 lg:mb-0">
          <Image 
            src={cadastro} 
            alt="Imagem de Cadastro" 
            className="h-auto w-full max-w-md lg:max-w-lg xl:max-w-xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}