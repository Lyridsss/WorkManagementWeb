import {useAuthAxiosRequest} from "../../hooks/Request.jsx";

export default function JoiningTable({ table, update, workspace }){
    const authAxiosRequest = useAuthAxiosRequest()
    const joinTable = () => {
        authAxiosRequest
            .post(`/tables/${table?.id}/members/participation`)
            .then(res => {
                update()
            })
            .catch(error => console.log(error))
    }
    return (
        <div>
            {
                (table?.role == null && workspace?.role === "ADMIN") &&
                <button
                    className="btn-ghost px-1 hover:bg-gray-300 rounded-md text-lg text-green-600"
                    onClick={joinTable}
                >
                    <i className="fa-solid fa-user-plus"></i> Tham gia
                </button>
            }
        </div>
    )
}