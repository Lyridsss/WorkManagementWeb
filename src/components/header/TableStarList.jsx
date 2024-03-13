import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";

export default function TableStarList(){
    const authAxiosRequest = useAuthAxiosRequest()
    const { data, isPending, isError } = useQuery({
        queryKey: ["tables-star"],
        queryFn: () => {
            return authAxiosRequest
                .get("/tables/stars")
                .then(res => res.data)
                .catch(error => {
                    return error.response?.data
                })
        }
    })

    return (
        <>
            {
                (isError || data?.length === 0)?
                    <p className="w-full mx-2 py-1">
                        Không có dữ liệu
                    </p> :
                    data?.map(table =>
                        <li key={table.id}>
                            <Link to={`/tables/${table.id}`}>
                                {table.name}
                            </Link>
                        </li>
                    )
            }
        </>
    )
}