import React, { useState } from "react";
import MaskedInput from "react-text-mask";
import { createEnterprise } from "../users/users/enterprise.service";
import { Role } from "../users/users/user.interface";
import useSwal from "@/hooks/useSwal";

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
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const { showSuccess, showError } = useSwal();  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createEnterprise(formData);
      showSuccess("Cadastro realizado com sucesso!", "A empresa foi cadastrada.");  // Exibe o alerta de sucesso
    } catch (error) {
      showError("Erro ao cadastrar empresa", error.message);  // Exibe o alerta de erro
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
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <MaskedInput
          mask={[/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
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
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <MaskedInput
          mask={["(", /\d/, /\d/, ")", " ", /\d/, " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
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
          name="address.street"
          placeholder="Rua do Endereço"
          value={formData.address?.street || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <input
          type="text"
          name="address.city"
          placeholder="Cidade"
          value={formData.address?.city || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <input
          type="text"
          name="address.state"
          placeholder="Estado"
          value={formData.address?.state || ""}
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
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <input
          type="text"
          name="address.country"
          placeholder="País"
          value={formData.address?.country || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg"
      >
        Cadastrar Empresa
      </button>
    </form>
  );
}