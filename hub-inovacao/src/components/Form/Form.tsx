import { AddTeam } from "@/features/cadastro_projeto/steps/AddTeam"
import { Feedbacks } from "@/features/cadastro_projeto/steps/Feedbacks"
import { ProjectIdentify } from "@/features/cadastro_projeto/steps/ProjectIdentify"
import { CheckMark } from "./CheckMark"
import { ProjectDetails } from "@/features/cadastro_projeto/steps/ProjectDetails"
import { Finalizado } from "@/features/cadastro_projeto/steps/Finalizado"

type Props = {
  step: number,
  setStep: (step: number) => void
}

export const Form = ({ step, setStep }: Props) => {

  const showStep = (step: number) => {
    switch(step){
      case 1:
        return <ProjectIdentify setStep={setStep}/>
      case 2:
        return <AddTeam setStep={setStep}/>
      case 3:
        return <ProjectDetails setStep={setStep} />
      case 4:
        return <Finalizado setStep={setStep}/>
    }
  }

  return(
    <div className="mt-6">
      
      <div className="flex flex-col">
        <CheckMark step={step}/>
        {showStep(step)}
      </div>
    </div>
  )
}