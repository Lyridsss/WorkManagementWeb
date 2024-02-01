import IntroHeader from "../components/IntroHeader.jsx";
import {useEffect, useState} from "react";
import Input from "../components/Input.jsx";
import {config} from "../config/index.jsx";
import {axiosRequest} from "../utils/axiosRequest.js";
import {useNavigate} from "react-router-dom";

export default function RegisterPage(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const navigate = useNavigate()
    const [validEmail, setValidEmail] = useState({isValid: true, message: ""})
    const passwordRegEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+-]).{8,}$")
    const {textColorLight, backgroundPage}  = config.theme

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

    const isValidName = () => {
        return name.length <= 50
    }

    const isValidPassword = () => {
        return passwordRegEx.test(password)
    }

    const isValidConfirmPassword = () => {
        return password === confirm
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
                console.log(error)
            })
    }

    return (
        <div className={`${backgroundPage} min-h-screen`}>
            <IntroHeader/>
            <div className="flex justify-center items-center py-20">
                <div className="flex flex-col items-center py-4 px-6 border w-11/12 sm:w-3/4 lg:w-5/12 bg-gray-100 drop-shadow-md rounded-md">
                    <h1
                        className="text-3xl text-primary font-bold px-4 py-4"
                    >
                        ĐĂNG KÝ TÀI KHOẢN
                    </h1>
                    <form className="flex flex-col items-center w-full">
                        <Input
                            value={name}
                            setValue={setName}
                            label="Họ và tên"
                            placeholder="Họ và tên ..."
                            style={`${backgroundPage} ${textColorLight}`}
                            type="text"
                            error={isValidName() ? null : "Tên chứa tối đa 50 ký tự"}
                        />
                        <Input
                            value={email}
                            setValue={setEmail}
                            label="Địa chỉ email"
                            placeholder="Địa chỉ email ..."
                            style={`${backgroundPage} ${textColorLight}`}
                            type="text"
                            error={validEmail.isValid ? null : validEmail.message}
                        />
                        <Input
                            value={password}
                            setValue={setPassword}
                            label="Mật khẩu"
                            placeholder="Mật khẩu ..."
                            style={`${backgroundPage} ${textColorLight}`}
                            type="password"
                            error={isValidPassword() ? null : "Mật khẩu cần có tối thiểu 8 ký tự, bao gồm ít nhất một chữ hoa, chữ thường, kí tự và số."}
                        />
                        <Input
                            value={confirm}
                            setValue={setConfirm}
                            label="Nhập lại mật khẩu"
                            placeholder="Nhập lại mật khẩu ..."
                            style={`${backgroundPage} ${textColorLight}`}
                            type="password"
                            error={isValidConfirmPassword() ? null : "Mật khẩu không khớp"}
                        />
                        <button
                            className={`btn btn-outline btn-primary px-6 mt-4`}
                            disabled={!isValidConfirmPassword() || !isValidName() || !isValidPassword() || !validEmail.isValid}
                            onClick={e => {
                                e.preventDefault()
                                register()
                            }}
                        >
                            Đăng ký
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}