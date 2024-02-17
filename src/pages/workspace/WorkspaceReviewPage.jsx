import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthenticationContext.jsx";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";

export default function WorkspaceReviewPage(){
    const { token } = useContext(AuthContext)
    const { workspaceId, inviteCodeId } = useParams()
    const authAxiosRequest = useAuthAxiosRequest()
    const navigate = useNavigate()
    const [error, setError] = useState({
        isError: false,
        message: ""
    })

    const { data, isPending } = useQuery({
        queryKey: ["workspace-review", workspaceId, inviteCodeId],
        queryFn: () => {
            return authAxiosRequest
                .get(`/workspaces/${workspaceId}/invitations/${inviteCodeId}`)
                .then(res => {
                    setError({
                        isError: false,
                        message: ""
                    })
                    return res.data
                })
                .catch(error => {
                    setError({
                        isError: true,
                        message: error.response?.data.message
                    })
                    return null
                })
        }
    })

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

    const takePartInWorkspace = () => {
        authAxiosRequest
            .post(`/workspaces/${workspaceId}/invitations/${inviteCodeId}`)
            .then(() => {
                navigate(`/workspaces/${workspaceId}`)
            })
            .catch(error => {
                setError({
                    isError: true,
                    message: error.response?.data.message
                })
            })
    }

    return (
        <>
            {token == null ?
                <Navigate to="/login" replace/> :
                <>
                    {error.isError ?
                        <div className="w-full h-screen flex justify-center items-center px-4">
                            <div className="flex flex-col items-center">
                                <h1 className="text-lg text-error">
                                    {error.message}
                                </h1>
                                <Link
                                    to="/workspaces"
                                    className="btn btn-primary my-3 max-w-32"
                                >
                                    Trang chủ
                                </Link>
                            </div>
                        </div> :
                        <div className="w-full h-screen flex justify-center items-center">
                            <div className="w-10/12 max-w-lg bg-base-200 flex flex-col rounded-md p-4">
                                <div className="flex justify-center items-center">
                                    <h1 className="font-bold text-lg md:text-xl">
                                        THAM GIA KHÔNG GIAN LÀM VIỆC
                                    </h1>
                                </div>
                                <div className="w-full flex justify-center items-center mt-3">
                                    <>
                                        {
                                            data?.background == null ?
                                                <div className="avatar placeholder">
                                                    <div className="bg-info text-base-100 w-24 rounded-md">
                                                        <span className="text-3xl">
                                                            {data?.name[0]}
                                                        </span>
                                                    </div>
                                                </div> :
                                                <div className="avatar">
                                                    <div className="w-24 rounded-md">
                                                        <img
                                                            alt="Background"
                                                            src={data?.background}
                                                        />
                                                    </div>
                                                </div>
                                        }
                                        <div className="ml-2">
                                            <h2 className="text-lg font-bold">
                                                {data?.name}
                                            </h2>
                                            <h3 className="text-[16xp]">
                                                {data?.description}
                                            </h3>
                                            <div className="text-[16px]">
                                                <span className="font-bold mr-1">
                                                    Vai trò:
                                                </span>
                                                <span className="text-primary">
                                                    {roleConverter(data?.role)}
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                </div>
                                <div className="w-full flex justify-center items-center mt-4">
                                    <button
                                        className="btn btn-primary"
                                        onClick={takePartInWorkspace}
                                    >
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </>
            }
        </>
    )
}