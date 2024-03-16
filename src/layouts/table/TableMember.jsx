import {useOutletContext} from "react-router-dom";
import TableMemberList from "../../components/table/TableMemberList.jsx";

export default function TableMember(){
    const { data, update } = useOutletContext()
    const { workspace, table } = data
    return (
        <>
            <TableMemberList table={table} workspace={workspace} update={update}/>
        </>
    )
}