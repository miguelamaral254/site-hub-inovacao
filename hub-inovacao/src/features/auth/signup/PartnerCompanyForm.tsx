/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ButtonGrande } from "@/components/Button";
import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import MaskedInput from "react-text-mask";

interface Phone {
  number: string;
}

interface PartnerCompanyFormProps {
  formData: {
    name: string;
    email: string;
    password: string;
    cnpj: string;
    institutionOrganization: string;
    phones: Phone[];
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handlePhoneChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddPhone: () => void;
  handleRemovePhone: (index: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
  errors: any;
}

export default function PartnerCompanyForm({
  formData,
  handleChange,
  handlePhoneChange,
  handleAddPhone,
  handleRemovePhone,
  handleSubmit,
  errors,
}: PartnerCompanyFormProps) {
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(""); // Local state para confirmar senha
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  useEffect(() => {
    const isValid = Boolean(
      formData.name &&
      validateEmail(formData.email) &&
      formData.password.length >= 8 &&
      formData.password === confirmPassword && // Validação contra o confirmPassword local
      formData.cnpj &&
      formData.institutionOrganization &&
      formData.phones.length > 0 &&
      formData.phones.every((phone) => phone.number.length >= 14)
    );

    setIsFormValid(isValid);
  }, [formData, confirmPassword]); // O formulário será validado quando o confirmPassword mudar

  const validateEmail = (email: string): boolean => {
    const regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
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

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordTouched(true);
    if (confirmPassword && formData.password !== confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem.";
    } else {
      delete errors.confirmPassword;
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleChange(e);
    if (!validateEmail(value)) {
      errors.email = "O e-mail deve conter '@' e um domínio válido (ex: .com)";
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
          placeholder="Nome da Empresa"
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
          value={confirmPassword} // Usando o estado local para confirmação
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
          mask={[/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
          name="cnpj"
          placeholder="CNPJ"
          value={formData.cnpj}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.cnpj ? "border-red-500" : ""}`}
        />
        {errors.cnpj && <p className="text-red-500 text-sm">Campo obrigatório</p>}
      </div>

      <div>
        <input
          type="text"
          name="institutionOrganization"
          placeholder="Instituição/Organização"
          value={formData.institutionOrganization}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.institutionOrganization ? "border-red-500" : ""}`}
        />
        {errors.institutionOrganization && <p className="text-red-500 text-sm">Campo obrigatório</p>}
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
              className={`w-full px-4 py-2 border rounded-lg ${errors[`phone-${index}`] ? "border-red-500" : ""}`}
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

      <ButtonGrande type="submit" text="Cadastrar" disabled={!isFormValid} />
    </form>
  );
}