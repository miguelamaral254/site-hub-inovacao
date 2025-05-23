import { useContext } from "react";
import { multiStepContext } from "../StepContext";
import { ConfireAnswer } from "../ConfireAnswer";
import { ButtonGrande, ButtonGrandeSeg } from "@/components/Button";
import { useAuth } from "@/context/useContext";
import { createProject } from "../../project.service";
import { Project } from "../../project.interface";
import useSwal from "@/hooks/useSwal";

type Props = {
    setStep: (step: number) => void
}

export const Finalizado = ({ setStep }: Props) => {

    const { user } = useAuth();
    const { showSuccess, showError } = useSwal();


    const handleSubmit = async () => {
        const updatedFormData = { ...formData, idUser: user?.idUser as number, status: "PENDENTE"};
      
        const formDataToSend = new FormData();
        formDataToSend.append(
          "dto",
          new Blob([JSON.stringify(updatedFormData)], {
            type: "application/json",
          })
        );
        console.log("DTO enviado:", updatedFormData);

        if (formData.urlPhoto) {
          const byteString = atob(formData.urlPhoto.split(",")[1]);
          const mimeString = formData.urlPhoto.split(",")[0].split(":")[1].split(";")[0];
      
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
      
          const blob = new Blob([ab], { type: mimeString });
          const file = new File([blob], "imagem_projeto.png", { type: mimeString });
      
          formDataToSend.append("file", file);
        }
      
        try {
          const response = await createProject(formDataToSend);
          console.log(response);
          setFormData({} as Project)
          showSuccess("Projeto cadastrado com sucesso!", "mandou bem demais");
          setStep(1)
        } catch (error) {
          console.error("Erro ao enviar projeto:", error);
          console.log('foi nao pai')
          showError('Erro ao cadastrar projeto!', 'verifique os campos corretamente')
        }
      };
    const {formData, setFormData} = useContext(multiStepContext)

    return (
        <div className="flex flex-col gap-6 px-10 mt-12">
            <ConfireAnswer />

            <div className="flex w-full justify-end mt-10 gap-6">
                <ButtonGrandeSeg text="Voltar" onClick={() => setStep(3)}/>
                <ButtonGrande text="Enviar" onClick={handleSubmit}/>
            </div>
        </div>
    );
};
