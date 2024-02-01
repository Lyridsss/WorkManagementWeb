import Logo from "./Logo.jsx";
import {Link, useLocation} from "react-router-dom";
import {config} from "../config/index.jsx";

export default function IntroHeader(){
    const location = useLocation()
    const buttons = [
        {
            id: 1,
            url: "/login",
            content: "Đăng nhập"
        },
        {
            id: 2,
            url: "/register",
            content: "Đăng ký"
        }
    ]

    return (
        <div className={`navbar ${config.theme.backgroundHeader}`}>
            <div className="navbar-start">
                <Logo url="/intro"/>
            </div>
            <div className="navbar-end">
                {
                    buttons.map(item =>
                        <Link
                            to={item.url}
                            key={item.id}
                            className={`btn border-0 hidden lg:flex mx-2 hover:text-white ${location.pathname === item.url ? "bg-primary text-white" : "bg-gray-50 text-gray-900"}  hover:bg-primary`}
                        >
                            {item.content}
                        </Link>
                    )
                }
                <div className="flex mx-2 lg:hidden">
                    <div className="drawer drawer-end">
                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle"/>
                        <div className="drawer-content">
                            <label htmlFor="my-drawer-4" className="drawer-button btn">
                                <i className="fa-solid fa-bars"></i>
                            </label>
                        </div>
                        <div className="drawer-side z-50">
                            <label htmlFor="my-drawer-4" aria-label="close sidebar"
                                   className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                {buttons.map(item =>
                                    <li key={item.id}>
                                        <Link to={item.url}>
                                            {item.content}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}