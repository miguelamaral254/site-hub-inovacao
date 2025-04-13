import { BiTrash } from "react-icons/bi";
import { Coauthor } from "../project.interface"
import { FaUser } from "react-icons/fa";

type Props = {
    data: Coauthor,
    setData: React.Dispatch<React.SetStateAction<Coauthor[]>>
}

export const TeamCard = ({data, setData}: Props) => {

    const handleDelete = () => {
        setData(prev => prev.filter(coauthor => coauthor.email !== data.email));
    };

    return(
        <div className="border border-gray-300 rounded-md p-4 flex flex-col gap-4 justify-center items-center relative group overflow-x-hidden">
            <div className="bg-gray-500 text-gray-300 w-16 h-16 rounded-full flex justify-center items-center text-2xl">
                <FaUser />
            </div>

            <p className="text-center font-bold">{data.name}</p>
            <p>{data.email}</p>
            <p>{data.phone}</p>
            <p className="capitalize">{data.position}</p>

            <button
                onClick={handleDelete}
                className="cursor-pointer absolute -right-10 top-4 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 group-hover:right-4 transition-all"
                title="Remover coautor"
            >
                <BiTrash />
            </button>
        </div>
    )
}