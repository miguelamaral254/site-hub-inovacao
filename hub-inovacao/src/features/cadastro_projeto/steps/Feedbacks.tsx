import { Input } from "@/components/Form/Input";

type Props = {
    formData: any;
    setFormData: (data: any) => void;
};

export const Feedbacks = ({ formData, setFormData }: Props) => {
    return (
        <form className="flex flex-col gap-6 text-left">
            <Input 
                label="Justificativa do Projeto"
                value={formData.justificativa}
                onChange={(e) => setFormData({ ...formData, justificativa: e.target.value })}
            />

            <Input 
                label="Feedback"
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
            />

            <Input 
                label="Problema"
                value={formData.problema}
                onChange={(e) => setFormData({ ...formData, problema: e.target.value })}
            />

            <Input 
                label="Objetivos Gerais"
                value={formData.objetivosGerais}
                onChange={(e) => setFormData({ ...formData, objetivosGerais: e.target.value })}
            />

            <Input 
                label="Objetivos Específicos"
                value={formData.objetivosEspecificos}
                onChange={(e) => setFormData({ ...formData, objetivosEspecificos: e.target.value })}
            />

            <Input 
                label="Resultados Esperados"
                value={formData.resultadosEsperados}
                onChange={(e) => setFormData({ ...formData, resultadosEsperados: e.target.value })}
            />
        </form>
    );
};
