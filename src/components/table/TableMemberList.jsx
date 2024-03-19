import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";
import MembersInWorkspaceButNotInTable from "./MembersInWorkspaceButNotInTable.jsx";
import TableMembers from "./TableMembers.jsx";
import {useState} from "react";

export default function TableMemberList({ workspace, table, update }){
    const authAxiosRequest = useAuthAxiosRequest()
    const tableId = table?.id
    const [times, setTimes] = useState(0)
    const { data, isPending, isError } = useQuery({
        queryKey: ["table-member-list", tableId, times],
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
                {isPending ?
                    <div className="w-full">
                        <div className="w-full flex justify-between px-6">
                            <div className="flex items-center">
                                <div className="skeleton w-10 h-10 rounded-full"></div>
                                <div className="flex flex-col ml-2">
                                    <div className="skeleton h-4 w-32"></div>
                                    <div className="skeleton h-4 w-28 mt-2"></div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="skeleton h-8 w-[115px] rounded-md"></div>
                                <div className="skeleton h-8 w-20 rounded-md ml-2"></div>
                            </div>
                        </div>
                    </div> :
                    <TableMembers table={table} members={data} updateTable={update} updateMemberList={() => setTimes(prevState => prevState + 1)}/>
                }
            </div>
        </div>
    )
}