import { ButtonOutline, ButtonPequeno } from "../Button"

export const StepperControl = () => {
    return(
        <div className="container flex justify-around mt-4 mb-8">
            <ButtonOutline text="voltar"/>
            <ButtonPequeno text="próximo"/>
        </div>
    )
}