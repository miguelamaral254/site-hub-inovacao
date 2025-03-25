import { Input } from "@/components/Form/Input";
import { Select } from "@/components/Form/Select";

type Props = {
    formData: any;
    setFormData: (data: any) => void;
    errors: any,
    setErrors: any
};

export const ProjectDetails = ({ formData, setFormData, errors, setErrors }: Props) => {
    const typeOption = ['EXTENSÃO', "INTEGRADOR"];
    const themeOption = ["Educação", "Saúde", "Administração", "Logística"];
    const cursoOption = ["Análise e Sistemas de computação", "Sistema de Internet", "Técnico em Servidor"];

    return (
        <form className="px-10">
            <Input
                label="Título do projeto"
                value={formData.tituloProjeto}
                onChange={(e) => setFormData({ ...formData, tituloProjeto: e.target.value })}
                errors={errors.tituloProjeto}
            />

            <div className="flex mt-6 gap-4">
                <Select 
                    options={typeOption} 
                    label="Tipo de Projeto"
                    value={formData.tipoProjeto}
                    onChange={(value) => setFormData({ ...formData, tipoProjeto: value })}
                />

                <Select 
                    options={themeOption} 
                    label="Área temática"
                    value={formData.areaTematica}
                    onChange={(value) => setFormData({ ...formData, areaTematica: value })}
                />

                <Select 
                    options={cursoOption} 
                    label="Curso"
                    value={formData.curso}
                    onChange={(value) => setFormData({ ...formData, curso: value })}
                />
            </div>
        </form>
    );
};
