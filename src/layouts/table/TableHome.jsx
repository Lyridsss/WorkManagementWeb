import {Outlet, useParams} from "react-router-dom";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";
import TableSideBar from "../../components/table/TableSideBar.jsx";
import TableHomeView from "../../components/table/TableHomeView.jsx";
import {useState} from "react";
import TableStar from "../../components/table/TableStar.jsx";
import TableScope from "../../components/table/TableScope.jsx";
import JoiningTable from "../../components/table/JoiningTable.jsx";
import TableDrawer from "../../components/table/TableDrawer.jsx";

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
                    <span className="loading loading-dots loading-lg text-primary"></span>
                </div> :
                <>
                {isError ?
                        <div className="flex w-full h-screen justify-center items-center">
                            <p className="text-xl font-bold">
                                KHÔNG TÌM THẤY DỮ LIỆU
                            </p>
                        </div> :
                    <div className="w-full h-full flex flex-row">
                        <TableSideBar
                            workspace={data?.workspace}
                            tableId={tableId}
                        />
                        <div
                            className="w-full flex flex-col"
                        >
                            <div
                                className="w-full flex flex-row justify-between items-center py-2 bg-gray-950 text-base-100"
                            >
                                <div className="flex flex-row justify-start items-center sm:ml-6">
                                    <h1 className="text-2xl font-bold">
                                        {data?.table.name}
                                    </h1>
                                    <TableStar
                                        tableId={data?.table.id}
                                    />
                                    <TableScope table={data?.table} update={update}/>
                                </div>
                                <div className="flex flex-row justify-end items-center mr-4 sm:mr-6">
                                    <JoiningTable table={data?.table} update={update} workspace={data?.workspace}/>
                                    <TableDrawer table={data?.table} update={update}/>
                                </div>
                            </div>
                            <Outlet context={context}/>
                        </div>
                    </div>
                }
                </>
            }
        </>
    )
}