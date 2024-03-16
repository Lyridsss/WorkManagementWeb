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
            className={`w-full h-full`}
            style={{
                backgroundImage: `url("${table?.background}")`,
                backgroundColor: "#f9fafb",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}
        >

        </div>
    )
}