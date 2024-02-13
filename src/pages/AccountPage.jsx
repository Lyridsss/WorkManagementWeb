import Header from "../components/header/Header.jsx";
import {Link, Outlet, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthenticationContext.jsx";
import {useQuery} from "@tanstack/react-query";
import {useAuthAxiosRequest} from "../hooks/Request.jsx";

export default function AccountPage(){
    const [avatar, setAvatar] = useState(null)
    const [times, setTimes] = useState(0)
    const { logout } = useContext(AuthContext)
    const location = useLocation()
    const authAxiosRequest = useAuthAxiosRequest()
    const { isPending, data } = useQuery({
        queryKey: ["user-account-page", times],
        queryFn: () => {
            return authAxiosRequest
                .get("/account")
                .then(res => res.data)
                .catch(error => {
                    if (error.response.status === 401){
                        logout()
                    }
                })
        }
    })
    const contents = [
        {
            id: 1,
            name: "Quản lý hồ sơ",
            url: "/account"
        },
        {
            id: 2,
            name: "Hoạt động",
            url: "/account/activities"
        },
        {
            id: 3,
            name: "Thông báo",
            url: "/account/notifications"
        }
    ]

    const update = () => {
        setTimes(prevState => prevState + 1)
    }

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.url)
        }
    }, [avatar]);

    const uploadImageHandler = (e) => {
        const data = e.target.files[0]
        if (data != null){
            setAvatar(() => {
                return {
                    file: data,
                    url: URL.createObjectURL(data)
                }
            })
        }
    }

    const updateImageHandler = () => {
        const form = new FormData()
        form.append("image", avatar.file)
        authAxiosRequest
            .patch("/account/avatar", form)
            .then(res => {
                URL.revokeObjectURL(avatar.url)
                setAvatar(null)
                update()
            })
            .catch(error => {
                // ???
                console.log(error)
            })
    }

    const deleteImageHandler = () => {
        authAxiosRequest
            .delete("/account/avatar")
            .then(res => {
                update()
            })
            .catch(error => {
                // ???
                console.log(error)
            })
    }

    return (
        <div className="bg-base-100 text-base-content">
            {isPending ?
                <div className="min-h-screen w-full flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>:
                <>
                    <Header
                        data={data}
                        isPending={isPending}
                        update={update}
                    />
                    <div className="w-full flex flex-col justify-center items-center px-4 sm:px-10 py-8">
                        <div className="w-full flex flex-col">
                            <div className="flex items-center p-2.5">
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="flex hover:cursor-pointer">
                                        {data?.avatar == null ?
                                            <div className="avatar placeholder">
                                                <div className="bg-neutral text-neutral-content rounded-full w-20">
                                                    <span className="text-xl">
                                                        {data?.name[0].toUpperCase()}
                                                    </span>
                                                </div>
                                            </div> :
                                            <div className="avatar">
                                                <div
                                                    className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                    <img
                                                        alt="Avatar"
                                                        src={data?.avatar}/>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <ul tabIndex={0}
                                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                                        <li className="hover:text-primary">
                                            <button
                                                onClick={() => document.getElementById('upload-avatar').showModal()}
                                            >
                                                Cập nhật
                                            </button>
                                        </li>
                                        {
                                            data?.avatar != null &&
                                            <li className="hover:text-error">
                                                <button onClick={deleteImageHandler}>
                                                    Xóa ảnh
                                                </button>
                                            </li>
                                        }
                                    </ul>
                                    <dialog id="upload-avatar" className="modal">
                                        <div className="modal-box">
                                            <label htmlFor="upload-image-input"
                                                   className="flex flex-col justify-center items-center hover:cursor-pointer">
                                                {
                                                    avatar == null ?
                                                        <div className="avatar placeholder">
                                                            <div
                                                                className="bg-neutral text-neutral-content rounded-full w-32">
                                                                <span className="text-3xl">
                                                                    <i className="fa-solid fa-upload"></i>
                                                                </span>
                                                            </div>
                                                        </div> :
                                                        <div className="avatar">
                                                            <div
                                                                className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                                <img
                                                                    alt="Avatar"
                                                                    src={avatar.url}/>
                                                            </div>
                                                        </div>
                                                }
                                                <input
                                                    id="upload-image-input"
                                                    accept="image/*"
                                                    type="file"
                                                    onChange={e => {
                                                        uploadImageHandler(e)
                                                    }}
                                                    hidden
                                                />
                                                <span className="my-2 text-sm">
                                                    Tải hình ảnh
                                                </span>
                                            </label>
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    <button
                                                        className="btn hover:btn-primary mr-2"
                                                        disabled={avatar == null}
                                                        onClick={updateImageHandler}
                                                    >
                                                        Cập nhật
                                                    </button>
                                                    <button
                                                        className="btn hover:btn-error hover:text-base-100"
                                                        onClick={() => {
                                                            avatar && URL.revokeObjectURL(avatar.url)
                                                            setAvatar(null)
                                                        }}
                                                    >
                                                        Hủy bỏ
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </div>

                                <div className="flex flex-col mx-6">
                                    <h3 className="font-bold">
                                        {data?.name}
                                    </h3>
                                    <h4>
                                        {data?.email}
                                    </h4>
                                </div>
                            </div>
                            <div>
                                <div role="tablist" className="tabs tabs-bordered">
                                    {contents.map(item =>
                                        <Link
                                            key={item.id}
                                            to={item.url}
                                            className={`tab ${location.pathname === item.url ? "tab-active" : ""}`}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Outlet context={[data, isPending, update]}/>
                    </div>
                </>
            }
        </div>
    )
}