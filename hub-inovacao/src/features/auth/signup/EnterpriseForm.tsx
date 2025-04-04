import React, { useState } from "react";
import MaskedInput from "react-text-mask";
import { createEnterprise } from "../users/users/enterprise.service";
import { Role } from "../users/users/user.interface";
import useSwal from "@/hooks/useSwal";
import useCEP from "@/hooks/useCEP";

export default function EnterpriseForm() {
  const [formData, setFormData] = useState({
    nomeEmpresa: "",
    email: "",
    password: "",
    cnpj: "",
    role: Role.ENTERPRISE,
    setorAtuacao: "",
    reprentantName: "",
    reprentantPosition: "",
    reprentantEmail: "",
    reprentantPhone: "",
    address: {
      street: "",
      number: "",
      complement: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [emailError, setEmailError] = useState("");
  const { showSuccess, showError } = useSwal();
  const { getCEPData, address, loading } = useCEP();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressKey = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressKey]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    checkPasswordStrength(password);
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordTouched(true);
  };

  const checkPasswordStrength = (password: string) => {
    const length = password.length;
    if (length >= 8) {
      if (/[A-Z]/.test(password) && /[0-9]/.test(password)) {
        setPasswordStrength("Forte");
      } else if (/[A-Za-z]/.test(password) && /\d/.test(password)) {
        setPasswordStrength("Média");
      } else {
        setPasswordStrength("Fraca");
      }
    } else {
      setPasswordStrength("Fraca");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createEnterprise(formData);
      showSuccess(
        "Cadastro realizado com sucesso!",
        "A empresa foi cadastrada."
      );
    } catch (error) {
      showError("Erro ao cadastrar empresa", error.message);
    }
  };

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      await getCEPData(cep);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        address: { ...prevState.address, zipCode: cep },
      }));
    }
  };

  React.useEffect(() => {
    if (address) {
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          street: address.logradouro,
          city: address.localidade,
          state: address.uf,
          country: "Brasil",
        },
      }));
    }
  }, [address]);

  const handleEmailBlur = (email: string) => {
    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Por favor, insira um e-mail válido (com '@' e '.' após).");
    } else {
      setEmailError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="nomeEmpresa"
          placeholder="Nome da Empresa"
          value={formData.nomeEmpresa || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email || ""}
          onChange={handleChange}
          onBlur={() => handleEmailBlur(formData.email)}
          className="w-full px-4 py-2 border rounded-lg"
          disabled={loading}
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Senha (mínimo 8 caracteres)"
          value={formData.password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          className={`w-full px-4 py-2 border rounded-lg ${
            passwordTouched && formData.password.length < 8
              ? "border-red-500"
              : ""
          }`}
        />
        {passwordTouched && formData.password.length < 8 && (
          <p className="text-red-500 text-sm">
            A senha deve ter pelo menos 8 caracteres.
          </p>
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
          className={`w-full px-4 py-2 border rounded-lg ${
            confirmPasswordTouched && formData.password !== confirmPassword
              ? "border-red-500"
              : ""
          }`}
        />
        {confirmPasswordTouched && formData.password !== confirmPassword && (
          <p className="text-red-500 text-sm">As senhas não coincidem</p>
        )}
      </div>

      <div>
        <MaskedInput
          mask={[
            /\d/,
            /\d/,
            ".",
            /\d/,
            /\d/,
            /\d/,
            ".",
            /\d/,
            /\d/,
            /\d/,
            "/",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
          ]}
          name="cnpj"
          placeholder="CNPJ"
          value={formData.cnpj || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <input
          type="text"
          name="setorAtuacao"
          placeholder="Setor de Atuação"
          value={formData.setorAtuacao || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <input
          type="text"
          name="reprentantName"
          placeholder="Nome do Representante"
          value={formData.reprentantName || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <input
          type="text"
          name="reprentantPosition"
          placeholder="Cargo do Representante"
          value={formData.reprentantPosition || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <input
          type="email"
          name="reprentantEmail"
          placeholder="E-mail do Representante"
          value={formData.reprentantEmail || ""}
          onChange={handleChange}
          onBlur={() => handleEmailBlur(formData.reprentantEmail)}
          className="w-full px-4 py-2 border rounded-lg"
          disabled={loading}
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
      </div>

      <div>
        <MaskedInput
          mask={[
            "(",
            /\d/,
            /\d/,
            ")",
            " ",
            /\d/,
            " ",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]}
          name="reprentantPhone"
          placeholder="Telefone do Representante"
          value={formData.reprentantPhone || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <input
          type="text"
          name="address.zipCode"
          placeholder="CEP"
          value={formData.address?.zipCode || ""}
          onChange={handleCEPChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <input
          type="text"
          name="address.street"
          placeholder="Logradouro"
          value={formData.address?.street || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg bg-gray-200"
          disabled={loading}
          readOnly
        />
      </div>

      <div>
        <input
          type="number"
          name="address.number"
          placeholder="Número"
          value={formData.address?.number || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          disabled={loading}
          min="0"
        />
      </div>

      <div>
        <input
          type="text"
          name="address.complement"
          placeholder="Complemento"
          value={formData.address?.complement || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          disabled={loading}
        />
      </div>

      <div>
        <input
          type="text"
          name="address.city"
          placeholder="Cidade"
          value={formData.address?.city || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg bg-gray-200"
          disabled={loading}
          readOnly
        />
      </div>

      <div>
        <input
          type="text"
          name="address.state"
          placeholder="Estado"
          value={formData.address?.state || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg bg-gray-200"
          disabled={loading}
          readOnly
        />
      </div>

      <div>
        <input
          type="text"
          name="address.country"
          placeholder="País"
          value={formData.address?.country || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg bg-gray-200"
          disabled={loading}
          readOnly
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg"
        disabled={loading}
      >
        {loading ? "Carregando..." : "Cadastrar Empresa"}
      </button>
    </form>
  );
}