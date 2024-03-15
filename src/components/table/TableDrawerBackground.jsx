export default function TableDrawerBackground({ table, options, setDisplay  }){
    return (
        <>
            <div className="w-full flex justify-center items-center text-xl font-bold py-2 border-b-2 relative">
                <p>
                    THAY ĐỔI HÌNH NỀN
                </p>
                <button
                    className="flex absolute left-1 hover:text-primary"
                    onClick={() => setDisplay(options.home)}
                >
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
            </div>
            <div className="grid grid-cols-2 gap-1">
                <div className="col-span-1 bg-base-300 rounded-md h-32">

                </div>
            </div>
        </>
    )
}