import { Input } from "@/components/Form/Input";
import { useState } from "react";
import { Coauthor } from "../project.interface";
import { ButtonGrande } from "@/components/Button";

type Props = {
    setClose: (a: boolean) => void;
    addMember: (member: Coauthor) => void; // Adiciona a função para enviar os dados ao pai
};

export const ModalTeam = ({ setClose, addMember }: Props) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [position, setPosition] = useState<string>('');

    const createCard = () => {
        // Criar um objeto com os dados preenchidos
        const newMember: Coauthor = { name, email, phone, position, enabled: true };
        
        // Enviar o novo membro para o componente pai
        addMember(newMember);
        
        // Fechar o modal
        setClose(false);

        // Limpar os campos (opcional)
        setName('');
        setEmail('');
        setPhone('');
        setPosition('');
    };

    return (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white px-16 py-10 rounded-md flex flex-col gap-6 relative shadow-lg">
                <Input 
                    label="Nome"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <Input 
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Input 
                    label="Telefone"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                />
                <Input 
                    label="Posição"
                    onChange={(e) => setPosition(e.target.value)}
                    value={position}
                />

                <ButtonGrande text="Criar" onClick={createCard} />

                <div 
                    className="text-2xl absolute top-2 right-2 cursor-pointer"
                    onClick={() => setClose(false)}
                >X</div>
            </div>
        </div>
    );
};
