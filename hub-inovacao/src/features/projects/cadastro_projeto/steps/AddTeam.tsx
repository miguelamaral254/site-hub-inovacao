/* eslint-disable react-hooks/exhaustive-deps */
import { ModalTeam } from "../ModalTeam";
import { useState, useEffect, useContext } from "react";
import { Coauthor } from "../../project.interface";
import { TeamCard } from "../TeamCard";
import { ButtonGrande, ButtonGrandeSeg } from "@/components/Button";
import { ErrorCard } from "../ErrorCard";
import { multiStepContext } from "../StepContext";

type Props = {
    setStep: (step: number) => void
}

export const AddTeam = ({ setStep }: Props) => {

    const {formData, setFormData} = useContext(multiStepContext)

    const [openModal, setOpenModal] = useState(false);
    const [team, setTeam] = useState<Coauthor[]>(formData.coauthors || []);

    const [error, setError] = useState(false)

    const handleModal = () => {
        setError(false)
        setOpenModal(true)
    }

    const handleNext = () => {
        if(formData.coauthors?.length !== 0){
            setError(false)
            setStep(3)
        } else{
            setError(true)
        }
    }

    useEffect(() => {
        setFormData({ ...formData, coauthors: team });
    }, [team]);

    const addTeamMember = (member: Coauthor) => {
        setTeam(prevTeam => [...prevTeam, member]);
    };

    return (
        <div className="flex items-center flex-col justify-center my-10 px-10">
            <div className="w-full grid grid-cols-3 gap-4 mb-3">
                {team.map((item, index) => (
                    <TeamCard key={index} data={item} />
                ))}
            </div>

            {!openModal && (
                <button
                    className="flex bg-blue-500 w-12 h-12 justify-center items-center rounded-full text-white text-2xl hover:opacity-65 transition"
                    onClick={handleModal}
                >
                    +
                </button>
            )}

            {openModal && <ModalTeam setClose={setOpenModal} addMember={addTeamMember} />}

            <div className="flex w-full justify-end mt-10 gap-6">
                <ButtonGrandeSeg text="Voltar" onClick={() => setStep(1)}/>
                <ButtonGrande text="Avançar" onClick={handleNext}/>
            </div>

            {error === true &&
                <div className="w-full flex justify-end items-end mt-4">
                    <ErrorCard />
                </div>
            }
        </div>
    );
};
