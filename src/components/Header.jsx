import {Link} from "react-router-dom";
import {useAuthAxiosRequest} from "../hooks/Request.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthenticationContext.jsx";
import Logo from "./Logo.jsx";
import WorkspaceList from "./WorkspaceList.jsx";

export default function Header({ isPending, data, update }){
    const { logout } = useContext(AuthContext)
    const authAxiosRequest = useAuthAxiosRequest()

    const updateNotification = () => {
        authAxiosRequest
            .patch("/account/notification")
            .then(res => {

            })
            .catch(error => {
                // ???
                console.log(error)
            })
    }

    return (
        <div className="navbar bg-accent-content">
            <div className="navbar-start">
                <Logo url="/workspaces"/>
                <div className="dropdown dropdown-hover hidden lg:inline-block">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn bg-inherit border-none text-base-200 hover:text-primary hover:bg-inherit"
                    >
                        Các không gian làm việc
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52">
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
                    <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a>Item 1</a>
                        </li>
                        <li>
                            <a>Item 2</a>
                        </li>
                    </ul>
                </div>
                <Link
                    to="/workspaces/form"
                    className="btn btn-primary btn-sm mx-3.5"
                >
                    Tạo mới
                </Link>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end mx-1">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle hover:bg-gray-800"
                        onClick={updateNotification}
                    >
                        <div className="indicator">
                            <i className="fa-regular fa-bell text-xl text-base-200"></i>
                            <span className="badge badge-sm indicator-item">0</span>
                        </div>
                    </div>
                    <div tabIndex={0} className="mt-3 z-50 card card-compact dropdown-content w-80 bg-base-200 shadow">
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
                            isPending ?
                            <div className="skeleton w-10 bg-base-200 rounded-full shrink-0"></div> :
                            <>
                                {
                                    data?.avatar == null ?
                                        <div className="avatar placeholder">
                                            <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                <span className="text-sm">
                                                    {data?.name[0].toUpperCase()}
                                                </span>
                                            </div>
                                        </div> :
                                        <div className="w-10 rounded-full">
                                            <img alt="Avatar" src={data?.avatar}/>
                                        </div>
                                }
                            </>
                        }
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-72"
                    >
                        <div className="flex flex-row items-center py-2">
                            {
                                data?.avatar == null ?
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral text-neutral-content rounded-full w-20">
                                                <span className="text-xl">
                                                    {data?.name[0].toUpperCase()}
                                                </span>
                                        </div>
                                    </div> :
                                    <div className="avatar">
                                        <div className="w-20 rounded-full">
                                            <img
                                                alt="Avatar"
                                                src={data?.avatar}/>
                                        </div>
                                    </div>
                            }
                            <div className="mx-4">
                                <p className="font-bold">
                                    {data?.name}
                                </p>
                                <p>
                                    {data?.email}
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
    )
}