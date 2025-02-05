 
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Role } from "@/interfaces/userInterface";
import MaskedInput from "react-text-mask";
import { ButtonGrande, ButtonOutline } from "@/components/Button";
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
}: UserFormProps)  {
  // Função para validar o e-mail com domínio específico
  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@edu\.pe\.senac\.br$/;
    return regex.test(email);
  };

  // Função para alterar e validar o e-mail
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(e); // Chama o handleChange principal

    // Verificar se o e-mail está no formato correto
    if (name === "email" && !validateEmail(value)) {
      errors.email = "Email deve ser do domínio @edu.pe.senac.br";
    } else {
      delete errors.email; // Remove o erro se o e-mail for válido
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
          onChange={handleEmailChange}  // Usar handleEmailChange para validar o e-mail
          className={`w-full px-4 py-2 border rounded-lg ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}  {/* Exibe o erro se o e-mail não for válido */}
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

      {/* Máscara CPF */}
      <div>
        <MaskedInput
          mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors.cpf ? 'border-red-500' : ''}`}
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
          className={`w-full px-4 py-2 border rounded-lg ${errors.registration ? 'border-red-500' : ''}`}
        />
        {errors.registration && <p className="text-red-500 text-sm">Campo obrigatório</p>}
      </div>

      <div>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value={Role.STUDENT}>Aluno</option>
          <option value={Role.PROFESSOR}>Professor</option>
        </select>
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

      <p className="text-center text-base font-medium mt-4">
          Já possui uma conta? <a href="/login" className="text-blue-600 font-medium">Faça Login</a>
      </p>

      <div className="flex flex-row justify-center items-center gap-4">
        <ButtonOutline text="Voltar"/>
        <ButtonGrande type="submit" text="Cadastrar"/>
      </div>
    </form>
  );
}