import { useEffect, useRef, useState } from "react"

type Props = {
    steps: string[],
    currentStep: number
}

type step = {
    description: string,
    completed: boolean,
    highlighted: boolean,
    selected: boolean
}

export const Stepper = ({ steps, currentStep }: Props) => {

    const [newStep, setNewStep] = useState()
    const stepRef = useRef<step[] | null>(null)

    const updateStep = (stepNumber: number, steps: step[]) => {

    }


    return(
        <div className="mx-4 p-4 flex justify-between items-center">
            <div className="relative flex flex-col items-center text-teal-600">
                <div className="rounded-full transition duration-500 ease-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3">
                    1
                </div>

                <div className="absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase">
                    Description
                </div>
            </div>

            <div className="flex-auto border-t-2 transition duration-500 ease-in-out">
                
            </div>
        </div>
    )
}