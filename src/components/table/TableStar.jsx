import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {useTableStarListUpdater} from "../../hooks/TableStarList.jsx";

export default function TableStar({ tableId }){
    const authAxiosRequest = useAuthAxiosRequest()
    const [times, setTimes] = useState(0)
    const { tableStarListCount, updateTableStarListCount } = useTableStarListUpdater()
    const { data, isPending, isError } = useQuery({
        queryKey: ["table-star", tableId, times],
        queryFn: () =>
            authAxiosRequest
                .get(`/tables/stars/${tableId}`)
                .then(res => res.data)
                .catch(error => null)
    })
    const makingStar = () => {
        authAxiosRequest
            .post(`/tables/stars`, { tableId })
            .then(() => {
                setTimes(prevState => prevState + 1)
                updateTableStarListCount()
            })
            .catch(error =>
                console.log(error)
            )

    }

    const deleteStar = () => {
        authAxiosRequest
            .delete(`/tables/stars/${tableId}`)
            .then(() => {
                setTimes(prevState => prevState + 1)
                updateTableStarListCount()
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="text-lg mx-2">
            {data == null ?
                <button
                    className="btn-ghost px-1 hover:bg-gray-200 rounded-md"
                    onClick={makingStar}
                >
                    <i className="fa-solid fa-star"></i>
                </button> :
                <button
                    onClick={deleteStar}
                    className="btn-ghost px-1 hover:bg-gray-200 rounded-md"
                >
                    <i className="fa-solid fa-star text-yellow-400"></i>
                </button>
            }
        </div>
    )
}