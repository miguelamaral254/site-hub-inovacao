/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import MaskedInput from "react-text-mask";
import { ButtonGrande } from "@/components/Button";
import { FaTrash } from "react-icons/fa";
import { Role } from "../auth/users/user.interface";
import { createUser } from "./signup.service";


interface Phone {
  id?: number;
  number: string;
  countryCode: string;
}

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
        <input
          type="text"
          name="name"
          placeholder="Nome Completo"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && <p className="text-red-500 text-sm">Campo obrigatório</p>}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleEmailChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Senha (mínimo 8 caracteres)"
          value={formData.password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          className={`w-full px-4 py-2 border rounded-lg ${errors.password ? "border-red-500" : ""}`}
        />
        {passwordTouched && formData.password.length < 8 && (
          <p className="text-red-500 text-sm">A senha deve ter pelo menos 8 caracteres.</p>
        )}
        <p className="text-sm mt-1">
          Força da senha:{" "}
          <span
            className={`font-bold ${
              passwordStrength === "Forte"
                ? "text-green-600"
                : passwordStrength === "Média"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {passwordStrength}
          </span>
        </p>
      </div>

      <div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onBlur={handleConfirmPasswordBlur}
          className={`w-full px-4 py-2 border rounded-lg ${errors.confirmPassword ? "border-red-500" : ""}`}
        />
        {confirmPasswordTouched && formData.password !== confirmPassword && (
          <p className="text-red-500 text-sm">As senhas não coincidem</p>
        )}
      </div>

      <div>
        <MaskedInput
          mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.cpf ? "border-red-500" : ""}`}
        />
        {errors.cpf && <p className="text-red-500 text-sm">CPF inválido</p>}
      </div>

      <div>
        <input
          type="text"
          name="registration"
          placeholder="Matrícula"
          value={formData.registration}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.registration ? "border-red-500" : ""}`}
        />
        {errors.registration && <p className="text-red-500 text-sm">Campo obrigatório</p>}
      </div>

      <div>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.role ? "border-red-500" : ""}`}
        >
          <option value={Role.STUDENT}>Estudante</option>
          <option value={Role.PROFESSOR}>Professor</option>
          <option value={Role.ENTERPRISE}>Empresa</option>
          <option value={Role.MANAGER}>Gestor</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm">Campo obrigatório</p>}
      </div>

      <div className="space-y-2">
        {formData.phones.map((phone, index) => (
          <div key={index} className="flex items-center space-x-2">
            <MaskedInput
              mask={["(", /\d/, /\d/, ")", " ", /\d/, " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
              name="number"
              placeholder="Número de telefone"
              value={phone.number}
              onChange={(e) => handlePhoneChange(index, e)}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.phones?.[index]?.number ? "border-red-500" : ""
              }`}
            />
            <select
              name="countryCode"
              value={phone.countryCode}
              onChange={(e) => handlePhoneChange(index, e)}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.phones?.[index]?.countryCode ? "border-red-500" : ""
              }`}
            >
              <option value="55">Brasil (+55)</option>
              <option value="1">EUA (+1)</option>
              <option value="44">Reino Unido (+44)</option>
              <option value="33">França (+33)</option>
              <option value="34">Espanha (+34)</option>
            </select>
            <button
              type="button"
              onClick={() => handleRemovePhone(index)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddPhone}
          className="text-blue-600 hover:underline"
        >
          Adicionar outro telefone
        </button>
      </div>

      <div className="flex flex-row justify-center items-center gap-4">
        <ButtonGrande type="submit" text="Cadastrar" disabled={!isFormValid} />
      </div>
    </form>
  );
}