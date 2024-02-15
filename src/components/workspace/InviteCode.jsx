import {useQuery} from "@tanstack/react-query";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useState} from "react";

export default function InviteCode({ workspaceId }){
    const authAxiosRequest = useAuthAxiosRequest()
    const [inviteUrl, setInviteUrl] = useState(null)
    const {data, isPending, isError} = useQuery({
        queryKey: ["invite-code", workspaceId],
        queryFn: () => {
            return authAxiosRequest
                .get(`/workspaces/${workspaceId}/invitations`)
                .then(res => {
                    setInviteUrl(getUrl(res.data))
                    return res.data
                })
                .catch(error => {
                    if (error.response.status === 404){
                        setInviteUrl(null)
                    }
                    return error
                })
        }
    })

    const getUrl = (invite) => {
        const href = window.location.href
        const path = href.slice(0, href.lastIndexOf("/"))
        return `${path}/invitations/${invite?.inviteCode}`
    }

    const inviteCodeHandler = () => {
        if (inviteUrl == null){
            authAxiosRequest
                .post(`/workspaces/${workspaceId}/invitations`, { role: "OBSERVER" })
                .then(res => {
                    const url = getUrl(res.data)
                    navigator.clipboard
                        .writeText(url)
                        .then(() => {
                            setInviteUrl(url)
                        })
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            navigator.clipboard.writeText(inviteUrl).then(() => {})
        }
    }

    const deleteInviteCode = () => {
        authAxiosRequest
            .delete(`/workspaces/${workspaceId}/invitations`)
            .then(() => {
                setInviteUrl(null)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <h3 className="font-bold text-lg">
                Mời bằng liên kết
            </h3>
            <div className="flex justify-between items-center">
                {
                    inviteUrl == null ?
                        <div className="w-5 h-5 bg-inherit">

                        </div> :
                        <button
                            className="text-sm hover:text-error px-2 py-1 rounded-md"
                            onClick={deleteInviteCode}
                        >
                            Tắt liên kết mời
                        </button>
                }
                <button
                    className="text-sm hover:text-primary px-2 py-1 rounded-md"
                    onClick={inviteCodeHandler}
                >
                    <i className="fa-solid fa-link mr-1"></i>
                    Mời bằng liên kết
                </button>
            </div>
        </>
    )
}