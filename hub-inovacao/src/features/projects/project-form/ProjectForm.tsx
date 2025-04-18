import { AddTeam } from "@/features/projects/project-form/steps/AddTeam"
import { Finalizado } from "@/features/projects/project-form/steps/Finalizado"
import { ProjectDetails } from "@/features/projects/project-form/steps/ProjectDetails"
import { ProjectIdentify } from "@/features/projects/project-form/steps/ProjectIdentify"
import { CheckMark } from "../../../components/Form/CheckMark"


type Props = {
  step: number,
  setStep: (step: number) => void
}

export const ProjectForm = ({ step, setStep }: Props) => {

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