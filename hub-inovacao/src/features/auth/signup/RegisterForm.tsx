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
    <div className="flex flex-col md:flex-row items-center justify-end min-h-screen pt-5 bg-gray-100 px-[140px]">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex justify-center items-center mb-4">
          <Image src={logo} alt="Logo HUBI" className="h-auto w-auto"/>
        </div>
        <h2 className="text-2xl font-medium text-blue-600 text-center mb-4">Cadastre-se</h2>
        <p className="text-base font-medium text-blue-800 text-center mb-4">
          Compartilhe seus projetos, ideias e muito mais!
        </p>

        <div className="flex justify-around mb-4">
          <div 
            className={`flex items-center space-x-2 cursor-pointer ${!isPartnerCompany ? 'text-blue-600' : 'text-gray-400'}`}
            onClick={() => {
              setIsPartnerCompany(false);
              setFormData(prev => ({ ...prev, role: Role.STUDENT }));
            }}
          >
            <FaUser size={30} />
            <span>Usuário</span>
          </div>

          <div 
            className={`flex items-center space-x-2 cursor-pointer ${isPartnerCompany ? 'text-blue-600' : 'text-gray-400'}`}
            onClick={() => {
              setIsPartnerCompany(true);
              setFormData(prev => ({ ...prev, role: Role.ENTERPRISE }));
            }}
          >
            <FaBuilding size={30} />
            <span>Empresa Parceira</span>
          </div>
        </div>

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
      <div className="w-auto flex justify-end items-end">
        <Image src={cadastro} alt="imagem Cadastro" className="h-auto w-[300px] md:w-[600px]" />
      </div>
    </div>
  );
}