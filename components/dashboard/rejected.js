import { BsSignStopFill } from "react-icons/bs";

export default function Rejected () {
    return (
        <div className="flex items-center m-12 p-3 flex-row justify-center">
            <div>
                <BsSignStopFill className="text-red-500 w-[50px] h-[50px] text-xl" />
            </div>
            <div>
                <span className="text-red-500 m-4 ">Nedostatečná oprávnění</span>
            </div>
        </div>
    )
}