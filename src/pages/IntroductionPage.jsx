import {Link} from "react-router-dom";
import IntroHeader from "../components/IntroHeader.jsx";
import {config} from "../config/index.jsx";

export default function IntroductionPage(){

    return (
        <div className={`min-h-screen ${config.theme.backgroundPage}`}>
            <IntroHeader/>
            <div className={`grid grid-cols-1 lg:grid-cols-5 ${config.theme.backgroundPage}`}>
                <div className="col-span-1 lg:col-span-2 flex flex-col items-center pt-24 px-20 lg:px-16">
                    <h1 className="flex mb-4 text-center text-3xl sm:text-5xl text-blue-700 font-bold">
                        VM tập hợp tất cả nhiệm vụ, thành viên nhóm và công cụ của bạn lại với nhau
                    </h1>
                    <h3 className="text-lg mb-4 text-center text-gray-700">
                        Duy trì mọi thứ ở cùng một nơi, dù cho nhóm của bạn không ở cùng nhau.
                    </h3>
                    <button className="btn duration-300 hover:scale-105 bg-gray-900 hover:bg-gray-950 text-white">
                        <Link to="/register" className="flex justify-center items-center">
                            <p className="px-2">
                                Đăng ký ngay
                            </p>
                        </Link>
                    </button>
                </div>
                <div className="col-span-1 lg:col-span-3 hidden lg:flex justify-center h-full">
                    <img src="/Team-work.png" alt="Team Work" className="w-full"/>
                </div>
            </div>
        </div>
    )
}