import {useQuery} from "@tanstack/react-query";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useWorkspaceListHeaderUpdater} from "../../hooks/WorkspaceListHeader.jsx";

export default function MemberList({ updateMemberList, setUpdateMemberList, workspace, account, updateWorkspaceFunc, roleConverter, roleList }){
    const authAxiosRequest = useAuthAxiosRequest()
    const navigate= useNavigate()
    const [isUpdate, setIsUpdate] = useState(false)
    const [deleteMemberData, setDeleteMemberData] = useState(null)
    const [updateMemberData, setUpdateMemberData] = useState(null)
    const [role, setRole] = useState("OBSERVER")
    const [workspaceListHeaderUpdate, workspaceListHeaderUpdater] = useWorkspaceListHeaderUpdater()
    const { data, isPending, isError } = useQuery({
        queryKey: ["workspace-member-list", updateMemberList, workspace?.id],
        queryFn: () => {
            return authAxiosRequest
                .get(`/workspaces/${workspace?.id}/members`)
                .then(res => {
                    const members = res.data
                    const admins = members.filter(member => member.role === "ADMIN")
                    setIsUpdate(admins.length > 1)
                    return members
                })
                .catch(error => {
                    console.log(error)
                })
        }
    })

    const updateMemberListFunc = () => {
        setUpdateMemberList(prevState => prevState + 1)
    }

    const handleLeaveWorkspace = memberId => {
        authAxiosRequest
            .delete(`/workspaces/${workspace?.id}/members/${memberId}`)
            .then(() => {
                workspaceListHeaderUpdater()
                navigate("/workspaces")
            })
    }

    const handleDeleteMemberFromWorkspace = memberId => {
        authAxiosRequest
            .delete(`/workspaces/${workspace?.id}/members/${memberId}`)
            .then(() => {
                updateMemberListFunc()
            })
    }

    const updateMemberRole = () => {
        authAxiosRequest
            .patch(`/workspaces/${workspace?.id}/members/${updateMemberData?.id}`, {
                role
            })
            .then(() => {
                updateWorkspaceFunc()
            })
            .catch(error => {
                console.log(error)
            })

    }

    return (
        <div className="w-full flex flex-col p-4 bg-base-200 rounded-md">
            {
                isPending ?
                    <div>
                        Loading...
                    </div> :
                    <>
                        <div className="w-full flex justify-between my-2">
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
                                {
                                    workspace?.role === "ADMIN" ?
                                        <>
                                            <button
                                                className="w-[115px] flex justify-center text-primary border border-primary py-1 px-2 rounded-md hover:bg-primary hover:text-base-100 cursor-pointer disabled:border-base-300 disabled:bg-base-300 disabled:text-gray-500 disabled:cursor-no-drop"
                                                disabled={!isUpdate}
                                                onClick={() => {
                                                    setUpdateMemberData({
                                                        id: account?.id,
                                                        name: account?.name,
                                                        email: account?.email,
                                                        avatar: account?.avatar
                                                    })
                                                    setRole(workspace?.role)
                                                    document.getElementById('update-role-member').showModal()
                                                }}
                                            >
                                                {roleConverter(workspace.role)}
                                            </button>
                                            <button
                                                disabled={!isUpdate}
                                                className="w-20 flex justify-center text-error border border-error py-1 px-2 rounded-md hover:bg-error hover:text-base-100 cursor-pointer disabled:border-base-300 disabled:bg-base-300 disabled:text-gray-500 disabled:cursor-no-drop ml-2 mt-2 sm:mt-0"
                                                onClick={() =>
                                                    document.getElementById('leave-workspace').showModal()
                                                }
                                            >
                                                Rời đi
                                            </button>
                                        </> :
                                        <>
                                            <div
                                                className="w-[115px] flex justify-center text-gray-500 bg-base-300 py-1 px-2 rounded-md"
                                            >
                                                {roleConverter(workspace.role)}
                                            </div>
                                            <button
                                                className="w-20 flex justify-center text-error border border-error py-1 px-2 rounded-md hover:bg-error hover:text-base-100 cursor-pointer ml-2 mt-2 sm:mt-0"
                                                onClick={() =>
                                                    document.getElementById('leave-workspace').showModal()
                                                }
                                            >
                                                Rời đi
                                            </button>
                                        </>
                                }
                            </div>
                            <dialog id="leave-workspace" className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">
                                        Rời khỏi không gian làm việc
                                    </h3>
                                    <p>
                                        Bạn sẽ không thể truy cập vào những tài nguyên trong không gian làm việc sau khi
                                        rời khỏi.
                                    </p>
                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    handleLeaveWorkspace(account?.id)
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
                        </div>
                        <dialog id="delete-member-from-workspace" className="modal">
                            <div className="modal-box">
                                <h1 className="font-bold text-lg">
                                    Loại thành viên
                                </h1>
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                handleDeleteMemberFromWorkspace(deleteMemberData?.id)
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
                        <dialog id="update-role-member" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Cập nhật vai trò</h3>
                                <div className="flex justify-between my-4">
                                    <div className="flex items-center">
                                        {
                                            updateMemberData?.avatar == null ?
                                                <div className="avatar placeholder">
                                                    <div
                                                        className="bg-neutral text-neutral-content w-10 rounded-full"
                                                    >
                                                            <span className="text-sm">
                                                                {updateMemberData?.name[0].toUpperCase()}
                                                            </span>
                                                    </div>
                                                </div> :
                                                <div className="avatar">
                                                    <div className="w-10 rounded-full">
                                                        <img alt="Avatar" src={updateMemberData?.avatar}/>
                                                    </div>
                                                </div>
                                        }
                                        <div className="flex flex-col ml-2">
                                            <h3 className="text-sm font-bold">
                                                {updateMemberData?.name}
                                            </h3>
                                            <h4 className="text-sm">
                                                {updateMemberData?.email}
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
                                            onClick={updateMemberRole}
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
                        {
                            data?.filter(member => member.id !== account?.id).map(member =>
                                <div
                                    className="w-full flex justify-between my-2"
                                    key={member.id}
                                >
                                    <div className="flex items-center">
                                        <>
                                            {
                                                member?.avatar == null ?
                                                    <div className="avatar placeholder">
                                                        <div
                                                            className="bg-neutral text-neutral-content w-10 rounded-full"
                                                        >
                                                            <span className="text-sm">
                                                                {member?.name[0].toUpperCase()}
                                                            </span>
                                                        </div>
                                                    </div> :
                                                    <div className="avatar">
                                                        <div className="w-10 rounded-full">
                                                            <img alt="Avatar" src={member?.avatar}/>
                                                        </div>
                                                    </div>
                                            }
                                        </>
                                        <div className="flex flex-col ml-2">
                                            <h3 className="text-sm font-bold">
                                                {member?.name}
                                            </h3>
                                            <h4 className="text-sm">
                                                {member?.email}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center">
                                        {
                                            workspace?.role === "ADMIN" ?
                                                <>
                                                    <button
                                                        className="w-[115px] flex justify-center text-primary border border-primary py-1 px-2 rounded-md hover:bg-primary hover:text-base-100 cursor-pointer"
                                                        onClick={() => {
                                                            setUpdateMemberData({
                                                                id: member.id,
                                                                name: member.name,
                                                                email: member.email,
                                                                avatar: member.avatar
                                                            })
                                                            setRole(member.role)
                                                            document.getElementById('update-role-member').showModal()
                                                        }}
                                                    >
                                                        {roleConverter(member.role)}
                                                    </button>
                                                    <button
                                                        className="w-20 flex justify-center text-error border border-error py-1 px-2 rounded-md hover:bg-error hover:text-base-100 cursor-pointer ml-2 mt-2 sm:mt-0"
                                                        onClick={() => {
                                                            setDeleteMemberData(member)
                                                            document.getElementById('delete-member-from-workspace').showModal()
                                                        }}
                                                    >
                                                        Loại bỏ
                                                    </button>
                                                </> :
                                                <>
                                                    <div
                                                        className="w-[115px] flex justify-center text-gray-500 bg-base-300 py-1 px-2 rounded-md"
                                                    >
                                                        {roleConverter(member.role)}
                                                    </div>
                                                    <div
                                                        className="w-20 h-10 ml-2 hidden sm:flex"
                                                    >
                                                    </div>
                                                </>
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </>
            }
        </div>
    )
}