/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef } from "react";
import { MdOutlineFileUpload } from "react-icons/md";

interface StepThreeProps {
  disponibilidadeDados: string;
  setDisponibilidadeDados: (value: string) => void;
  mentoriaSuporte: boolean | null;
  setMentoriaSuporte: (value: boolean) => void;
  visitatecnica: boolean | null;
  setVisitaTecnica: (value: boolean) => void;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  recursosDisponiveis: string[];
  setRecursosDisponiveis: (value: string[]) => void;
}


export const StepThree: React.FC<StepThreeProps>= ({
  disponibilidadeDados,
  setDisponibilidadeDados,
  mentoriaSuporte,
  setMentoriaSuporte,
  visitatecnica,
  setVisitaTecnica,
  imageFile,
  setImageFile,
  recursosDisponiveis,
  setRecursosDisponiveis,
  
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);  
    return(
    <>
    <div className="flex flex-col gap-6 justify-center">
        <div>
              <label className="block text-base font-medium mb-2">Disponibilidade de Dados</label>
              <div className="flex gap-4">
                {["Sim", "Não"].map((opcao) => (
                  <label key={opcao} className="flex items-center gap-2">
                    <input
                      type="radio"
                      id={`disponibilidade-${opcao}`}
                      name="disponibilidadeDados"
                      value={opcao}
                      checked={disponibilidadeDados === opcao}
                      onChange={(e) => setDisponibilidadeDados(e.target.value)}
                      className="cursor-pointer"
                    />
                    {opcao}
                  </label>
                ))}
              </div>
        </div>
        <div className="mb-4">
          <label className="block text-base font-medium  mb-2">Recursos Disponíveis</label>
          <div className="flex flex-col md:flex-row gap-3">
            {["Materiais", "Infraestrutura", "Banco de Dados"].map((recurso) => (
              <label key={recurso}>
                <input
                  type="checkbox"
                  value={recurso}
                  checked={recursosDisponiveis.includes(recurso)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setRecursosDisponiveis([...recursosDisponiveis, recurso]);
                    } else {
                      setRecursosDisponiveis(recursosDisponiveis.filter((r) => r !== recurso));
                    }
                  }}
                />{" "}
                {recurso}
              </label>
            ))}
          </div>
        </div>
    </div>
  
        {[
          { label: "Mentoria e Suporte", name: "mentoriaSuporte", value: mentoriaSuporte, setter: setMentoriaSuporte },
          { label: "Visita Técnica", name: "visitaTecnica", value: visitatecnica, setter: setVisitaTecnica },
        ].map(({ label, name, value, setter }) => (
          <div key={name} className="mb-4">
            <label className="block text-base font-medium mb-2">{label}</label>
            <div className="flex gap-4">
              {[
                { text: "Sim", boolValue: true },
                { text: "Não", boolValue: false },
              ].map(({ text, boolValue }) => (
                <label key={text}>
                  <input
                    type="radio"
                    name={name}
                    value={String(boolValue)}
                    checked={value === boolValue}
                    onChange={() => setter(boolValue)}
                  />{" "}
                  {text}
                </label>
              ))}
            </div>
          </div>
        ))}

      <div className="flex justify-center items-center">
        <div className="flex items-center gap-2 bg-[#64748B] p-2 text-white rounded-md mr-auto">
          <label htmlFor="imageFile" className="flex items-center gap-2 text-base font-medium cursor-pointer">
            <MdOutlineFileUpload className="text-2xl" />
                Imagem da Logo ou imagem do projeto
          </label>
          <input
            type="file"
            id="imageFile"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) =>
              setImageFile(e.target.files ? e.target.files[0] : null)
            } />
          </div>
      </div>
    </>
    )
  };