/* eslint-disable @typescript-eslint/no-explicit-any */
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

// Seu componente PartnerCompanyForm atualizado
export default function PartnerCompanyForm({
  formData,
  handleChange,
  handlePhoneChange,
  handleAddPhone,
  handleRemovePhone,  
  handleSubmit,
  errors,
}: PartnerCompanyFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Nome da Empresa"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <p className="text-red-500 text-sm">Campo obrigatório</p>}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && <p className="text-red-500 text-sm">Campo obrigatório</p>}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.password ? 'border-red-500' : ''}`}
        />
        {errors.password && <p className="text-red-500 text-sm">Campo obrigatório</p>}
      </div>

      {/* Máscara para CNPJ */}
      <div>
        <MaskedInput
          mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
          name="cnpj"
          placeholder="CNPJ"
          value={formData.cnpj}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.cnpj ? 'border-red-500' : ''}`}
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
          className={`w-full px-4 py-2 border rounded-lg ${errors.institutionOrganization ? 'border-red-500' : ''}`}
        />
        {errors.institutionOrganization && <p className="text-red-500 text-sm">Campo obrigatório</p>}
      </div>

     
<div className="space-y-2">
        {formData.phones.map((phone, index) => (
          <div key={index} className="flex items-center space-x-2">
            <MaskedInput
              mask={['(', /\d/, /\d/, ')', ' ',/\d/,' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              name={`phone-${index}`}
              value={phone.number}
              onChange={(e) => handlePhoneChange(index, e)}
              placeholder="Número de telefone"
              className={`w-full px-4 py-2 border rounded-lg ${errors[`phone-${index}`] ? 'border-red-500' : ''}`}
            />
            {errors[`phone-${index}`] && <p className="text-red-500 text-sm">Campo obrigatório</p>}

            {/* Ícone de lixeira para remover o telefone */}
            <button
              type="button"
              onClick={() => handleRemovePhone(index)}  // Passa o index para a função handleRemovePhone
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        ))}

        {/* Botão para adicionar novo telefone */}
        <button
          type="button"
          onClick={handleAddPhone}
          className="text-blue-600 hover:underline"
        >
          Adicionar outro telefone
        </button>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Cadastrar
      </button>
    </form>
  );
}