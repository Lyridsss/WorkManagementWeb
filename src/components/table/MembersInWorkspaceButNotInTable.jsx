import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";

export default function MembersInWorkspaceButNotInTable({ table }){
    const authAxiosRequest = useAuthAxiosRequest()
    const [role, setRole] = useState("OBSERVER")
    const [times, setTimes] = useState(0)
    const { data } = useQuery({
        queryKey: ["members-not-in-table", table?.id, times],
        queryFn: () => authAxiosRequest
            .get(`/tables/${table?.id}/members/not-in-table`)
            .then(res => res.data)
            .catch(error => console.log(error))
    })

    const update = () => {
        setTimes(prevState => prevState + 1)
    }

    const addMemberToTable = member => {
        const data = {
            accountId: member.id,
            role
        }
        authAxiosRequest
            .post(`/tables/${table?.id}/members`, data)
            .then(res => {
                update()
            })
            .catch(error => console.log(error))
    }

    const roles = [
        {
            id: 1,
            role: "ADMIN",
            name: "Quản trị viên"
        },
        {
            id: 2,
            role: "MEMBER",
            name: "Thành viên"
        },
        {
            id: 3,
            role: "OBSERVER",
            name: "Quan sát viên"
        }
    ]
    return (
        <div className="w-full flex flex-col">
            <div className="flex justify-between my-1.5">
                <span className="font-bold px-2 py-1 border rounded-md text-primary">
                    Vai trò:
                </span>
                <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                >
                    {roles.map(item =>
                        <option key={item.id} value={item.role}>
                            {item.name}
                        </option>
                    )}
                </select>
            </div>
            <>
                {data?.map(account =>
                    <div className="w-full flex justify-between my-2" key={account.id}>
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
                            <button
                                className="btn btn-outline btn-primary px-7"
                                onClick={() => addMemberToTable(account)}
                            >
                                Thêm
                            </button>
                        </div>
                    </div>
                )}
            </>
        </div>
    )
}