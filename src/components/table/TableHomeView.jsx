import {useOutletContext} from "react-router-dom";
import TableStar from "./TableStar.jsx";

export default function TableHomeView(){
    const { data, update } = useOutletContext()
    return (
        <div className="w-full flex flex-col" style={{
                backgroundImage: `url("${data?.background}")`,
                backgroundColor: "#f9fafb",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}
        >
            <div className="min-h-18 flex flex-row justify-between items-center px-6 py-2 bg-base-300 bg-opacity-60">
                <div className="flex flex-row justify-start items-center">
                    <h1 className="text-2xl font-bold">
                        {data?.name}
                    </h1>
                    <TableStar
                        tableId={data?.id}
                    />
                </div>
            </div>
        </div>
    )
}