import { Publish } from "@/features/publish/publish.interface";
import useSwal from "@/hooks/useSwal";
import { useState } from "react";


interface CreatePublishFormProps {
  onClose: () => void;
  onPublishCreated: () => void; // 🚀 Chama a função para recarregar a lista após o sucesso
}

const CreatePublishForm: React.FC<CreatePublishFormProps> = ({ onClose, onPublishCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [acessLink, setAcessLink] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { showSuccess, showError } = useSwal();
  const createdDate = new Date().toISOString().split("T")[0];

  const handleSubmit = async () => {
    if (!title || !description) {
      setErrorMessage("Campos obrigatórios não preenchidos");
      return;
    }

    const publishData: Publish = {
      title,
      description,
      acessLink,
      initialDate: new Date(initialDate).toISOString().split("T")[0],
      finalDate: new Date(finalDate).toISOString().split("T")[0],
      createdDate,
    };

    console.log("Dados enviados:", publishData);

    try {
      setIsLoading(true);
      await createPublish(publishData, imageFile);
      showSuccess("Publicação Criada com Sucesso!");
      onClose();
      onPublishCreated(); // 🚀 Atualiza a lista de publicações
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao criar publicação. Tente novamente.");
      showError("Erro ao criar publicação!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h3 className="text-xl font-semibold mb-4">Criar Publicação</h3>

        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Título *</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Descrição *</label>
            <textarea
              className="w-full p-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Link de Acesso</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={acessLink}
              onChange={(e) => setAcessLink(e.target.value)}
            />
          </div>

          {/* Upload de Imagem */}
          <div>
            <label className="block text-sm font-medium">Escolher Imagem</label>
            <input
              type="file"
              onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
              className="w-full p-2 border rounded"
              accept="image/*"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Data de Início *</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Data Final *</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
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
              onClick={handleSubmit}
              disabled={isLoading}
              className={`px-4 py-2 text-white rounded ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isLoading ? "Criando..." : "Criar Publicação"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePublishForm;