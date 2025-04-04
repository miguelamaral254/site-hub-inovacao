import { AddTeam } from "@/features/projects/cadastro_projeto/steps/AddTeam"
import { Finalizado } from "@/features/projects/cadastro_projeto/steps/Finalizado"
import { ProjectDetails } from "@/features/projects/cadastro_projeto/steps/ProjectDetails"
import { ProjectIdentify } from "@/features/projects/cadastro_projeto/steps/ProjectIdentify"
import { CheckMark } from "./CheckMark"


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