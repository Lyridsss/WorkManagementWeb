import {Link, useOutletContext} from "react-router-dom";

export default function WorkspaceMemberLayout(){
    const [data, isPending, isError, update] = useOutletContext()

    return (
        <>
            {
                isPending ?
                    <div className="w-full flex flex-col">
                        <div className="w-full flex items-center">
                            <div className="skeleton w-16 h-16 mr-2"></div>
                            <div className="skeleton h-6 w-32"></div>
                        </div>
                    </div> :
                    <div
                        className="w-full flex flex-col"
                    >
                        <div className="w-full flex items-start py-2 border-b border-stone-300">
                            {
                                data?.background == null ?
                                    <div className="avatar placeholder mr-2">
                                        <div
                                            className="bg-info text-base-100 w-16 rounded-md"
                                        >
                                            <span className="text-3xl">
                                                {data?.name[0]}
                                            </span>
                                        </div>
                                    </div> :
                                    <div className="avatar mr-2">
                                        <div className="w-16 rounded-md">
                                            <img
                                                alt="workspace-background"
                                                src={data?.background}
                                            />
                                        </div>
                                    </div>
                            }
                            <div className="flex flex-col mx-2">
                                <Link
                                    to={`/workspaces/${data?.id}`}
                                    className="text-2xl font-bold"
                                >
                                    {data?.name}
                                </Link>
                                <p className="my-0.5 text-sm">
                                    {data?.description}
                                </p>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}