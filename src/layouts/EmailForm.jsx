import Input from "../components/Input.jsx";
import {useEffect, useState} from "react";
import {axiosRequest} from "../utils/axiosRequest.js";
import {useAuthAxiosRequest} from "../hooks/Request.jsx";
import {useNavigate, useOutletContext} from "react-router-dom";

export default function EmailForm(){
    const [email, setEmail] = useState("")
    const authAxiosRequest = useAuthAxiosRequest()
    const navigate = useNavigate()
    const [data, isPending, update] = useOutletContext()
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

    const isEnable = () => {
        return isErrorEmail() == null
    }

    const updateEmail = () => {
        const data = {
            email
        }
        authAxiosRequest
            .patch("/account/email", data)
            .then(res => {
                update()
                navigate("/account")
            })
            .catch(error => {
                setValidEmail({
                    isValid: false,
                    message: error.response?.data.message
                })
            })
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mt-14 mb-2 font-bold">
                <h1>
                    Cập nhật email
                </h1>
            </div>
            <div
                className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 flex flex-col justify-center items-center py-2 bg-base-200 rounded-box"
            >
                <Input
                    label="Địa chỉ email"
                    placeholder="Địa chỉ email ..."
                    type="text"
                    value={email}
                    setValue={setEmail}
                    error={isErrorEmail()}
                />
                <button
                    className="btn btn-outline btn-primary px-6 my-4"
                    disabled={!isEnable()}
                    onClick={updateEmail}
                >
                    Cập nhật
                </button>
            </div>
        </div>
    )
}