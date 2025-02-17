import { useState } from "react";
import MaskedInput from "react-text-mask";
import { createUserWithCpf } from "@/services/userService";
import { CreateUserResponseDTO, Role } from "@/interfaces/userInterface";
import useSwal from "@/hooks/useSwal";

interface CreateManagerFormProps {
  onClose: () => void;
  onSuccess: (newManager: CreateUserResponseDTO) => void;
}

const CreateManagerForm: React.FC<CreateManagerFormProps> = ({ onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [registration, setRegistration] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { showSuccess, showError } = useSwal();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const newManager = await createUserWithCpf({
        name,
        email,
        cpf,
        registration,
        password,
        role: Role.MANAGER, 
        phones: [{ number: phone }]
      });

      showSuccess("Gerente criado com sucesso!");
      onSuccess(newManager);
      onClose();
    } catch (error) {
      showError("Erro ao criar gerente", error instanceof Error ? error.message : "Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h3 className="text-xl font-semibold mb-4">Adicionar Gerente</h3>

        {errorMessage && <p className="text-red-600 text-sm mb-2">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nome</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">CPF</label>
            <MaskedInput
              mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
              className="w-full p-2 border rounded"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="000.000.000-00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Registro</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Telefone</label>
            <MaskedInput
              mask={['(', /\d/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              className="w-full p-2 border rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(00) 0 0000-0000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Senha</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateManagerForm;