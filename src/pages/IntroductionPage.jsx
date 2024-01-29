import {Link} from "react-router-dom";

export default function IntroductionPage(){

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
        <div>
            <div className="navbar bg-base-200">
                <div className="navbar-start">
                    <Link to={"/intro"} className="btn btn-ghost text-2xl hover:bg-base-200 hover:text-primary">
                        WM
                    </Link>
                </div>
                <div className="navbar-end">
                    {
                        buttons.map(item =>
                            <Link
                                to={item.url}
                                key={item.id}
                                className="btn hidden lg:flex mx-2 hover:bg-primary bg-base-100 text-stone-200 hover:text-stone-100"
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
                            <div className="drawer-side">
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
            <div className="grid grid-cols-1 lg:grid-cols-5 bg-stone-100 min-h-screen">
                <div className="col-span-1 lg:col-span-2 flex flex-col items-center pt-24 px-20 lg:px-16">
                    <h1 className="flex mb-4 text-center text-3xl sm:text-5xl text-primary font-bold">
                        VM tập hợp tất cả nhiệm vụ, thành viên nhóm và công cụ của bạn lại với nhau
                    </h1>
                    <h3 className="text-lg mb-4 text-center">
                        Duy trì mọi thứ ở cùng một nơi, dù cho nhóm của bạn không ở cùng nhau.
                    </h3>
                    <button className="btn duration-300 hover:translate-x-2">
                        <Link to="/register" className="flex justify-center">
                            <p className="px-2">
                                Đăng ký ngay
                            </p>
                            <i className="fa-solid fa-arrow-right"></i>
                        </Link>

                    </button>
                </div>
                <div className="col-span-1 lg:col-span-3 hidden lg:flex justify-center">
                    <img src="/Team-work.png" alt="Team Work" className="w-full"/>
                </div>
            </div>
        </div>
    )
}