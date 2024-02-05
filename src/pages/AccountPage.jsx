import Header from "../components/Header.jsx";
import {Link, Outlet, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthenticationContext.jsx";
import {axiosAuthRequest} from "../utils/axiosRequest.js";
import Logo from "../components/Logo.jsx";
import WorkspaceList from "../components/WorkspaceList.jsx";

export default function AccountPage(){
    const { token, logout } = useContext(AuthContext)
    const location = useLocation()
    const [account, setAccount] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axiosAuthRequest(token)
            .get("/account")
            .then(res => {
                setAccount(res.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }, [token]);
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
        setLoading(true)
        axiosAuthRequest(token)
            .patch("/account/avatar", form)
            .then(res => {
                URL.revokeObjectURL(avatar.url)
                setAvatar(null)
                setAccount(res.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const deleteImageHandler = () => {
        axiosAuthRequest(token)
            .delete("/account/avatar")
            .then(res => {
                setAccount(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="bg-base-100 text-base-content">
            <div className="navbar bg-accent-content">
                <div className="navbar-start">
                    <Logo url="/"/>
                    <div className="dropdown dropdown-hover hidden lg:inline-block">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn bg-inherit border-none text-base-200 hover:text-primary hover:bg-inherit"
                        >
                            Các không gian làm việc
                        </div>
                        <ul tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <WorkspaceList/>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-hover hidden lg:inline-block">
                        <div tabIndex={0}
                             role="button"
                             className="btn bg-inherit border-none text-base-200 hover:text-primary hover:bg-inherit"
                        >
                            Đã đánh dấu sao
                        </div>
                        <ul tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a>Item 1</a>
                            </li>
                            <li>
                                <a>Item 2</a>
                            </li>
                        </ul>
                    </div>
                    <button className="btn btn-primary btn-sm mx-3.5 hidden lg:inline-flex">
                        Tạo mới
                    </button>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end mx-1">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-gray-800">
                            <div className="indicator">
                                <i className="fa-regular fa-bell text-xl text-base-200"></i>
                                <span className="badge badge-sm indicator-item">0</span>
                            </div>
                        </div>
                        <div tabIndex={0}
                             className="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-200 shadow">
                            <div className="card-body">
                                <div>
                                    Một số thông báo
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            {
                                loading ?
                                    <div className="skeleton w-10 bg-base-200 rounded-full shrink-0"></div> :
                                    <>
                                        {
                                            account?.avatar == null ?
                                                <div className="avatar placeholder">
                                                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                <span className="text-sm">
                                                    {account?.name[0].toUpperCase()}
                                                </span>
                                                    </div>
                                                </div> :
                                                <div className="w-10 rounded-full">
                                                    <img alt="Avatar" src={account?.avatar}/>
                                                </div>
                                        }
                                    </>
                            }
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-72"
                        >
                            <div className="flex flex-row items-center py-2">
                                {
                                    account?.avatar == null ?
                                        <div className="avatar placeholder">
                                            <div className="bg-neutral text-neutral-content rounded-full w-20">
                                                <span className="text-xl">
                                                    {account?.name[0].toUpperCase()}
                                                </span>
                                            </div>
                                        </div> :
                                        <div className="avatar">
                                            <div className="w-20 rounded-full">
                                                <img
                                                    alt="Avatar"
                                                    src={account?.avatar}/>
                                            </div>
                                        </div>
                                }
                                <div className="mx-4">
                                    <p className="font-bold">
                                        {account?.name}
                                    </p>
                                    <p>
                                        {account?.email}
                                    </p>
                                </div>
                            </div>
                            <li>
                                <Link to="/account" className="justify-between hover:text-primary">
                                    Quản lý tài khoản
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        logout()
                                    }}
                                    className="hover:text-error"
                                >
                                    Đăng xuất
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {
                loading ?
                    <div className="min-h-screen w-full flex justify-center items-center">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div> :
                    <div className="w-full flex flex-col justify-center items-center px-4 sm:px-10 py-8">
                        <div className="w-full flex flex-col">
                            <div className="flex items-center p-2.5">
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="flex hover:cursor-pointer">
                                        {account?.avatar == null ?
                                            <div className="avatar placeholder">
                                                <div className="bg-neutral text-neutral-content rounded-full w-20">
                                                <span className="text-xl">
                                                    {account?.name[0].toUpperCase()}
                                                </span>
                                                </div>
                                            </div> :
                                            <div className="avatar">
                                                <div
                                                    className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                    <img
                                                        alt="Avatar"
                                                        src={account?.avatar}/>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <ul tabIndex={0}
                                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                                        <li>
                                            <button
                                                onClick={() => document.getElementById('upload-avatar').showModal()}
                                            >
                                                Cập nhật
                                            </button>
                                        </li>
                                        {
                                            account?.avatar != null &&
                                            <li>
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
                                                        className="btn"
                                                        disabled={avatar == null}
                                                        onClick={updateImageHandler}
                                                    >
                                                        Cập nhật
                                                    </button>
                                                    <button
                                                        className="btn"
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
                                        {account?.name}
                                    </h3>
                                    <h4>
                                        {account?.email}
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
                        <Outlet context={[account, setAccount, setLoading]}/>
                    </div>
            }
        </div>
    )
}