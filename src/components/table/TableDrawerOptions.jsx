import {Link} from "react-router-dom";

export default function TableDrawerOptions({ table, options, setDisplay }){
    return (
        <>
            <div className="w-full flex justify-center items-center text-xl font-bold py-2 border-b-2">
                Menu
            </div>
            <div className="flex flex-col">
                <button
                    className="flex flex-row items-center outline-none py-1.5 hover:bg-base-300 hover:text-primary rounded-md cursor-pointer"
                    onClick={() => setDisplay(options.info)}
                >
                    <i className="fa-solid fa-circle-info w-8 text-lg"></i>
                    <p className="font-semibold">
                        Thông tin
                    </p>
                </button>
                <button
                    className="flex flex-row items-center outline-none py-1.5 hover:bg-base-300 hover:text-primary rounded-md cursor-pointer"
                    onClick={() => setDisplay(options.activity)}
                >
                    <i className="fa-solid fa-bars-staggered w-8 text-lg"></i>
                    <p className="font-semibold">
                        Hoạt động
                    </p>
                </button>
                {table?.role === "ADMIN" &&
                    <button
                        className="flex flex-row items-center outline-none py-1.5 hover:bg-base-300 hover:text-primary rounded-md cursor-pointer"
                        onClick={() => setDisplay(options.background)}
                    >
                        <i className="fa-solid fa-image w-8 text-lg"></i>
                        <p className="font-semibold">
                            Thay đổi hình nền
                        </p>
                    </button>
                }
                <Link
                    to={`/tables/${table?.id}/members`}
                    className="flex flex-row items-center px-2 py-1.5 hover:bg-base-300 hover:text-primary rounded-md cursor-pointer"
                    onClick={() => {
                        document.getElementById("table-home-drawer").onClick()
                    }}
                >
                    <i className="fa-solid fa-user-group w-8 text-lg"></i>
                    <p className="font-semibold">
                        Thành viên
                    </p>
                </Link>
                {table?.role === "ADMIN" &&
                    <Link
                        to={`/tables/${table?.id}/settings`}
                        className="flex flex-row items-center px-2 py-1.5 hover:bg-base-300 hover:text-primary rounded-md cursor-pointer"
                    >
                        <i className="fa-solid fa-gear w-8 text-lg"></i>
                        <p className="font-semibold">
                            Cài đặt
                        </p>
                    </Link>
                }
            </div>
        </>
    )
}