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
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center">
        Cadastro de Empresa
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Coluna 1 */}
        <div className="space-y-4">
          {/* Nome da Empresa */}
          <div>
            <label htmlFor="nomeEmpresa" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Nome da Empresa *
            </label>
            <input
              id="nomeEmpresa"
              type="text"
              name="nomeEmpresa"
              value={formData.nomeEmpresa || ""}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              E-mail *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              onBlur={() => handleEmailBlur(formData.email)}
              required
              className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
            />
            {emailError && <p className="text-red-500 text-xs md:text-sm mt-1">{emailError}</p>}
          </div>

          {/* Senha */}
          <div>
            <label htmlFor="password" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Senha (mínimo 8 caracteres) *
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              required
              className={`w-full px-3 py-2 md:px-4 md:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                passwordTouched && formData.password.length < 8
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {passwordTouched && formData.password.length < 8 && (
              <p className="text-red-500 text-xs md:text-sm mt-1">
                A senha deve ter pelo menos 8 caracteres.
              </p>
            )}
            <p className="text-xs md:text-sm mt-1">
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

          {/* Confirmar Senha */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Confirmar Senha *
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={handleConfirmPasswordBlur}
              required
              className={`w-full px-3 py-2 md:px-4 md:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                confirmPasswordTouched && formData.password !== confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {confirmPasswordTouched && formData.password !== confirmPassword && (
              <p className="text-red-500 text-xs md:text-sm mt-1">As senhas não coincidem</p>
            )}
          </div>

          {/* CNPJ */}
          <div>
            <label htmlFor="cnpj" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              CNPJ *
            </label>
            <MaskedInput
              id="cnpj"
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
              value={formData.cnpj || ""}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Setor de Atuação */}
          <div>
            <label htmlFor="setorAtuacao" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Setor de Atuação *
            </label>
            <input
              id="setorAtuacao"
              type="text"
              name="setorAtuacao"
              value={formData.setorAtuacao || ""}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Coluna 2 */}
        <div className="space-y-4">
          {/* Nome do Representante */}
          <div>
            <label htmlFor="reprentantName" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Nome do Representante *
            </label>
            <input
              id="reprentantName"
              type="text"
              name="reprentantName"
              value={formData.reprentantName || ""}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Cargo do Representante */}
          <div>
            <label htmlFor="reprentantPosition" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Cargo do Representante *
            </label>
            <input
              id="reprentantPosition"
              type="text"
              name="reprentantPosition"
              value={formData.reprentantPosition || ""}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* E-mail do Representante */}
          <div>
            <label htmlFor="reprentantEmail" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              E-mail do Representante *
            </label>
            <input
              id="reprentantEmail"
              type="email"
              name="reprentantEmail"
              value={formData.reprentantEmail || ""}
              onChange={handleChange}
              onBlur={() => handleEmailBlur(formData.reprentantEmail)}
              required
              className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
            />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          {/* Telefone do Representante */}
          <div>
            <label htmlFor="reprentantPhone" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Telefone do Representante *
            </label>
            <MaskedInput
              id="reprentantPhone"
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
              value={formData.reprentantPhone || ""}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* CEP */}
          <div>
            <label htmlFor="address.zipCode" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              CEP *
            </label>
            <input
              id="address.zipCode"
              type="text"
              name="address.zipCode"
              value={formData.address?.zipCode || ""}
              onChange={handleCEPChange}
              required
              className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Logradouro */}
          <div>
            <label htmlFor="address.street" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Logradouro *
            </label>
            <input
              id="address.street"
              type="text"
              name="address.street"
              value={formData.address?.street || ""}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
              readOnly
            />
          </div>

          {/* Número */}
          <div>
            <label htmlFor="address.number" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Número *
            </label>
            <input
              id="address.number"
              type="number"
              name="address.number"
              value={formData.address?.number || ""}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
              min="0"
            />
          </div>

          {/* Complemento */}
          <div>
            <label htmlFor="address.complement" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Complemento
            </label>
            <input
              id="address.complement"
              type="text"
              name="address.complement"
              value={formData.address?.complement || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
            />
          </div>
        </div>
      </div>

      {/* Cidade, Estado e País - uma linha */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Cidade */}
        <div>
          <label htmlFor="address.city" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
            Cidade *
          </label>
          <input
            id="address.city"
            type="text"
            name="address.city"
            value={formData.address?.city || ""}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
            readOnly
          />
        </div>

        {/* Estado */}
        <div>
          <label htmlFor="address.state" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
            Estado *
          </label>
          <input
            id="address.state"
            type="text"
            name="address.state"
            value={formData.address?.state || ""}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
            readOnly
          />
        </div>

        {/* País */}
        <div>
          <label htmlFor="address.country" className="block text-sm md:text-base font-medium text-gray-700 mb-1">
            País *
          </label>
          <input
            id="address.country"
            type="text"
            name="address.country"
            value={formData.address?.country || ""}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
            readOnly
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={loading}
        >
        {loading ? "Carregando..." : "Cadastrar Empresa"}
        </button>
      </div>
    </form>
  );
}