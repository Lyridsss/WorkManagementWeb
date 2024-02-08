import Input from "../../components/Input.jsx";
import {useContext, useState} from "react";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {AuthContext} from "../../context/AuthenticationContext.jsx";

export default function PasswordForm(){
    const [current, setCurrent] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [error, setError] = useState(null)
    const authAxiosRequest = useAuthAxiosRequest()
    const { logout } = useContext(AuthContext)

    const isErrorCurrentPassword = () => {
        const passwordRegEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+-]).{8,}$")
        if (error){
            return error
        }
        if (passwordRegEx.test(current)){
            return null
        }
        return "Mật khẩu không hợp lệ"
    }

    const isErrorNewPassword = () => {
        const passwordRegEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+-]).{8,}$")
        if (passwordRegEx.test(password)){
            return null
        }
        return "Mật khẩu không hợp lệ"
    }

    const isErrorConfirm = () => {
        if (password === confirm){
            return null
        }
        return "Mật khẩu không khớp"
    }

    const currentPasswordHandler = (current) => {
        setError(null)
        setCurrent(current)
    }

    const isEnable = () => {
        return isErrorCurrentPassword() == null && isErrorNewPassword() == null && isErrorConfirm() == null
    }

    const updatePasswordHandler = () => {
        const data = {
            current,
            password,
            confirm
        }
        authAxiosRequest
            .patch("/account/password", data)
            .then(() => {
                logout()
            })
            .catch(error => {
                if (error.response.status === 401){
                    setError("Mật khẩu không chính xác")
                }
            })
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mt-10 mb-2 font-bold">
                <h1>
                    Đổi mật khẩu
                </h1>
            </div>
            <div
                className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 flex flex-col justify-center items-center py-2 bg-base-200 rounded-box"
            >
                <Input
                    label="Mật khẩu hiện tại"
                    placeholder="Mật khẩu hiện tại ..."
                    type="password"
                    value={current}
                    setValue={currentPasswordHandler}
                    error={isErrorCurrentPassword()}
                />
                <Input
                    label="Mật khẩu mới"
                    placeholder="Mật khẩu mới ..."
                    type="password"
                    value={password}
                    setValue={setPassword}
                    error={isErrorNewPassword()}
                />
                <Input
                    label="Nhập lại mật khẩu"
                    placeholder="Nhập lại mật khẩu ..."
                    type="password"
                    value={confirm}
                    setValue={setConfirm}
                    error={isErrorConfirm()}
                />
                <button
                    className="btn btn-outline btn-primary px-6 my-4"
                    disabled={!isEnable()}
                    onClick={updatePasswordHandler}
                >
                    Cập nhật
                </button>
            </div>
        </div>
    )
}