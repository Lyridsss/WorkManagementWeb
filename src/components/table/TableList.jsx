import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";

export default function TableList({ workspaceId, tableId }){
    const authAxiosRequest = useAuthAxiosRequest()
    const { data, isPending, isError } = useQuery({
        queryKey: ["table-sidebar-table-list", workspaceId],
        queryFn: () => authAxiosRequest
            .get(`/workspaces/${workspaceId}/tables`)
            .then(res => res.data)
            .catch(error => error.response?.data)
    })

    return (
        <div className="w-full flex flex-col ml-2 my-1">
            {
                isError || isPending ?
                    <div className="my-1 flex items-center p-1">
                        <div className="skeleton w-10 h-8 mr-2 rounded-md"></div>
                        <div className="skeleton w-full h-6 rounded-md"></div>
                    </div> :
                    <>
                    {
                            data?.map(table =>
                                <Link
                                    key={table.id}
                                    to={`/tables/${table.id}`}
                                    className={`flex flex-row my-1 w-full rounded-md ${table.id === tableId && "bg-base-300"} p-1`}
                                >
                                    {
                                        table.background == null ?
                                            <div className="avatar placeholder mr-2">
                                                <div
                                                    className="bg-info text-base-100 w-8 rounded-md"
                                                >
                                                    <span className="text-lg">
                                                        {table.name[0]}
                                                    </span>
                                                </div>
                                            </div> :
                                            <div className="avatar mr-2">
                                                <div className="w-8 rounded-md">
                                                    <img
                                                        alt="workspace-background"
                                                        src={table.background}
                                                    />
                                                </div>
                                            </div>
                                    }
                                    <div className="flex justify-start items-center font-semibold">
                                        {table.name}
                                    </div>
                                </Link>
                            )
                        }
                    </>
            }
        </div>
    )
}