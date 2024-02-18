import IntroHeader from "../../components/header/IntroHeader.jsx";
import {useEffect, useState} from "react";
import Input from "../../components/utils/Input.jsx";
import {useNavigate} from "react-router-dom";
import { axiosRequest } from "../../utils/axiosRequest.js";

export default function RegisterPage(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const navigate = useNavigate()
    const [validEmail, setValidEmail] = useState({
        isValid: true,
        message: ""
    })

    useEffect(() => {
        const emailRegEx = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
        if (emailRegEx.test(email)){
            axiosRequest.get(`/auth/exist-email?value=${email}`)
                .then(res => {
                    setValidEmail({
                        isValid: true,
                        message: res.data.email
                    })
                })
                .catch(error => {
                    setValidEmail({
                        isValid: false,
                        message: error.response?.data.email
                    })
                })
        } else {
            setValidEmail({
                isValid: false,
                message: "Email không hợp lệ"
            })
        }
    }, [email]);

    const isErrorEmail = () => {
        if (validEmail.isValid) {
            return null
        }
        return validEmail.message
    }

    const isErrorName = () => {
        if (name === ""){
            return "Tên không được để trống"
        } else if (name.length > 50) {
            return "Tên chứa tối đa 50 ký tự"
        }
        return null
    }

    const isErrorPassword = () => {
        const passwordRegEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+-]).{8,}$")
        if (passwordRegEx.test(password)){
            return null
        }
        return "Mật khẩu cần có tối thiểu 8 ký tự, bao gồm ít nhất một chữ hoa, chữ thường, kí tự và số"
    }

    const isErrorConfirm = () => {
        if (password === confirm){
            return null
        }
        return "Mật khẩu không khớp"
    }

    const register = () => {
        const data = {
            name,
            email,
            password
        }
        axiosRequest
            .post("/auth/register", data)
            .then(() => {
                navigate("/login")
            })
            .catch(error => {
                setValidEmail({
                    isValid: false,
                    message: error.response?.data.message
                })
            })
    }

    const isEnable = () => {
        return isErrorName() == null && isErrorEmail() == null && isErrorPassword() == null && isErrorConfirm() == null;
    }

    return (
        <div className="bg-base-100 min-h-screen">
            <IntroHeader/>
            <div className="flex justify-center items-center py-14">
                <div className="flex flex-col items-center py-4 px-6 border w-11/12 sm:w-3/4 lg:w-5/12 bg-base-200 drop-shadow-md rounded-md">
                    <h1
                        className="text-3xl text-primary font-bold px-4 py-4"
                    >
                        ĐĂNG KÝ
                    </h1>
                    <div className="flex flex-col items-center w-full">
                        <Input
                            value={name}
                            setValue={setName}
                            label="Họ và tên"
                            placeholder="Họ và tên ..."
                            style={"bg-base-100 text-base-content"}
                            type="text"
                            error={isErrorName()}
                        />
                        <Input
                            value={email}
                            setValue={setEmail}
                            label="Địa chỉ email"
                            placeholder="Địa chỉ email ..."
                            style={"bg-base-100 text-base-content"}
                            type="text"
                            error={isErrorEmail()}
                        />
                        <Input
                            value={password}
                            setValue={setPassword}
                            label="Mật khẩu"
                            placeholder="Mật khẩu ..."
                            style={"bg-base-100 text-base-content"}
                            type="password"
                            error={isErrorPassword()}
                        />
                        <Input
                            value={confirm}
                            setValue={setConfirm}
                            label="Nhập lại mật khẩu"
                            placeholder="Nhập lại mật khẩu ..."
                            style={"bg-base-100 text-base-content"}
                            type="password"
                            error={isErrorConfirm()}
                        />
                        <button
                            className={`btn btn-outline btn-primary px-6 mt-5 mb-3`}
                            disabled={!isEnable()}
                            onClick={register}
                        >
                            Đăng ký
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}