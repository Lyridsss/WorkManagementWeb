import {Link, useLoaderData, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import MemberList from "../../components/workspace/MemberList.jsx";
import Input from "../../components/utils/Input.jsx";
import Select from "../../components/utils/Select.jsx";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import InviteCode from "../../components/workspace/InviteCode.jsx";

export default function WorkspaceMemberLayout(){
    const [data, isPending, isError, update] = useOutletContext()
    const [times, setTimes] = useState(0)
    const account = useLoaderData()
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("OBSERVER")
    const [error, setError] = useState(null)
    const authAxiosRequest = useAuthAxiosRequest()

    // Thêm hiệu ứng copy cho tạo liên kết

    const isErrorEmail = () => {
        const emailRegEx = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
        if (error){
            return error
        }
        if (emailRegEx.test(email)){
            return null
        }
        return "Email không hợp lệ"
    }

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

    const emailHandler = (email) => {
        setEmail(email)
        setError(null)
    }

    const inviteMemberByEmail = () => {
        const memberData = {
            email,
            role
        }
        authAxiosRequest
            .post(`/workspaces/${data?.id}/members`, memberData)
            .then(() => {
                document.getElementById("close-add-member-to-workspace-modal").click()
                setEmail("")
                setTimes(prevState => prevState + 1)
            })
            .catch(e => {
                setError(e.response?.data.message)
            })
    }

    return (
        <>
            {
                isPending ?
                    <div className="w-full flex flex-col">
                        <div className="w-full flex items-center">
                            <div className="skeleton w-16 h-16 mr-2"></div>
                            <div className="skeleton h-6 w-32"></div>
                        </div>
                    </div> :
                    <div
                        className="w-full flex flex-col"
                    >
                        <div className="w-full flex items-start py-2 border-b border-stone-300">
                            {
                                data?.background == null ?
                                    <div className="avatar placeholder mr-2">
                                        <div
                                            className="bg-info text-base-100 w-16 rounded-md"
                                        >
                                            <span className="text-3xl">
                                                {data?.name[0]}
                                            </span>
                                        </div>
                                    </div> :
                                    <div className="avatar mr-2">
                                        <div className="w-16 rounded-md">
                                            <img
                                                alt="workspace-background"
                                                src={data?.background}
                                            />
                                        </div>
                                    </div>
                            }
                            <div className="flex flex-col mx-2">
                                <Link
                                    to={`/workspaces/${data?.id}`}
                                    className="text-2xl font-bold"
                                >
                                    {data?.name}
                                </Link>
                                <p className="my-0.5 text-sm">
                                    {data?.description}
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex flex-col mt-2">
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex items-center font-bold">
                                    <i className="fa-solid fa-list text-lg"></i>
                                    <p className="text-lg ml-1">
                                        Thành viên
                                    </p>
                                </div>
                                {data?.role === "ADMIN" &&
                                    <button
                                        className="p-2 rounded-full hover:text-primary hover:cursor-pointer"
                                        onClick={() =>
                                            document.getElementById('add-member-to-workspace-modal').showModal()
                                        }
                                    >
                                        <i className="fa-solid fa-user-plus"></i>
                                    </button>
                                }
                                <dialog
                                    id="add-member-to-workspace-modal"
                                    className="modal"
                                >
                                    <div className="modal-box w-11/12 max-w-lg">
                                        <div className="flex flex-col">
                                            <h3 className="font-bold text-lg">
                                                Mời vào không gian làm việc
                                            </h3>
                                            <div className="flex items-start justify-between">
                                                <Input
                                                    placeholder="Địa chỉ email ..."
                                                    value={email}
                                                    setValue={emailHandler}
                                                    error={isErrorEmail()}
                                                    type="text"
                                                />
                                                <select
                                                    className="ml-3 mt-8 flex items-center"
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
                                            <div className="w-full flex justify-end mt-2">
                                                <button className="btn btn-primary"
                                                        onClick={inviteMemberByEmail}
                                                        disabled={isErrorEmail() != null}
                                                >
                                                    Gửi lời mời
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col mt-2">
                                            <InviteCode workspaceId={data?.id}/>
                                        </div>
                                    </div>
                                    <form method="dialog" className="modal-backdrop">
                                        <button
                                            id="close-add-member-to-workspace-modal"
                                        >
                                            Đóng
                                        </button>
                                    </form>
                                </dialog>
                            </div>
                            {data?.role === "ADMIN" &&
                                <div className="w-full flex">
                                    <p>
                                    <span className="font-bold mr-2 text-error">
                                        Lưu ý:
                                    </span>
                                        Để tránh việc mất kiểm soát đối với không gian làm việc. Bạn sẽ không thể rời
                                        khỏi
                                        hay cập nhật lại quyền cho bản thân
                                        nếu bạn là quản trị viên duy nhất của không gian làm việc.
                                    </p>
                                </div>
                            }
                            <div className="w-full flex mt-2">
                                <MemberList
                                    workspace={data}
                                    updateMemberList={times}
                                    setUpdateMemberList={setTimes}
                                    account={account}
                                    updateWorkspaceFunc={update}
                                    roleConverter={roleConverter}
                                    roleList={roleList}
                                />
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}