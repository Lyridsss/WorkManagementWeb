import {Outlet, useParams} from "react-router-dom";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";
import TableSideBar from "../../components/table/TableSideBar.jsx";
import TableHomeView from "../../components/table/TableHomeView.jsx";
import {useState} from "react";

export default function TableHome(){
    const { tableId } = useParams()
    const authAxiosRequest = useAuthAxiosRequest()
    const [times, setTimes] = useState(0)
    const { data, isPending, isError } = useQuery({
        queryKey: ["table-home", tableId, times],
        queryFn: async () => {
            const table = await authAxiosRequest
                .get(`/tables/${tableId}`)
                .then(res => res.data)
                .catch(error => console.log(error))
            const workspace = await authAxiosRequest
                .get(`/workspaces/${table?.workspaceId}`)
                .then(res => res.data)
                .catch(error => console.log(error))
            return {
                table,
                workspace
            }
        }
    })

    const update = () => {
        setTimes(prevState => prevState + 1)
    }

    const context = {
        data,
        update
    }

    return (
        <>
            {isPending ?
                <div className="flex w-full h-screen justify-center items-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div> :
                <>
                    {isError ?
                        <div className="flex w-full h-screen justify-center items-center">
                            <p className="text-xl font-bold">
                                KHÔNG TÌM THẤY DỮ LIỆU
                            </p>
                        </div> :
                        <div className="flex flex-row w-full">
                            <TableSideBar
                                workspace={data?.workspace}
                                tableId={tableId}
                            />
                            <Outlet context={context}/>
                        </div>
                    }
                </>
            }
        </>
    )
}