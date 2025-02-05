/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { FaUser, FaBuilding } from "react-icons/fa";
import { Role } from "@/interfaces/userInterface";  
import PartnerCompanyForm from "./PartnerCompanyForm";
import Image from "next/image";
import logo from "@/assets/Logo.svg";
import cadastro from "@/assets/Cadastro.svg"
import UserForm from "./UserForm";
import { createUserWithCnpj, createUserWithCpf } from "@/services/userService";
import useSwal from "@/hooks/useSwal";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: Role.STUDENT,
    cpf: "",
    registration: "",
    phones: [{ number: "" }],
    cnpj: "",
    institutionOrganization: "",
    userStatus: true,
  });

  const [isPartnerCompany, setIsPartnerCompany] = useState(false); 
  const [errors, setErrors] = useState<any>({});  
  const { showSuccess, showError } = useSwal();  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const phones = [...formData.phones];
    phones[index].number = e.target.value;
    setFormData({ ...formData, phones });
  };

  const handleAddPhone = () => {
    setFormData({ ...formData, phones: [...formData.phones, { number: "" }] });
  };
  const handleRemovePhone = (index: number) => {
    const updatedPhones = formData.phones.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      phones: updatedPhones,
    }));
  };
  

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.name) newErrors.name = "Campo obrigatório";
    if (!formData.email) newErrors.email = "Campo obrigatório";
    if (!formData.password) newErrors.password = "Campo obrigatório";
    if (!formData.cpf && !isPartnerCompany) newErrors.cpf = "Campo obrigatório";
    if (!formData.registration && !isPartnerCompany) newErrors.registration = "Campo obrigatório";
    if (isPartnerCompany && !formData.cnpj) newErrors.cnpj = "Campo obrigatório";
    if (isPartnerCompany && !formData.institutionOrganization) newErrors.institutionOrganization = "Campo obrigatório";
    formData.phones.forEach((phone, index) => {
      if (!phone.number) newErrors[`phone-${index}`] = "Campo obrigatório";
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return; 

    console.log("Dados do formulário:", formData);

    try {
      if (isPartnerCompany) {
        const response = await createUserWithCnpj(formData); 
        console.log("Empresa parceira criada com sucesso:", response);
      } else {
        const response = await createUserWithCpf(formData);  
        console.log("Usuário criado com sucesso:", response);
      }

      showSuccess("Cadastro realizado com sucesso!", "Você será redirecionado para a página de login.");
      
      setFormData({
        name: "",
        email: "",
        password: "",
        role: Role.STUDENT,
        cpf: "",
        registration: "",
        phones: [{ number: "" }],
        cnpj: "",
        institutionOrganization: "",
        userStatus: true,
      });

      setTimeout(() => {
        window.location.href = "/login";  
      }, 2000);

    } catch (error: unknown) {
      if (error instanceof Error) {
        showError("Erro ao criar usuário:", error.message);
      } else {
        showError("Erro desconhecido", "Tente novamente.");
      }
    }
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
              setFormData({ ...formData, role: Role.STUDENT });  
            }}
          >
            <FaUser size={30} />
            <span>Usuário</span>
          </div>

          <div 
            className={`flex items-center space-x-2 cursor-pointer ${isPartnerCompany ? 'text-blue-600' : 'text-gray-400'}`}
            onClick={() => {
              setIsPartnerCompany(true);
              setFormData({ ...formData, role: Role.PARTNER_COMPANY }); 
            }}
          >
            <FaBuilding size={30} />
            <span>Empresa Parceira</span>
          </div>
        </div>

        {isPartnerCompany ? (
          <PartnerCompanyForm
            formData={formData}
            handleChange={handleChange}
            handlePhoneChange={handlePhoneChange}
            handleAddPhone={handleAddPhone}
            handleRemovePhone={handleRemovePhone}  
            handleSubmit={handleSubmit}
            errors={errors}
          />
        ) : (
          <UserForm
            formData={formData}
            handleChange={handleChange}
            handlePhoneChange={handlePhoneChange}
            handleAddPhone={handleAddPhone}
            handleRemovePhone={handleRemovePhone}  
            handleSubmit={handleSubmit}
            errors={errors}
          />
        )}
      </div>
      <div className="w-auto flex justify-end items-end">
        <Image  src={cadastro} alt="imagem Login" className="h-auto w-[300px] md:w-[600px] "/></div>
    </div>
  );
}