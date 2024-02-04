import Input from "../components/Input.jsx";
import {useState} from "react";

export default function Profile(){
    const [name, setName] = useState("")
    return (
        <div className="w-full flex justify-center items-center bg-base-200 my-4 rounded-box">
            <Input
                label="Họ và tên"
                value={name}
                setValue={setName}
            />
        </div>
    )
}