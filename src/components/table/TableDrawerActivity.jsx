import {useQuery} from "@tanstack/react-query";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";

export default function TableDrawerActivity({ table, options, setDisplay  }){
    const authAxiosRequest = useAuthAxiosRequest()
    const { data, isPending, isError } = useQuery({
        queryKey: ["table-activity", table?.id],
        queryFn: () =>
            authAxiosRequest
                .get(`/tables/${table?.id}/activities`)
                .then(res => res.data)
                .catch(error => console.log(error))
    })
    const getMessage = (activity) => {
        switch (activity?.type){
            case "CHANGE_SCOPE_TABLE":
                return (
                    <div>
                        <span className="font-bold">
                            {activity?.account.name}
                        </span> đã thay đổi phạm vi của bảng.
                    </div>
                )
            case "DELETE_CATEGORY":
                return (
                    <div>
                        <span className="font-bold">
                            {activity?.account.name}
                        </span> đã xóa một danh mục trong bảng.
                    </div>
                )
            case "CREATE_CATEGORY":
                return (
                    <div>
                        <span className="font-bold">
                            {activity?.account.name}
                        </span> đã tạo danh mục <span className="font-bold">{activity?.category.name}</span> trong bảng.
                    </div>
                )
            case "DELETE_CARD":
                return (
                    <div>
                        <span className="font-bold">
                            {activity?.account.name}
                        </span> đã xóa một thẻ trong danh mục <span className="font-bold">{activity?.category.name}</span>.
                    </div>
                )
            case "CREATE_CARD":
                return (
                    <div>
                        <span className="font-bold">
                            {activity?.account.name}
                        </span> đã tạo thẻ <span
                        className="font-bold">{activity?.card.name}</span> trong danh mục <span
                        className="font-bold">{activity?.category.name}</span>.
                    </div>
                )
            case "SET_DEADLINE":
                return (
                    <div>
                        <span className="font-bold">
                            {activity?.account.name}
                        </span> đã đặt ngày hết hạn cho thẻ <span
                        className="font-bold">{activity?.card.name}</span> trong danh mục <span
                        className="font-bold">{activity?.category.name}</span>.
                    </div>
                )
            case "CHANGE_DEADLINE":
                return (
                    <div>
                        <span className="font-bold">
                            {activity?.account.name}
                        </span> đã cập nhật ngày hết hạn cho thẻ <span
                        className="font-bold">{activity?.card.name}</span> trong danh mục <span
                        className="font-bold">{activity?.category.name}</span>.
                    </div>
                )
            case "DELETE_DEADLINE":
                return (
                    <div>
                        <span className="font-bold">
                            {activity?.account.name}
                        </span> đã xóa ngày hết hạn cho thẻ <span
                        className="font-bold">{activity?.card.name}</span> trong danh mục <span
                        className="font-bold">{activity?.category.name}</span>.
                    </div>
                )
            case "REMINDER_DEADLINE":
                return (
                    <div>
                        Thẻ <span
                        className="font-bold">{activity?.card.name}</span> trong danh mục <span
                        className="font-bold">{activity?.category.name}</span> sắp hết hạn.
                    </div>
                )
            case "NOTIFICATION_DEADLINE":
                return (
                    <div>
                        Thẻ <span
                        className="font-bold">{activity?.card.name}</span> trong danh mục <span
                        className="font-bold">{activity?.category.name}</span> đã hết hạn.
                    </div>
                )
        }
    }
    return (
        <>
            <div className="w-full flex justify-center items-center text-xl font-bold py-2 border-b-2 relative">
                <p>
                    HOẠT ĐỘNG
                </p>
                <button
                    className="flex absolute left-1 hover:text-primary"
                    onClick={() => setDisplay(options.home)}
                >
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
            </div>
            <div className="flex flex-col">
                {data?.map(item =>
                    <div key={item.id} className="py-1.5 border-b">
                        {getMessage(item)}
                    </div>
                )}
            </div>
        </>
    )
}