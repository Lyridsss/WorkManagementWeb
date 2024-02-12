import {useState} from "react";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import Input from "../../components/utils/Input.jsx";
import Textarea from "../../components/utils/Textarea.jsx";
import Select from "../../components/utils/Select.jsx";

export default function TableForm(){
    const [searchParams, setSearchParams] = useSearchParams()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(null)
    const scopes = [{
        title: "Nhóm",
        value: "GROUP"
    },{
        title: "Không gian làm việc",
        value: "WORKSPACE"
    }]
    const [scope, setScope] = useState(scopes[1].value)
    const authAxiosRequest = useAuthAxiosRequest()
    const navigate = useNavigate()

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

    const isEnable = () => {
        return isErrorName() == null && isErrorDescription() == null
    }

    const updateName = ( name ) => {
        setError(null)
        setName(name)
    }

    const createTable = () => {
        const data = {
            name,
            description,
            scope
        }
        authAxiosRequest
            .post(`/workspaces/${searchParams.get("workspace")}/tables`, data)
            .then(() => {
                navigate(`/workspaces/${searchParams.get("workspace")}`)
            })
            .catch(error => {
                setError(error.response?.data.message)
            })
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
                <Select
                    label="Phạm vi"
                    items={scopes}
                    value={scope}
                    setValue={setScope}
                />
                <button
                    className="btn btn-outline btn-primary px-6 my-6"
                    disabled={!isEnable()}
                    onClick={createTable}
                >
                    Tạo mới
                </button>
            </div>
        </div>
    )
}