import { useContext } from "react";
import { multiStepContext } from "./StepContext";

export const ConfireAnswer = () => {

    const {formData} = useContext(multiStepContext)

    return(
        <div className="px-10 flex flex-col md:flex-row justify-between gap-6">
            <div className="w-full flex flex-col gap-4">
                <div >
                    <h4>Título</h4>
                    <div className="border p-2 opacity-50">
                        {formData.title}
                    </div>
                </div>
                <div>
                    <h4>Tipo de Projeto</h4>
                    <div className="border p-2 opacity-50">
                        {formData.projectType}
                    </div>
                </div>
                <div>
                    <h4>Área temâtica</h4>
                    <div className="border p-2 opacity-50">
                        {formData.thematicArea}
                    </div>
                </div>
                <div>
                    <h4>Curso</h4>
                    <div className="border p-2 opacity-50">
                        {formData.course}
                    </div>
                </div>
                <div>
                    <h4>Justificativa</h4>
                    <div className="border p-2 opacity-50">
                        {formData.justification}
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4">
                <div>
                    <h4>Problemas</h4>
                    <div className="border p-2 opacity-50">
                        {formData.problem}
                    </div>
                </div>
                <div>
                    <h4>Objetivo Geral</h4>
                    <div className="border p-2 opacity-50">
                        {formData.generalObjective}
                    </div>
                </div>
                <div>
                    <h4>Objetivo especifico</h4>
                    <div className="border p-2 opacity-50">
                        {formData.specificObjective}
                    </div>
                </div>
                <div>
                    <h4>Resultados Esperados</h4>
                    <div className="border p-2 opacity-50">
                        {formData.expectedResults}
                    </div>
                </div>
            </div>
        </div>
    )
}