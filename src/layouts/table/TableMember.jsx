import {useLoaderData, useOutletContext} from "react-router-dom";
import TableMemberList from "../../components/table/TableMemberList.jsx";

export default function TableMember(){
    const { data, update } = useOutletContext()
    const { workspace, table } = data
    const account = useLoaderData()

    return (
        <>
            <TableMemberList table={table} workspace={workspace} update={update} account={account}/>
        </>
    )
}