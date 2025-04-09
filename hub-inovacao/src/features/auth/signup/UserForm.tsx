/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import MaskedInput from "react-text-mask";
import { ButtonGrande } from "@/components/Button";
import { FaTrash } from "react-icons/fa";
import { Phone, Role } from "../users/users/user.interface";
import { createUser } from "../users/users/user.service";

interface UserFormProps {
  formData: {
    name: string;
    email: string;
    password: string;
    role: Role;
    cpf: string;
    registration: string;
    phones: Phone[];
    enabled: boolean;
    createdDate?: string;
    lastModifiedDate?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: any } }) => void;
  handleAddPhone: () => void;
  handleRemovePhone: (index: number) => void;
  errors: any;
  showSuccess: (title: string, message: string) => void;
  showError: (title: string, message: string) => void;
}

export default function UserForm({
  formData,
  handleChange,
  handleAddPhone,
  handleRemovePhone,
  errors,
  showSuccess,
  showError,
}: UserFormProps) {
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePhoneChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newPhones = formData.phones.map((phone, i) => 
      i === index ? { ...phone, [name]: value } : phone
    );
    
    handleChange({
      target: {
        name: "phones",
        value: newPhones
      }
    });
  };

  useEffect(() => {
    const isValid = Boolean(
      formData.name &&
      validateEmail(formData.email) &&
      formData.password.length >= 8 &&
      formData.password === confirmPassword &&
      formData.cpf.replace(/\D/g, '').length === 11 &&
      formData.registration &&
      formData.phones.length > 0 &&
      formData.phones.every((phone) => phone.number.replace(/\D/g, '').length >= 10)
    );

    setIsFormValid(isValid);
  }, [formData, confirmPassword]);

  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@edu\.pe\.senac\.br$/;
    return regex.test(email);
  };

  const checkPasswordStrength = (password: string) => {
    if (password.length < 8) {
      setPasswordStrength("Fraca");
    } else if (password.match(/[A-Z]/) && password.match(/\d/)) {
      setPasswordStrength("Forte");
    } else {
      setPasswordStrength("Média");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    checkPasswordStrength(e.target.value);
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordTouched(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    if (!validateEmail(e.target.value)) {
      errors.email = "Email deve ser do domínio @edu.pe.senac.br";
    } else {
      delete errors.email;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const userData = {
        ...formData,
        cpf: formData.cpf.replace(/\D/g, ''),
        phones: formData.phones.map(phone => ({
          ...phone,
          number: phone.number.replace(/\D/g, '')
        }))
      };

      await createUser(userData);
      showSuccess("Cadastro realizado com sucesso!", "Você será redirecionado para a página de login.");
    } catch (error: any) {
      showError("Erro ao criar usuário", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nome Completo *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">Campo obrigatório</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          E-mail Institucional *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleEmailChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.email ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Senha *
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          className={`w-full px-4 py-2 border rounded-lg ${errors.password ? "border-red-500" : "border-gray-300"}`}
        />
        {passwordTouched && formData.password.length < 8 && (
          <p className="text-red-500 text-sm mt-1">A senha deve ter pelo menos 8 caracteres.</p>
        )}
        <div className="flex items-center mt-1">
          <span className={`text-sm font-bold ${
            passwordStrength === "Forte" ? "text-green-600" :
            passwordStrength === "Média" ? "text-yellow-500" :
            "text-red-500"
          }`}>
            {passwordStrength}
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirmar Senha *
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onBlur={handleConfirmPasswordBlur}
          className={`w-full px-4 py-2 border rounded-lg ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
        />
        {confirmPasswordTouched && formData.password !== confirmPassword && (
          <p className="text-red-500 text-sm mt-1">As senhas não coincidem</p>
        )}
      </div>

      <div>
        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
          CPF *
        </label>
        <MaskedInput
          mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.cpf ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.cpf && <p className="text-red-500 text-sm mt-1">CPF inválido</p>}
      </div>

      <div>
        <label htmlFor="registration" className="block text-sm font-medium text-gray-700 mb-1">
          Matrícula *
        </label>
        <input
          type="text"
          name="registration"
          value={formData.registration}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.registration ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.registration && <p className="text-red-500 text-sm mt-1">Campo obrigatório</p>}
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de Usuário *
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.role ? "border-red-500" : "border-gray-300"}`}
        >
          <option value={Role.STUDENT}>Estudante</option>
          <option value={Role.PROFESSOR}>Professor</option>
          <option value={Role.ENTERPRISE}>Empresa</option>
          <option value={Role.MANAGER}>Gestor</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm mt-1">Campo obrigatório</p>}
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Telefones *
        </label>
        {formData.phones.map((phone, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-40">
              <label htmlFor={`countryCode-${index}`} className="sr-only">Código do país</label>
              <select
                name="countryCode"
                value={phone.countryCode}
                onChange={(e) => handlePhoneChange(index, e)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base"
              >
                <option value="55">Brasil (+55)</option>
                <option value="1">Estados Unidos (+1)</option>
                <option value="44">Reino Unido (+44)</option>
                <option value="33">França (+33)</option>
                <option value="34">Espanha (+34)</option>
                <option value="49">Alemanha (+49)</option>
              </select>
            </div>
            
            <div className="flex-1 min-w-0">
              <label htmlFor={`phone-${index}`} className="sr-only">Número de telefone</label>
              <MaskedInput
                mask={["(", /\d/, /\d/, ")", " ", /\d/, " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
                name="number"
                value={phone.number}
                onChange={(e) => handlePhoneChange(index, e)}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.phones?.[index]?.number ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>

            {formData.phones.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemovePhone(index)}
                className="p-2 text-red-500 hover:text-red-700 transition-colors"
                aria-label="Remover telefone"
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddPhone}
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center mt-2"
        >
          <span>+ Adicionar outro telefone</span>
        </button>
      </div>

      <div className="flex justify-between gap-4 pt-6">
        <ButtonGrande 
          type="button" 
          text="Voltar" 
          onClick={() => window.history.back()}
          outline={true}
        />

        <ButtonGrande 
          type="submit" 
          text="Cadastrar" 
          disabled={!isFormValid}
        />
      </div>
    </form>
  );
}