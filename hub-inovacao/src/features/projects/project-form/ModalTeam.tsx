import { Input } from "@/components/Form/Input";
import { useState } from "react";
import { Coauthor } from "../project.interface";
import { ButtonGrande } from "@/components/Button";
import MaskedInput from "react-text-mask";

type Props = {
  setClose: (a: boolean) => void;
  addMember: (member: Coauthor) => void;
};

export const ModalTeam = ({ setClose, addMember }: Props) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const phoneRegex = /^\(\d{2}\)\s?\d\s?\d{4}-\d{4}$/;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    setIsPhoneValid(phoneRegex.test(value));
  };

  const createCard = () => {
    if (!isPhoneValid || phone.trim() === '') {
      alert("Por favor, insira um telefone válido.");
      return;
    }

    const newMember: Coauthor = {
      name,
      email,
      phone,
      position,
      enabled: true,
    };

    addMember(newMember);
    setClose(false);

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

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Telefone <span className="text-red-500">*</span>
          </label>
          <MaskedInput
            mask={[
              "(", /\d/, /\d/, ")", " ", 
              /\d/, " ", 
              /\d/, /\d/, /\d/, /\d/, "-", 
              /\d/, /\d/, /\d/, /\d/
            ]}
            value={phone}
            onChange={handlePhoneChange}
            className={`w-full px-4 py-2 border rounded-lg ${isPhoneValid ? 'border-gray-300' : 'border-red-500'}`}
            placeholder="(11) 9 1234-5678"
          />
          {!isPhoneValid && (
            <span className="text-red-500 text-sm">
              Telefone inválido. Ex: (11) 9 1234-5678
            </span>
          )}
        </div>

        <Input
          label="Posição"
          onChange={(e) => setPosition(e.target.value)}
          value={position}
        />

        <ButtonGrande text="Criar" onClick={createCard} />

        <div
          className="text-2xl absolute top-2 right-2 cursor-pointer"
          onClick={() => setClose(false)}
        >
          X
        </div>
      </div>
    </div>
  );
};
