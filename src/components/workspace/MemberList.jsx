import {useQuery} from "@tanstack/react-query";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useState} from "react";

export default function MemberList({ updateMemberList, setUpdateMemberList, workspace, account, updateWorkspaceFunc }){
    const authAxiosRequest = useAuthAxiosRequest()
    const [isUpdate, setIsUpdate] = useState(false)
    const { data, isPending, isError } = useQuery({
        queryKey: ["workspace-member-list", updateMemberList],
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

    return (
        <div className="w-full flex flex-col p-4 bg-base-200 rounded-md">
            {
                isPending ?
                    <div>
                        Loading...
                    </div> :
                    <>
                        <div className="w-full flex justify-between my-1.5">
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
                            <div className="flex items-center">
                                {
                                    workspace?.role === "ADMIN" ?
                                        <>
                                            <button
                                                className="btn btn-primary w-[93px]"
                                                disabled={!isUpdate}
                                            >
                                                {workspace.role}
                                            </button>
                                            <button
                                                disabled={!isUpdate}
                                                className="btn btn-error text-base-200 hover:text-base-100 w-[85px] ml-2"
                                            >
                                                Rời đi
                                            </button>
                                        </> :
                                        <>
                                            <button
                                                className="btn btn-primary w-[93px]"
                                                disabled={true}
                                            >
                                                {workspace.role}
                                            </button>
                                            <button
                                                className="btn btn-error text-base-200 hover:text-base-100 w-[85px] ml-2"
                                            >
                                                Rời đi
                                            </button>
                                        </>
                                }
                            </div>
                        </div>
                        {
                            data?.filter(member => member.id !== account?.id).map(member =>
                                <div
                                    className="w-full flex justify-between my-1.5"
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
                                    <div className="flex items-center">
                                        {
                                            workspace?.role === "ADMIN" ?
                                                <>
                                                    <button
                                                        className="btn btn-primary px-3 w-[93px]"
                                                    >
                                                        {member.role}
                                                    </button>
                                                    <button
                                                        className="btn btn-error text-base-200 hover:text-base-100 ml-2 w-[85px]"
                                                    >
                                                        Loại bỏ
                                                    </button>
                                                </> :
                                                <>
                                                    <button
                                                        className="btn btn-primary w-[93px]"
                                                        disabled={true}
                                                    >
                                                        {member.role}
                                                    </button>
                                                    <button
                                                        disabled={true}
                                                        className="btn btn-error text-base-200 hover:text-base-100 w-[85px] ml-2 disabled:bg-inherit"
                                                    >
                                                    </button>
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