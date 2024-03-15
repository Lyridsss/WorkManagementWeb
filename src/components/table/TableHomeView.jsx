import {useOutletContext} from "react-router-dom";
import TableStar from "./TableStar.jsx";
import TableScope from "./TableScope.jsx";
import JoiningTable from "./JoiningTable.jsx";
import TableDrawer from "./TableDrawer.jsx";

export default function TableHomeView(){
    const { data, update } = useOutletContext()
    const { workspace, table } = data
    return (
        <div
            className="w-full flex flex-col min-h-screen"
            style={{
                backgroundImage: `url("${table?.background}")`,
                backgroundColor: "#f9fafb",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}
        >
            <div className="w-full min-h-18 flex flex-row justify-between items-center py-2 bg-base-300 bg-opacity-60">
                <div className="flex flex-row justify-start items-center sm:ml-6">
                    <h1 className="text-2xl font-bold">
                        {table?.name}
                    </h1>
                    <TableStar
                        tableId={table?.id}
                    />
                    <TableScope table={table} update={update}/>
                </div>
                <div className="flex flex-row justify-end items-center sm:mr-6">
                    <JoiningTable table={table} update={update} workspace={workspace}/>
                    <TableDrawer table={table} />
                </div>
            </div>
        </div>
    )
}