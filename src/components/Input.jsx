import {useState} from "react";

export default function Input({ value, setValue, label, placeholder, style, type, error }){
    const [isChange, setIsChange] = useState(false)

    return (
        <label className="form-control w-full max-w-xs my-1">
            <div className="label">
                <span className="label-text text-gray-500">{label}</span>
            </div>
            <input type={type}
                   placeholder={placeholder}
                   className={`input input-bordered w-full max-w-xs ${style} ${(error != null && isChange) ? "input-error" : ""} ${(error == null && isChange) ? "input-success" : ""}`}
                   value={value}
                   onChange={event => {
                       setValue(event.target.value)
                       if (!isChange) {
                            setIsChange(true)
                       }
                   }}
            />
            {error != null && isChange &&
                <div className="label">
                    <span className="label-text-alt text-sm text-red-400">{error}</span>
                </div>
            }
        </label>
    )
}