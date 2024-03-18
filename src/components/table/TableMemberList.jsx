import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";
import MembersInWorkspaceButNotInTable from "./MembersInWorkspaceButNotInTable.jsx";
import TableMembers from "./TableMembers.jsx";

export default function TableMemberList({ workspace, table, update }){
    const authAxiosRequest = useAuthAxiosRequest()
    const tableId = table?.id
    const { data, isPending, isError } = useQuery({
        queryKey: ["table-member-list", tableId],
        queryFn: () =>
            authAxiosRequest
                .get(`/tables/${tableId}/members`)
                .then(res => res.data)
                .catch(error => error.response?.data)
    })

    return (
        <div className="w-full flex flex-col">
            <div className="flex flex-row justify-between items-center mx-6 my-3">
                <div className="flex justify-start items-center font-bold">
                    <i className="fa-solid fa-list mr-1"></i>
                    <h2 className="text-lg">
                        Danh sách thành viên
                    </h2>
                </div>
                {table?.role === "ADMIN" &&
                    <div className="text-lg font-bold hover:text-primary cursor-pointer">
                        <button
                            onClick={() => document.getElementById('add-member-to-table-model').showModal()}
                        >
                            <i className="fa-solid fa-user-plus"></i>
                        </button>
                    </div>
                }
            </div>
            <dialog id="add-member-to-table-model" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Thêm thành viên</h3>
                    <MembersInWorkspaceButNotInTable table={table} update={update}/>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>
                        close
                    </button>
                </form>
            </dialog>
            <div className="w-full h-full">
                <TableMembers table={table} members={data}/>
            </div>
        </div>
    )
}