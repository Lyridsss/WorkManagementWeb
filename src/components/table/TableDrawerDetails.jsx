
export default function TableDrawerDetails({ table, options, setDisplay  }){
    const getScopeName = scope => {
        if (scope === "GROUP") {
            return "Nhóm"
        }
        return "Không gian làm việc"
    }
    return (
        <>
            <div className="w-full flex justify-center items-center text-xl font-bold py-2 border-b-2 relative">
                <p>
                    THÔNG TIN
                </p>
                <button
                    className="flex absolute left-1 hover:text-primary"
                    onClick={() => setDisplay(options.home)}
                >
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
            </div>
            <div
                className="flex flex-row my-1 w-full rounded-md p-1"
            >
            {
                    table?.background == null ?
                        <div className="avatar placeholder mr-2">
                            <div
                                className="bg-info text-base-100 w-20 rounded-md"
                            >
                                <span className="text-lg">
                                    {table?.name[0]}
                                </span>
                            </div>
                        </div> :
                        <div className="avatar mr-2">
                            <div className="w-20 rounded-md">
                                <img
                                    alt="workspace-background"
                                    src={table?.background}
                                />
                            </div>
                        </div>
                }
                <div className="flex flex-col">
                    <div className="flex justify-start items-start font-semibold text-lg">
                        {table?.name}
                    </div>
                    <div className="flex text-sm">
                        <div className="mr-1.5">
                            {
                                table?.scope === "GROUP" ?
                                    <>
                                        <i className="fa-solid fa-lock text-red-600"></i>
                                    </> :
                                    <>
                                        <i className="fa-solid fa-user-group text-green-600"></i>
                                    </>
                            }
                        </div>
                        <div>
                            {getScopeName(table?.scope)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-1">
                <span className="font-bold mr-1">
                    Mô tả:
                </span>
                {table?.description}
            </div>
        </>
    )
}