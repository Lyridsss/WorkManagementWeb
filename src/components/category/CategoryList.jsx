import {useQuery} from "@tanstack/react-query";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";

export default function CategoryList({ tableId, update }){
    const authAxiosRequest = useAuthAxiosRequest()
    const { data, isPending, isError } = useQuery({
        queryKey: ["category-list", tableId, update],
        queryFn: () => {
            return authAxiosRequest
                .get(`/tables/${tableId}/categories`)
                .then(res => res.data)
                .catch(error => console.log(error.response?.data))
        }
    })
    return (
        <>
            {data?.map(category =>
                <div
                    className="min-w-72 h-52 flex flex-col bg-base-200 m-2 rounded-md"
                    key={category.id}
                >
                    <div
                        className="w-full flex justify-between py-2.5 px-2 bg-base-300 text-base-content rounded-t-md rounded-b-none">
                        <span className="font-semibold">
                            {category.name}
                        </span>
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="hover:text-primary">
                                <i className="fa-solid fa-ellipsis"></i>
                            </div>
                            <ul tabIndex={0}
                                className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <button className="font-semibold text-yellow-500">
                                        Cập nhật
                                    </button>
                                </li>
                                <li>
                                    <button className="font-semibold text-red-500">
                                        Xóa
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}