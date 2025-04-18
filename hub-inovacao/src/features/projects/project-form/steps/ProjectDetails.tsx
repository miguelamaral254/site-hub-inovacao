/* eslint-disable @next/next/no-img-element */
import { ButtonGrande, ButtonGrandeSeg } from "@/components/Button";
import { Input } from "@/components/Form/Input";
import { useContext, useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { ErrorCard } from "../ErrorCard";
import { multiStepContext } from "../StepContext";

type Props = {
  setStep: (step: number) => void;
};

export const ProjectDetails = ({ setStep }: Props) => {
  const { formData, setFormData } = useContext(multiStepContext);
  const [error, setError] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const defaultFormData = {
    problem: '',
    specificObjective: '',
    generalObjective: '',
    expectedResults: '',
    urlPhoto: '', 
  };
  const safeFormData = { ...defaultFormData, ...formData };

  const handleNext = () => {
    if (
      safeFormData.problem ||
      safeFormData.specificObjective ||
      safeFormData.generalObjective ||
      safeFormData.expectedResults
    ) {
      setError(false);
      setStep(4);
    } else {
      setError(true);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...safeFormData, urlPhoto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="flex flex-col gap-6 text-left px-10 mt-12 relative">
      <div className="flex justify-between gap-6">
        <div className="w-full flex flex-col gap-4">
          <Input
            label="Problema"
            value={safeFormData.problem}
            isRequired
            onChange={(e) =>
              setFormData({ ...safeFormData, problem: e.target.value })
            }
            isBig={true}
          />
          <Input
            label="Objetivos Gerais"
            value={safeFormData.generalObjective}
            isRequired
            onChange={(e) =>
              setFormData({ ...safeFormData, generalObjective: e.target.value })
            }
            isBig={true}
          />
          <Input
            label="Objetivos Específicos"
            value={safeFormData.specificObjective}
            isRequired
            onChange={(e) =>
              setFormData({ ...safeFormData, specificObjective: e.target.value })
            }
            isBig={true}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <Input
            label="Resultados Esperados"
            value={safeFormData.expectedResults}
            isRequired
            onChange={(e) =>
              setFormData({ ...safeFormData, expectedResults: e.target.value })
            }
            isBig={true}
          />

          <div className="flex justify-center items-center">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <div
              className="flex items-center gap-2 bg-[#64748B] p-2 text-white rounded-md cursor-pointer"
              onClick={handleImageClick}
            >
              <MdOutlineFileUpload className="text-2xl" />
              Imagem da Logo ou imagem do projeto
            </div>
          </div>

          {safeFormData.urlPhoto && (
            <div className="flex justify-center">
              <img
                src={safeFormData.urlPhoto}
                alt="Pré-visualização da imagem"
                className="mt-4 w-full max-w-xs h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full justify-end mt-10 gap-6">
        <ButtonGrandeSeg text="Voltar" onClick={() => setStep(2)} />
        <ButtonGrande text="Avançar" onClick={handleNext} />
      </div>

      {error === true && (
        <div className="w-full flex justify-end items-end mt-4">
          <ErrorCard />
        </div>
      )}
    </form>
  );
};