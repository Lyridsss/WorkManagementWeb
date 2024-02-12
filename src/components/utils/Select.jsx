export default function Select({ label, items, value, setValue }){
    return (
        <label className="form-control w-full max-w-xs my-1">
            <div className="label">
                <span className="label-text text-gray-500">
                    {label}
                </span>
            </div>
            <select
                className="select select-bordered"
                value={value}
                onChange={e => {
                    setValue(e.target.value)
                }}
            >
                {items?.map(item =>
                    <option
                        key={item.value}
                        value={item.value}
                    >
                        {item.title}
                    </option>
                )}
            </select>
        </label>
    )
}