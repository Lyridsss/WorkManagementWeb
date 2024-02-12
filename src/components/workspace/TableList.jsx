import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";

export default function TableList({ workspace }){
    const workspaceId = workspace.id
    const authAxiosRequest = useAuthAxiosRequest()
    const { data, isPending, isError} = useQuery({
        queryKey: ["table-list", workspaceId],
        queryFn: () => {
            return authAxiosRequest
                .get(`/workspaces/${workspaceId}/tables`)
                .then(res => res.data)
                .catch(error => {
                    console.log(error)
                })
        }
    })


    return (
        <div>
            <div className="mx-auto max-w-2xl py-4 lg:max-w-7xl">
                <h2 className="text-lg pb-3 font-bold flex items-center">
                    <i className="fa-solid fa-table-columns mr-2"></i>
                    <p>
                        Danh sách bảng
                    </p>
                </h2>
                <div
                    className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                >
                    {data?.map((table) => (
                        <Link
                            to={`/tables/${table.id}`}
                            key={table.id}
                            className="group"
                        >
                            <div
                                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
                            >
                                {
                                    table.background == null ?
                                        <div className="bg-gradient-to-r from-sky-500 to-indigo-500 w-full h-36">
                                            <h1 className="p-2 font-semibold text-base-100">
                                                {table.name}
                                            </h1>
                                        </div> :
                                        <div className="relative">
                                            <img
                                                alt="Table background"
                                                src={table.background}
                                                className="w-full h-36"
                                            />
                                            <h1 className="absolute z-10 top-3 left-3 text-xl sm:text-lg font-semibold text-base-100">
                                                {table.name}
                                            </h1>
                                        </div>
                                }
                            </div>
                        </Link>
                    ))}
                    {
                        (workspace?.role === "ADMIN" || workspace?.role === "MEMBER") &&
                        <Link
                            to={`/tables/form?workspace=${workspaceId}`}
                            className="group"
                        >
                            <div
                                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
                            >

                                <div className="bg-base-200 hover:bg-base-300 w-full h-36 flex justify-center items-center">
                                    <h1 className="font-semibold text-base-content">
                                        Tạo bảng mới
                                    </h1>
                                </div>
                            </div>
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}