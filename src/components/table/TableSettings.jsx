import {useNavigate, useOutletContext} from "react-router-dom";
import Input from "../utils/Input.jsx";
import Textarea from "../utils/Textarea.jsx";
import {useState} from "react";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";

export default function TableSettings(){
    const { data, update } = useOutletContext()
    const { table, workspace } = data
    const [name, setName] = useState(table?.name)
    const [description, setDescription] = useState(table?.description)
    const [confirm, setConfirm] = useState("")
    const [error, setError] = useState(null)
    const authAxiosRequest = useAuthAxiosRequest()
    const navigate = useNavigate()

    const updateName = ( name ) => {
        setError(null)
        setName(name)
    }

    const isErrorName = () => {
        if (error) {
            return error
        }
        if (name.length === 0){
            return "Không được bỏ trống"
        } else if (name.length > 120){
            return "Tên bảng không được vượt quá 120 ký tự"
        }
        return null
    }

    const isErrorDescription = () => {
        if (description.length > 1000){
            return "Mô tả không được vượt quá 1000 ký tự"
        }
        return null
    }

    const isErrorConfirm = () => {
        if (confirm === table?.name){
            return null
        }
        return ""
    }

    const isEnable = () => {
        return isErrorName() == null && isErrorDescription() == null
    }

    const updateTable = () => {
        const payload = {
            name,
            description
        }
        authAxiosRequest
            .patch(`/tables/${table?.id}`, payload)
            .then(() => {
                update()
                navigate(`/tables/${table?.id}`)
            })
            .catch(e => console.log(e.response?.data))
    }

    const deleteTable = () => {
        authAxiosRequest
            .delete(`/tables/${table?.id}`)
            .then(() => {
                navigate(`/workspaces/${table?.workspaceId}`)
            })
            .catch(e => console.log(e.response?.data))
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 flex justify-center mt-14 mb-4 font-bold">
                <h1 className="text-2xl text-primary">
                    BẢNG CÔNG VIỆC
                </h1>
            </div>
            <div
                className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 flex flex-col justify-center items-center py-2 bg-base-200 rounded-box"
            >
                <Input
                    label="Tên bảng"
                    placeholder="Tên bảng ..."
                    type="text"
                    value={name}
                    setValue={updateName}
                    error={isErrorName()}
                />
                <Textarea
                    label="Mô tả"
                    placeholder="Mô tả ..."
                    value={description}
                    setValue={setDescription}
                    error={isErrorDescription()}
                />
                <button
                    className="btn btn-outline btn-primary px-6 my-6"
                    disabled={!isEnable()}
                    onClick={updateTable}
                >
                    Cập nhật
                </button>
            </div>
            <div
                className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 flex flex-col justify-center items-center py-2 rounded-box"
            >
                <div
                    className="w-full flex justify-start items-center"
                >
                    <button
                        className="btn btn-outline btn-error"
                        onClick={() => {
                            document.getElementById('delete-table-modal').showModal()
                        }}
                    >
                        Xóa bảng công việc
                    </button>
                </div>
                <dialog id="delete-table-modal" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-error">
                            QUAN TRỌNG
                        </h3>
                        <p className="pt-2">
                            Việc xóa bảng công việc sẽ khiến cho những dữ liệu bên trong bị xóa bỏ và bạn sẽ không
                            thể phục hồi lại. Nếu bạn đã nắm rõ điều đó và vẫn muốn xóa hãy nhập lại tên bảng công việc
                            <span
                                className="font-semibold ml-2"
                            >
                                "{table?.name}"
                            </span>.
                        </p>
                        <Input
                            placeholder="Nhập lại ..."
                            value={confirm}
                            setValue={setConfirm}
                            type="text"
                            error={isErrorConfirm()}
                        />
                        <div className="modal-action">
                            <form method="dialog">
                                <button
                                    className="btn hover:btn-primary mr-2"
                                    disabled={isErrorConfirm() !== null}
                                    onClick={deleteTable}
                                >
                                    Thực hiện
                                </button>
                                <button
                                    className="btn hover:btn-error hover:text-base-100"
                                    onClick={() => {
                                        setConfirm("")
                                    }}
                                >
                                    Hũy bỏ
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    )
}