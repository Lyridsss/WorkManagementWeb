import {useQuery} from "@tanstack/react-query";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";

export default function TableMembers({ members, table }){
    const authAxiosRequest = useAuthAxiosRequest()
    const { data, isPending, isError } = useQuery({
        queryKey: ["account"],
        queryFn: () => authAxiosRequest
            .get("/account")
            .then(res => res.data)
            .catch(error => error.response?.data)
    })
    const account = members?.at(members?.findIndex(member => member.id === data?.id))
    const others = members?.filter(member => member.id !== data?.id)

    const roleConverter = (value) => {
        switch (value){
            case "ADMIN":
                return "Quản trị viên"
            case "MEMBER":
                return "Thành viên"
            case "OBSERVER":
                return "Quan sát viên"
        }
    }

    return (
        <>
            <div className="w-full flex justify-between items-center px-6">
                <div className="flex items-center">
                    <>
                        {
                            account?.avatar == null ?
                                <div className="avatar placeholder">
                                    <div
                                        className="bg-neutral text-neutral-content w-10 rounded-full"
                                    >
                                    <span className="text-sm">
                                        {account?.name[0].toUpperCase()}
                                    </span>
                                    </div>
                                </div> :
                                <div className="avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Avatar" src={account?.avatar}/>
                                    </div>
                                </div>
                        }
                    </>
                    <div className="flex flex-col ml-2">
                        <h3 className="text-sm font-bold">
                            {account?.name}
                        </h3>
                        <h4 className="text-sm">
                            {account?.email}
                        </h4>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center">
                    {table?.role === "ADMIN" ?
                        <button
                            className="w-[115px] flex justify-center text-primary border border-primary py-1 px-2 rounded-md hover:bg-primary hover:text-base-100 cursor-pointer">
                            {roleConverter(account?.role)}
                        </button> :
                        <div className="w-[115px] flex justify-center text-gray-500 bg-base-300 py-1 px-2 rounded-md">
                            {roleConverter(account?.role)}
                        </div>
                    }
                    <button
                        className="w-20 flex justify-center text-error border border-error py-1 px-2 rounded-md hover:bg-error hover:text-base-100 cursor-pointer ml-2 mt-2 sm:mt-0">
                        Rời đi
                    </button>
                </div>
            </div>
            {others?.map(item =>
                <div className="w-full flex justify-between items-center px-6 mt-3">
                    <div className="flex items-center">
                        <>
                            {
                                item.avatar == null ?
                                    <div className="avatar placeholder">
                                        <div
                                            className="bg-neutral text-neutral-content w-10 rounded-full"
                                        >
                                    <span className="text-sm">
                                        {item.name[0].toUpperCase()}
                                    </span>
                                        </div>
                                    </div> :
                                    <div className="avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="Avatar" src={item.avatar}/>
                                        </div>
                                    </div>
                            }
                        </>
                        <div className="flex flex-col ml-2">
                            <h3 className="text-sm font-bold">
                                {item.name}
                            </h3>
                            <h4 className="text-sm">
                                {item.email}
                            </h4>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center">
                        {table?.role === "ADMIN" ?
                            <>
                                <button
                                    className="w-[115px] flex justify-center text-primary border border-primary py-1 px-2 rounded-md hover:bg-primary hover:text-base-100 cursor-pointer">
                                    {roleConverter(item.role)}
                                </button>
                                <button
                                    className="w-20 flex justify-center text-error border border-error py-1 px-2 rounded-md hover:bg-error hover:text-base-100 cursor-pointer ml-2 mt-2 sm:mt-0">
                                    Loại bỏ
                                </button>
                            </> :
                            <>
                                <div
                                    className="w-[115px] flex justify-center text-gray-500 bg-base-300 py-1 px-2 rounded-md">
                                    {roleConverter(item.role)}
                                </div>
                                <div className="w-20 h-5 ml-2">

                                </div>
                            </>
                        }
                    </div>
                </div>
            )}
        </>
    )
}