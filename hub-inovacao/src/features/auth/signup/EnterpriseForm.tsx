import React, { useState, useEffect } from "react";
import MaskedInput from "react-text-mask";
import { createEnterprise } from "../users/users/enterprise.service";
import { Role } from "../users/users/user.interface";
import useSwal from "@/hooks/useSwal";
import useCEP from "@/hooks/useCEP";
import { ButtonGrande } from "@/components/Button";

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
  const [isFormValid, setIsFormValid] = useState(false);
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
      showError("Erro ao cadastrar empresa", (error as Error).message);
    }
  };

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 9) {
      await getCEPData(cep);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        address: { ...prevState.address, zipCode: cep },
      }));
    }
  };

  useEffect(() => {
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

  useEffect(() => {
    const isValid = Boolean(
      formData.nomeEmpresa &&
      formData.email &&
      formData.email.includes("@") &&
      formData.email.includes(".") &&
      formData.password.length >= 8 &&
      formData.password === confirmPassword &&
      formData.cnpj.replace(/\D/g, '').length === 14 &&
      formData.setorAtuacao &&
      formData.reprentantName &&
      formData.reprentantPosition &&
      formData.reprentantEmail &&
      formData.reprentantEmail.includes("@") &&
      formData.reprentantEmail.includes(".") &&
      formData.reprentantPhone.replace(/\D/g, '').length >= 10 &&
      formData.address.zipCode.replace(/\D/g, '').length === 8 &&
      formData.address.street &&
      formData.address.number &&
      formData.address.city &&
      formData.address.state &&
      formData.address.country
    );

    setIsFormValid(isValid);
  }, [formData, confirmPassword]);

  const handleEmailBlur = (email: string) => {
    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Por favor, insira um e-mail válido (com '@' e '.' após).");
    } else {
      setEmailError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Informações da Empresa</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa *</label>
          <input
            type="text"
            name="nomeEmpresa"
            value={formData.nomeEmpresa || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ *</label>
            <MaskedInput
              mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Setor de Atuação *</label>
            <input
              type="text"
              name="setorAtuacao"
              value={formData.setorAtuacao || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Contatos</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mail Corporativo *</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            onBlur={() => handleEmailBlur(formData.email)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            disabled={loading}
            required
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              className={`w-full px-4 py-2 border rounded-lg ${
                passwordTouched && formData.password.length < 8 ? "border-red-500" : "border-gray-300"
              }`}
              required
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha *</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={handleConfirmPasswordBlur}
              className={`w-full px-4 py-2 border rounded-lg ${
                confirmPasswordTouched && formData.password !== confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {confirmPasswordTouched && formData.password !== confirmPassword && (
              <p className="text-red-500 text-sm mt-1">As senhas não coincidem</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Representante Legal</h2>
        
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo *</label>
            <input
              type="text"
              name="reprentantName"
              value={formData.reprentantName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cargo *</label>
            <input
              type="text"
              name="reprentantPosition"
              value={formData.reprentantPosition}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
            <input
              type="email"
              name="reprentantEmail"
              value={formData.reprentantEmail}
              onChange={handleChange}
              onBlur={() => handleEmailBlur(formData.reprentantEmail)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone *</label>
            <MaskedInput
              mask={['(', /\d/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              name="reprentantPhone"
              value={formData.reprentantPhone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Endereço</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">CEP *</label>
            <input
              type="text"
              name="address.zipCode"
              value={formData.address.zipCode}
              onChange={handleCEPChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Logradouro *</label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              disabled={loading}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número *</label>
            <input
              type="number"
              name="address.number"
              value={formData.address?.number || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              disabled={loading}
              min="0"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
            <input
              type="text"
              name="address.complement"
              value={formData.address?.complement || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cidade *</label>
            <input
              type="text"
              name="address.city"
              value={formData.address?.city || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
              disabled={loading}
              readOnly
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado *</label>
            <input
              type="text"
              name="address.state"
              value={formData.address?.state || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
              disabled={loading}
              readOnly
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">País *</label>
            <input
              type="text"
              name="address.country"
              value={formData.address?.country || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
              disabled={loading}
              readOnly
              required
            />
          </div>
        </div>
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
          text={loading ? "Processando..." : "Cadastrar Empresa"} 
          disabled={!isFormValid || loading}
        />
      </div>
    </form>
  );
}