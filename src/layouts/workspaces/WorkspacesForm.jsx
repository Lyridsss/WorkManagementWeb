import Input from "../../components/Input.jsx";
import Textarea from "../../components/Textarea.jsx";
import {useState} from "react";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useNavigate} from "react-router-dom";

export default function WorkspacesForm() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const authAxiosRequest = useAuthAxiosRequest()
    const navigate = useNavigate()

    const isErrorName = () => {
        if (name.length === 0){
            return "Không được bỏ trống"
        } else if (name.length > 120){
            return "Tên không gian làm việc không được vượt quá 120 ký tự"
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

    const createWorkspace = () => {
        const workspace = {
            name,
            description
        }
        authAxiosRequest
            .post("/workspaces", workspace)
            .then(() => {
                navigate("/")
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 flex justify-center mt-14 mb-4 font-bold">
                <h1 className="text-2xl text-primary">
                    KHÔNG GIAN LÀM VIỆC
                </h1>
            </div>
            <div
                className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 flex flex-col justify-center items-center py-2 bg-base-200 rounded-box"
            >
                <Input
                    label="Tên không gian làm việc"
                    placeholder="Tên không gian làm việc ..."
                    type="text"
                    value={name}
                    setValue={setName}
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
                    className="btn btn-outline btn-primary px-6 my-4"
                    disabled={!isEnable()}
                    onClick={createWorkspace}
                >
                    Tạo mới
                </button>
            </div>
        </div>
    )
}