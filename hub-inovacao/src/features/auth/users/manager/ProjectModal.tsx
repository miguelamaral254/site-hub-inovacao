/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { AcademicProjectResponseDTO } from "@/interfaces/AcademicProjectInterface";
import { OpportunityResponseDTO } from "@/interfaces/OpportunityInterfaces"; 
import { ButtonGrande, ButtonOutline } from "@/components/Button";
import { updateProjectStatus } from "@/services/projectService";
import { updateOpportunityStatus } from "@/features/core/opportunityService";
import useSwal from "@/hooks/useSwal";

interface ProjectModalProps {
  project?: AcademicProjectResponseDTO;
  opportunity?: OpportunityResponseDTO;
  fetchProjects: () => void;
  handleClose: () => void;
  statusToSet?: "APROVADA" | "REPROVADA";
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, opportunity, fetchProjects, handleClose, statusToSet }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEditMode, setIsEditMode] = useState(false);
  const [status, setStatus] = useState<"APROVADA" | "REPROVADA">(statusToSet || "APROVADA");
  const [feedback, setFeedback] = useState(project?.feedback || opportunity?.feedback || "");
  const [justification, setJustification] = useState(project?.justification || opportunity?.justification || "");
  const { showSuccess, showError } = useSwal();



  const handleCloseModal = () => {
    setIsEditMode(false);
    handleClose();
  };

  const handleSave = async () => {
    try {
      const storedUserData = localStorage.getItem("userData");
      let idManager = "";
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        idManager = userData.id;
      }

      const validationDate = new Date().toISOString().split("T")[0];

      if (project) {
        await updateProjectStatus(Number(project.id), {
          id: Number(project.id),
          status,
          feedback,
          justification,
          idManager,
        });
      } else if (opportunity) {
        await updateOpportunityStatus(Number(opportunity.id), {
          id: Number(opportunity.id),
          status,
          validationDate,
          feedback,
          justification,
          idManager,
        });
      }

      showSuccess("Status atualizado com sucesso!");
      fetchProjects();
    } catch (error: unknown) {
      showError(error instanceof Error ? error.message : "Erro ao atualizar status.");
    }
  }


  const handleRadioChange = (newStatus: "APROVADA" | "REPROVADA") => {
    setStatus(newStatus);
  };

  // Verifica se estamos lidando com um Projeto ou uma Oportunidade
  const isProject = project !== undefined;
  const isOpportunity = opportunity !== undefined;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl overflow-y-auto max-h-[80vh] relative">
        {/* Botão de Fechar */}
        <button
          className="absolute top-1 p-1 right-4 text-gray-600 text-3xl"
          onClick={handleCloseModal}
        >
          &times;
        </button>

      <div className="flex flex-row justify-start gap-6 ">
        <div className="flex flex-col w-1/2 gap-6">
            {/* Imagem do Projeto ou Oportunidade */}
            <div className="w-1/3 flex-shrink-0">
              {(isProject && project.urlPhoto) || (isOpportunity && opportunity.urlPhoto) ? (
                <img
                  src={isProject ? project.urlPhoto : opportunity?.urlPhoto}
                  alt="Imagem"
                  className="w-full h-auto rounded-md shadow-md"
                />
              ) : (
                <span>Imagem não disponível</span>
              )}
            </div>
         
          {/* Informações Gerais */}
          <div className="flex-1 border border-gray-300 p-4 rounded-lg">
              <div className="my-4">
                <strong className="text-2xl text-[#002B8F]">{isProject ? project.title : isOpportunity ? opportunity.title : "Não disponível"}</strong> 
              </div>
              <div className="my-4 flex flex-row items-center gap-2">
                <strong className="text-lg text-[#3355A5]">Data de publicação:</strong> <p>{isProject ? project.creationDate : isOpportunity ? opportunity.creationDate : "Não disponível"} </p>
              </div>
              <div className="my-4 flex-row items-center gap-2">
                <strong className="text-lg text-[#3355A5]">Autor(a):</strong> <p>{isProject ? project.studentName || project.professorName : isOpportunity ? opportunity.institutionOrganization : "Não disponível"} </p>
              </div>
              <div className="my-4">
                <strong className="text-lg text-[#3355A5]">Descrição:</strong> <p>{isProject ? project.description : isOpportunity ? opportunity.description : "Não disponível"} </p>
              </div>
              <div className=" flex items-center">
                  {(isProject && project.siteLink) || (isOpportunity && opportunity.siteLink) ? (
                    <a
                      href={isProject ? project.siteLink : opportunity?.siteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 flex- items-center"
                    >
                      Link para uma página ou protótipo
                    </a>
                  ) : (
                    <span>Link para uma página ou protótipo não disponível</span>
                  )}
                </div>
                <div className="my-4 flex items-center">
                  {(isProject && project.pdfLink) || (isOpportunity && opportunity.pdfLink) ? (
                    <a
                      href={isProject ? project.pdfLink : opportunity?.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      Acesse o PDF
                    </a>
                  ) : (
                    <span>Acesso para o PDF não disponível</span>
                  )}
                </div>
            </div>
          </div>

           {/* 
            <div className="my-4">
              <strong className="text-lg">Status:</strong> {isProject ? project.status : isOpportunity ? opportunity.status : "Não disponível"}
            </div> */}
            <div className="w-3/5 flex flex-col justify-start items-start">
              <h2 className="text-xl text-[#3355A5] font-medium mb-6">A submissão foi: </h2>
            
              {/* Botões de Aprovação e Reprovação (somente para Projetos) */}
              {(isProject || isOpportunity) && (
              <div className="flex flex-row justify-end gap-20 mt-5 ml-20">
                <label htmlFor="aprovada" className="flex justify-end items-center gap-4 text-base text-[#00123C]">
                  <input type="radio" name="status" id="aprovada" className="w-5 h-5" 
                  onChange={() => handleRadioChange("APROVADA")}
                  checked={status === "APROVADA"}/>
                Aprovada</label>
                <label htmlFor="a provada" className="flex justify-end items-center gap-4 text-base text-[#00123C]">
                  <input type="radio" name="status" id="reprovada" className="w-5 h-5"
                  onChange={() => handleRadioChange("REPROVADA")}
                  checked={status === "REPROVADA"}/>
                Reprovada</label>
                
              </div>
              )}
              <div className="mt-20 w-full">
                <label className="block text-gray-700 mb-2">Avaliação</label>
                <textarea
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  rows={4}
                />
              </div>
              <div className="mt-6 w-full">
                <label className="block text-gray-700 mb-2">Sugestões (Opcional)</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  rows={4}
                />
              </div>
            </div>  
    
          </div>
          <div className="flex justify-end gap-4">
            <ButtonOutline text="Cancelar" onClick={handleClose}/>
            <ButtonGrande text="Salvar" onClick={handleSave}/>
          </div>
  


      </div>
    </div>
  );
};

export default ProjectModal;