import {useQuery} from "@tanstack/react-query";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useOutletContext, useParams} from "react-router-dom";

export default function TableActivity(){
    const { tableId } = useParams();
    const authAxiosRequest = useAuthAxiosRequest()
    const { data, isPending, isError } = useQuery({
        queryKey: ["table-activity", tableId],
        queryFn: () =>
            authAxiosRequest
                .get(`/tables/${tableId}/activities`)
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
            <div className="w-full flex justify-center items-center text-xl">
                <h1 className="font-bold text-2xl text-primary my-3">
                    HOẠT ĐỘNG
                </h1>
            </div>
            <div className="flex flex-col mx-5 md:mx-10 xl:mx-20 my-3">
                {data?.map(item =>
                    <div key={item.id} className="py-2.5 border-b">
                        {getMessage(item)}
                    </div>
                )}
            </div>
        </>
    )
}