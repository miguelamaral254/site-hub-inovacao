/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { Role } from "@/interfaces/userInterface";
import MaskedInput from "react-text-mask";
import { ButtonGrande } from "@/components/Button";
import { FaTrash } from "react-icons/fa";

interface Phone {
  number: string;
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
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handlePhoneChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddPhone: () => void;
  handleRemovePhone: (index: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
  errors: any;
}

export default function UserForm({
  formData,
  handleChange,
  handlePhoneChange,
  handleAddPhone,
  handleRemovePhone,
  handleSubmit,
  errors,
}: UserFormProps) {
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const isValid = Boolean(
      formData.name &&
      validateEmail(formData.email) &&
      formData.password.length >= 8 &&
      formData.password === confirmPassword &&
      formData.cpf &&
      formData.registration &&
      formData.phones.length > 0 &&
      formData.phones.every((phone) => phone.number.length >= 14)
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
    if (confirmPassword && formData.password !== confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem.";
    } else {
      delete errors.confirmPassword;
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleChange(e);
    if (!validateEmail(value)) {
      errors.email = "Email deve ser do domínio @edu.pe.senac.br";
    } else {
      delete errors.email;
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
        {confirmPasswordTouched && errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
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
        {errors.cpf && <p className="text-red-500 text-sm">Campo obrigatório</p>}
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

      <div className="space-y-2">
        {formData.phones.map((phone, index) => (
          <div key={index} className="flex items-center space-x-2">
            <MaskedInput
              mask={["(", /\d/, /\d/, ")", " ", /\d/, " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
              name={`phone-${index}`}
              value={phone.number}
              onChange={(e) => handlePhoneChange(index, e)}
              placeholder="Número de telefone"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button type="button" onClick={() => handleRemovePhone(index)} className="text-red-500 hover:text-red-700">
              <FaTrash />
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddPhone} className="text-blue-600 hover:underline">
          Adicionar outro telefone
        </button>
      </div>

      <div className="flex flex-row justify-center items-center gap-4">
        <ButtonGrande type="submit" text="Cadastrar" disabled={!isFormValid} />
      </div>
    </form>
  );
}