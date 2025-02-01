import { useState } from "react";
import { AcademicProjectResponseProfessorDTO, AcademicProjectResponseStudentDTO } from "../interfaces/projectInterfaces";

interface UpdateProjectDetailsProps {
  project: AcademicProjectResponseProfessorDTO | AcademicProjectResponseStudentDTO;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProject: { title: string, description: string, urlPhoto: string, pdfLink: string, siteLink: string }) => void;
}

const UpdateProjectDetails = ({ project, isOpen, onClose, onSave }: UpdateProjectDetailsProps) => {
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    urlPhoto: project.urlPhoto,
    pdfLink: project.pdfLink,
    siteLink: project.siteLink,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Editar Projeto</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">Descrição</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="urlPhoto" className="block text-sm font-medium">URL Foto</label>
          <input
            type="text"
            name="urlPhoto"
            value={formData.urlPhoto}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="pdfLink" className="block text-sm font-medium">URL do PDF</label>
          <input
            type="text"
            name="pdfLink"
            value={formData.pdfLink}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="siteLink" className="block text-sm font-medium">URL do Site</label>
          <input
            type="text"
            name="siteLink"
            value={formData.siteLink}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProjectDetails;