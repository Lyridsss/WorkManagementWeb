import {useAuthAxiosRequest} from "../../hooks/Request.jsx";

export default function TableScope({ table, update }){
    const authAxiosRequest = useAuthAxiosRequest()

    const updateScope = scope => {
        authAxiosRequest
            .patch(`/tables/${table?.id}/scope`, { scope })
            .then(() => {
                update()
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            {table?.role === "ADMIN" &&
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn-ghost px-1 hover:bg-gray-800 rounded-md text-lg">
                        {table?.scope === "GROUP" ?
                            <i className="fa-solid fa-lock text-red-600"></i> :
                            <i className="fa-solid fa-user-group text-green-600"></i>
                        }
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-72 text-base-content">
                        <li className="w-full">
                            <button
                                className="flex flex-col w-full"
                                onClick={() => updateScope("GROUP")}
                            >
                                <strong className="flex justify-start items-center w-full">
                                    <i className="fa-solid fa-lock text-red-600 mr-1.5"></i>
                                    Nhóm
                                    {
                                        table?.scope === "GROUP" &&
                                        <i className="fa-solid fa-check text-sm ml-1"></i>
                                    }
                                </strong>
                                <p className="w-full">
                                    Chỉ những thành viên trong nhóm mới có thể truy cập
                                </p>
                            </button>
                        </li>
                        <li className="w-full">
                            <button
                                className="flex flex-col w-full"
                                onClick={() => updateScope("WORKSPACE")}
                            >
                                <strong className="flex justify-start w-full items-center">
                                    <i className="fa-solid fa-user-group text-green-600 mr-1.5"></i>
                                    Không gian làm việc
                                    {
                                        table?.scope === "WORKSPACE" &&
                                        <i className="fa-solid fa-check text-sm ml-1"></i>
                                    }
                                </strong>
                                <p className="w-full">
                                    Tất cả những thành viên trong không gian làm việc có thể truy cập
                                </p>
                            </button>
                        </li>
                    </ul>
                </div>
            }
        </>
    )
}