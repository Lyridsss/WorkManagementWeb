import {useQuery} from "@tanstack/react-query";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function TableMembers({ members, table, updateTable, updateMemberList }){
    const authAxiosRequest = useAuthAxiosRequest()
    const { data, isPending, isError } = useQuery({
        queryKey: ["account"],
        queryFn: () => authAxiosRequest
            .get("/account")
            .then(res => res.data)
            .catch(error => error.response?.data)
    })
    const account = members?.at(members?.findIndex(member => member.id === data?.id))
    const others = members?.filter(member => member.id !== data?.id)
    const [updatedMember, setUpdatedMember] = useState(null)
    const [deleteMember, setDeleteMember] = useState(null)
    const [role, setRole] = useState("OBSERVER")
    const navigate = useNavigate()

    const roleList = [
        {
            value: "ADMIN",
            title: "Quản trị viên"
        },
        {
            value: "MEMBER",
            title: "Thành viên"
        },
        {
            value: "OBSERVER",
            title: "Quan sát viên"
        }
    ]

    const roleConverter = (value) => {
        switch (value){
            case "ADMIN":
                return "Quản trị viên"
            case "MEMBER":
                return "Thành viên"
            case "OBSERVER":
                return "Quan sát viên"
        }
    }

    const showUpdateRoleModel = value => {
        setUpdatedMember(value)
        document.getElementById('update-role-member-in-table').showModal()
    }

    const updateRoleInTable = () => {
        const payload = {
            accountId: updatedMember?.id,
            role
        }
        authAxiosRequest
            .patch(`/tables/${table?.id}/members`, payload)
            .then(() => {
                updateTable()
                updateMemberList()
            })
            .catch(error => console.log(error.response?.data))
    }

    const handleDeleteMemberFromTable = memberId => {
        authAxiosRequest
            .delete(`/tables/${table?.id}/members/${memberId}`)
            .then(() => {
                updateMemberList()
            })
            .catch(error => console.log(error.response?.data))
    }

    const handleLeaveTable = (accountId) => {
        authAxiosRequest
            .delete(`/tables/${table?.id}/members/${accountId}`)
            .then(() => {
                navigate(`/workspaces/${table?.workspaceId}`)
            })
            .catch(error => console.log(error.response?.data))
    }

    return (
        <>
            {
                table?.role != null &&
                <div className="w-full flex justify-between items-center px-6">
                    <div className="flex items-center">
                        <>
                            {
                                account?.avatar == null ?
                                    <div className="avatar placeholder">
                                        <div
                                            className="bg-neutral text-neutral-content w-10 rounded-full"
                                        >
                                    <span className="text-sm">
                                        {account?.name[0].toUpperCase()}
                                    </span>
                                        </div>
                                    </div> :
                                    <div className="avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="Avatar" src={account?.avatar}/>
                                        </div>
                                    </div>
                            }
                        </>
                        <div className="flex flex-col ml-2">
                            <h3 className="text-sm font-bold">
                                {account?.name}
                            </h3>
                            <h4 className="text-sm">
                                {account?.email}
                            </h4>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center">
                        {table?.role === "ADMIN" ?
                            <button
                                className="w-[115px] flex justify-center text-primary border border-primary py-1 px-2 rounded-md hover:bg-primary hover:text-base-100 cursor-pointer"
                                onClick={() => showUpdateRoleModel(account)}
                            >
                                {roleConverter(account?.role)}
                            </button> :
                            <div
                                className="w-[115px] flex justify-center text-gray-500 bg-base-300 py-1 px-2 rounded-md">
                                {roleConverter(account?.role)}
                            </div>
                        }
                        <button
                            className="w-20 flex justify-center text-error border border-error py-1 px-2 rounded-md hover:bg-error hover:text-base-100 cursor-pointer ml-2 mt-2 sm:mt-0"
                            onClick={() => {
                                document.getElementById('leave-table').showModal()
                            }}
                        >
                            Rời đi
                        </button>
                    </div>
                </div>
            }
            {others?.map(item =>
                <div
                    className="w-full flex justify-between items-center px-6 mt-3"
                    key={item.id}
                >
                    <div className="flex items-center">
                        <>
                            {
                                item.avatar == null ?
                                    <div className="avatar placeholder">
                                        <div
                                            className="bg-neutral text-neutral-content w-10 rounded-full"
                                        >
                                    <span className="text-sm">
                                        {item.name[0].toUpperCase()}
                                    </span>
                                        </div>
                                    </div> :
                                    <div className="avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="Avatar" src={item.avatar}/>
                                        </div>
                                    </div>
                            }
                        </>
                        <div className="flex flex-col ml-2">
                            <h3 className="text-sm font-bold">
                                {item.name}
                            </h3>
                            <h4 className="text-sm">
                                {item.email}
                            </h4>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center">
                        {table?.role === "ADMIN" ?
                            <>
                                <button
                                    className="w-[115px] flex justify-center text-primary border border-primary py-1 px-2 rounded-md hover:bg-primary hover:text-base-100 cursor-pointer"
                                    onClick={() => showUpdateRoleModel(item)}
                                >
                                    {roleConverter(item.role)}
                                </button>
                                <button
                                    className="w-20 flex justify-center text-error border border-error py-1 px-2 rounded-md hover:bg-error hover:text-base-100 cursor-pointer ml-2 mt-2 sm:mt-0"
                                    onClick={() => {
                                        setDeleteMember(item)
                                        document.getElementById('delete-member-from-table').showModal()
                                    }}
                                >
                                    Loại bỏ
                                </button>
                            </> :
                            <>
                                <div
                                    className="w-[115px] flex justify-center text-gray-500 bg-base-300 py-1 px-2 rounded-md">
                                    {roleConverter(item.role)}
                                </div>
                                <div className="w-20 h-5 ml-2">

                                </div>
                            </>
                        }
                    </div>
                </div>
            )}
            <dialog id="leave-table" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Rời khỏi bảng công việc
                    </h3>
                    <p>
                        Bạn sẽ không thể truy cập vào những tài nguyên trong bảng công việc sau khi
                        rời khỏi.
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    handleLeaveTable(account?.id)
                                }}
                            >
                                Xác nhận
                            </button>
                            <button className="btn btn-error text-base-100 ml-2">
                                Hủy bỏ
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="update-role-member-in-table" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Cập nhật vai trò</h3>
                    <div className="flex justify-between my-4">
                        <div className="flex items-center">
                            {
                                updatedMember?.avatar == null ?
                                    <div className="avatar placeholder">
                                        <div
                                            className="bg-neutral text-neutral-content w-10 rounded-full"
                                        >
                                                            <span className="text-sm">
                                                                {updatedMember?.name[0].toUpperCase()}
                                                            </span>
                                        </div>
                                    </div> :
                                    <div className="avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="Avatar" src={updatedMember?.avatar}/>
                                        </div>
                                    </div>
                            }
                            <div className="flex flex-col ml-2">
                                <h3 className="text-sm font-bold">
                                    {updatedMember?.name}
                                </h3>
                                <h4 className="text-sm">
                                    {updatedMember?.email}
                                </h4>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <select
                                className="flex items-center"
                                value={role}
                                onChange={e => {
                                    setRole(e.target.value)
                                }}
                            >
                                {roleList.map(role =>
                                    <option
                                        key={role.value}
                                        value={role.value}
                                    >
                                        {role.title}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button
                                className="btn btn-primary"
                                onClick={updateRoleInTable}
                            >
                                Xác nhận
                            </button>
                            <button
                                className="btn btn-error text-base-200 ml-2"
                            >
                                Hủy bỏ
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="delete-member-from-table" className="modal">
                <div className="modal-box">
                    <h1 className="font-bold text-lg">
                        Loại thành viên
                    </h1>
                    <div className="modal-action">
                        <form method="dialog">
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    handleDeleteMemberFromTable(deleteMember?.id)
                                }}
                            >
                                Xác nhận
                            </button>
                            <button className="btn btn-error text-base-100 ml-2">
                                Hủy bỏ
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}