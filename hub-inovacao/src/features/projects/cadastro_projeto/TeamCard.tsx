import { Coauthor } from "./ProjectInterface"
import { FaUser } from "react-icons/fa";

export const TeamCard = ({data}: {data: Coauthor}) => {
    return(
        <div className="border border-gray-300 rounded-md p-4 flex flex-col gap-4 justify-center items-center">
            <div className="bg-gray-500 text-gray-300 w-16 h-16 rounded-full flex justify-center items-center text-2xl">
                <FaUser />
            </div>

            <p className="text-center font-bold">{data.name}</p>
            <p>{data.email}</p>
            <p>{data.phone}</p>
            <p className="capitalize">{data.position}</p>
        </div>
    )
}