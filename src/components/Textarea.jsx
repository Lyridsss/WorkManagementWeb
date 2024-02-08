import {useState} from "react";

export default function Textarea({ value, setValue, label, placeholder, style, error }){
    const [isChange, setIsChange] = useState(false)
    const status = () => {
        if (isChange){
            if (error != null){
                return "textarea-error"
            } else {
                return "textarea-success"
            }
        }
        return ""
    }
    return (
        <label className="form-control w-full max-w-xs my-1">
            <div className="label">
                <span className="label-text text-gray-500">
                    {label}
                </span>
            </div>
            <textarea
                className={`textarea textarea-bordered h-32 w-full max-w-xs ${status()}`}
                placeholder={placeholder}
                value={value}
                onChange={e => {
                    setValue(e.target.value)
                    if (!isChange) {
                        setIsChange(true)
                    }
                }}
            >
            </textarea>
            {error != null && isChange &&
                <div className="label">
                    <span className="label-text-alt text-sm text-red-400">{error}</span>
                </div>
            }
        </label>
    )
}