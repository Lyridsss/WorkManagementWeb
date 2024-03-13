import {useParams} from "react-router-dom";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";
import TableSideBar from "../../components/table/TableSideBar.jsx";
import TableHomeView from "../../components/table/TableHomeView.jsx";

export default function TableHome(){
    const { tableId } = useParams()
    const authAxiosRequest = useAuthAxiosRequest()
    const { data, isPending, isError } = useQuery({
        queryKey: ["table-home", tableId],
        queryFn: () => {
            return authAxiosRequest
                .get(`/tables/${tableId}`)
                .then(res => res.data)
                .catch(error => {
                    console.log(error)
                })
        }
    })

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
                        <div>
                            <TableSideBar
                                workspaceId={data?.workspaceId}
                                tableId={data?.id}
                            />
                            <TableHomeView/>
                        </div>
                    }
                </>
            }
        </>
    )
}