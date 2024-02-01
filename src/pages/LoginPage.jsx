import {config} from "../config/index.jsx";
import IntroHeader from "../components/IntroHeader.jsx";
import Input from "../components/Input.jsx";
import {useContext, useState} from "react";
import {axiosRequest} from "../utils/axiosRequest.js";
import {AuthContext} from "../context/AuthenticationContext.jsx";
import {useNavigate} from "react-router-dom";

export default function LoginPage(){
    const {textColorLight, backgroundPage}  = config.theme
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState()
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)
    const emailRegEx = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
    const passwordRegEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+-]).{8,}$")

    const isValidEmail = () => {
        return emailRegEx.test(email)
    }

    const isValidPassword = () => {
        return passwordRegEx.test(password)
    }

    const submitHandler = () => {
        const data = {
            email,
            password
        }
        axiosRequest
            .post("/auth/login", data)
            .then(res => {
                login(res.data.token)
            })
            .then(() => {
                navigate("/")
            })
            .catch(() => {
                setEmail("")
                setPassword("")
                setError("Tài khoản hoặc mật khẩu không chính xác")
            })
    }

    const emailHandler = (email) => {
        setEmail(email)
        setError(null)
    }

    return (
        <div className={`${backgroundPage} min-h-screen`}>
            <IntroHeader/>
            <div className="flex justify-center items-center py-20 lg:py-32">
                <div
                    className="flex flex-col items-center py-4 px-6 border w-11/12 sm:w-3/4 lg:w-5/12 bg-gray-100 drop-shadow-md rounded-md"
                >
                    <h1
                        className="text-3xl text-primary font-bold px-4 py-4"
                    >
                        ĐĂNG NHẬP
                    </h1>
                    <form className="flex flex-col items-center w-full">
                        <Input
                            value={email}
                            setValue={emailHandler}
                            label="Địa chỉ email"
                            placeholder="Địa chỉ email ..."
                            style={`${backgroundPage} ${textColorLight}`}
                            type="text"
                            error={(isValidEmail() && error == null) ? null : error || "Email không hợp lệ"}
                        />
                        <Input
                            value={password}
                            setValue={setPassword}
                            label="Mật khẩu"
                            placeholder="Mật khẩu ..."
                            style={`${backgroundPage} ${textColorLight}`}
                            type="password"
                            error={isValidPassword() ? null : "Mật khẩu không hợp lệ"}
                        />
                        <button
                            className={`btn btn-outline btn-primary px-6 mt-4`}
                            disabled={!isValidEmail() || !isValidPassword()}
                            onClick={e => {
                                e.preventDefault()
                                submitHandler()
                            }}
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}