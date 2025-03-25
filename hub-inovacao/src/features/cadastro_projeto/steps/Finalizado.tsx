export const Finalizado = ({ formData }: { formData: any }) => {
    const handleSubmit = async () => {
        console.log(formData)
    };

    return (
        <div className="flex flex-col gap-6">
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white p-3 rounded-md"
            >
                Enviar Formulário
            </button>
        </div>
    );
};
