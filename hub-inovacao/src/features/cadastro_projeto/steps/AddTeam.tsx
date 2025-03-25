import { ModalTeam } from "../ModalTeam";
import { useState, useEffect } from "react";
import { Coauthor } from "../ProjectInterface";
import { TeamCard } from "../TeamCard";

type Props = {
    formData: any;
    setFormData: (data: any) => void;
};

export const AddTeam = ({ formData, setFormData }: Props) => {
    const [openModal, setOpenModal] = useState(false);
    const [team, setTeam] = useState<Coauthor[]>(formData.coautores || []);

    useEffect(() => {
        setFormData({ ...formData, coautores: team });
    }, [team]);

    const addTeamMember = (member: Coauthor) => {
        setTeam(prevTeam => [...prevTeam, member]);
    };

    return (
        <div className="flex items-center flex-col justify-center my-10">
            <div className="w-full grid grid-cols-3 gap-4 mb-3">
                {team.map((item, index) => (
                    <TeamCard key={index} data={item} />
                ))}
            </div>

            {!openModal && (
                <button
                    className="flex bg-blue-500 w-12 h-12 justify-center items-center rounded-full text-white text-2xl hover:opacity-65 transition"
                    onClick={() => setOpenModal(true)}
                >
                    +
                </button>
            )}

            {openModal && <ModalTeam setClose={setOpenModal} addMember={addTeamMember} />}
        </div>
    );
};
