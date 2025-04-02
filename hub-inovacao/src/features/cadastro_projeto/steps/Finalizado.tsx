import { useContext } from "react";
import { multiStepContext } from "../StepContext";
import { ConfireAnswer } from "../ConfireAnswer";
import { ButtonGrande, ButtonGrandeSeg } from "@/components/Button";

type Props = {
    setStep: (step: number) => void
}

export const Finalizado = ({ setStep }: Props) => {
    const handleSubmit = async () => {
        console.log(formData)
    };

    const {formData} = useContext(multiStepContext)

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
