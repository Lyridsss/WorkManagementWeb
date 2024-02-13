import {Link, useNavigate, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import Input from "../../components/utils/Input.jsx";
import Textarea from "../../components/utils/Textarea.jsx";

export default function WorkspaceSettingsLayout(){
    const [data, isPending, isError, update] = useOutletContext()
    const [hidden, setHidden] = useState(true)
    const [background, setBackground] = useState(null)
    const [name, setName] = useState(() => data?.name)
    const [description, setDescription] = useState(() => data?.description)
    const [confirm, setConfirm] = useState("")
    const authAxiosRequest = useAuthAxiosRequest()
    const navigate = useNavigate()

    useEffect(() => {
        return () => {
            background && URL.revokeObjectURL(background.url)
        }
    }, [background]);

    const isErrorConfirm = () => {
        if (confirm === data?.name){
            return null
        }
        return ""
    }

    const isErrorName = () => {
        if (name.length === 0){
            return "Không được bỏ trống"
        } else if (name.length > 120){
            return "Tên không gian làm việc không được vượt quá 120 ký tự"
        }
        return null
    }

    const isErrorDescription = () => {
        if (description.length > 1000){
            return "Mô tả không được vượt quá 1000 ký tự"
        }
        return null
    }

    const isEnable = () => {
        return isErrorName() == null && isErrorDescription() == null
    }

    const uploadImageHandler = (e) => {
        const data = e.target.files[0]
        if (data != null){
            setBackground(() => {
                return {
                    file: data,
                    url: URL.createObjectURL(data)
                }
            })
        }
    }

    const updateBackgroundWorkspaceHandler = () => {
        const form = new FormData()
        form.append("image", background.file)
        authAxiosRequest
            .patch(`/workspaces/${data?.id}/background`, form)
            .then(() => {
                update()
            })
            .catch(error => {
                console.log(error)
            })
    }

    const deleteBackgroundWorkspaceHandler = () => {
        authAxiosRequest
            .delete(`/workspaces/${data?.id}/background`)
            .then(() => {
                update()
            })
            .catch(error => {
                console.log(error)
            })
    }

    const updateWorkspace = () => {
        const updateData = {
            name,
            description
        }
        authAxiosRequest
            .patch(`/workspaces/${data?.id}`, updateData)
            .then(() => {
                update()
            })
            .catch(error => {
                console.log(error)
            })
    }

    const deleteWorkspaceHandler = () => {
        authAxiosRequest
            .delete(`/workspaces/${data?.id}`)
            .then(() => {
                navigate("/workspaces")
            })
            .catch(error => {
                console.log(error)
            })
    }

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
                            <div className="dropdown">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="flex relative cursor-pointer mr-2"
                                    onMouseEnter={() => setHidden(false)}
                                    onMouseLeave={() => setHidden(true)}
                                >
                                    {
                                        data?.background == null ?
                                            <div className="avatar placeholder">
                                                <div
                                                    className="bg-info text-base-100 w-16 rounded-md"
                                                >
                                            <span className="text-3xl">
                                                {data?.name[0]}
                                            </span>
                                                </div>
                                            </div> :
                                            <div className="avatar">
                                                <div className="w-16 rounded-md">
                                                    <img
                                                        alt="workspace-background"
                                                        src={data?.background}
                                                    />
                                                </div>
                                            </div>
                                    }
                                    <span
                                        className={`w-full absolute bottom-0 ${hidden ? "hidden" : "flex"} justify-center py-0.5 bg-gray-900 opacity-80 text-sm text-base-100 rounded-b-md`}>
                                    Thay đổi
                                </span>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
                                >
                                    <li className="hover:text-primary">
                                        <button
                                            onClick={() => document.getElementById('upload-workspace-background').showModal()}
                                        >
                                            Cập nhật
                                        </button>
                                    </li>
                                    {
                                        data?.background != null &&
                                        <li className="hover:text-error">
                                            <button
                                                onClick={deleteBackgroundWorkspaceHandler}
                                            >
                                                Xóa ảnh
                                            </button>
                                        </li>
                                    }
                                </ul>
                            </div>
                            <dialog id="upload-workspace-background" className="modal">
                                <div className="modal-box">
                                    <label
                                        htmlFor="upload-workspace-background-input"
                                        className="flex flex-col justify-center items-center hover:cursor-pointer"
                                    >
                                        {
                                            background == null ?
                                                <div className="avatar placeholder">
                                                    <div
                                                        className="bg-neutral text-neutral-content rounded-md w-32"
                                                    >
                                                        <span className="text-3xl">
                                                            <i className="fa-solid fa-upload"></i>
                                                        </span>
                                                    </div>
                                                </div> :
                                                <div className="avatar">
                                                    <div
                                                        className="w-32 rounded-md">
                                                        <img
                                                            alt="Background"
                                                            src={background.url}/>
                                                    </div>
                                                </div>
                                        }
                                        <input
                                            id="upload-workspace-background-input"
                                            accept="image/*"
                                            type="file"
                                            onChange={e => {
                                                uploadImageHandler(e)
                                            }}
                                            hidden
                                        />
                                        <span className="my-2 text-sm">
                                            Tải hình ảnh
                                        </span>
                                    </label>
                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button
                                                className="btn hover:btn-primary mr-2"
                                                disabled={background == null}
                                                onClick={updateBackgroundWorkspaceHandler}
                                            >
                                                Cập nhật
                                            </button>
                                            <button
                                                className="btn hover:btn-error hover:text-base-100"
                                                onClick={() => {
                                                    background && URL.revokeObjectURL(background.url)
                                                    setBackground(null)
                                                }}
                                            >
                                                Hủy bỏ
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
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
                        <div className="w-full flex flex-col justify-center items-center mt-4">
                            <div
                                className="w-full flex flex-col justify-center items-center py-2 bg-base-200 rounded-box"
                            >
                                <Input
                                    label="Tên không gian làm việc"
                                    placeholder="Tên không gian làm việc ..."
                                    type="text"
                                    value={name}
                                    setValue={setName}
                                    error={isErrorName()}

                                />
                                <Textarea
                                    label="Mô tả"
                                    placeholder="Mô tả ..."
                                    value={description}
                                    setValue={setDescription}
                                    error={isErrorDescription()}
                                />
                                <button
                                    className="btn btn-outline btn-primary px-6 my-4"
                                    disabled={!isEnable()}
                                    onClick={updateWorkspace}
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </div>
                        <div className="w-full flex justify-start mt-4">
                            <button
                                className="btn hover:btn-error hover:text-base-100"
                                onClick={() =>
                                    document.getElementById('delete-workspace-modal').showModal()
                                }
                            >
                                Xóa không gian làm việc
                            </button>
                            <dialog id="delete-workspace-modal" className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg text-error">
                                        QUAN TRỌNG
                                    </h3>
                                    <p className="pt-2">
                                        Việc xóa không gian làm việc sẽ khiến cho những dữ liệu bên trong bị xóa bỏ và bạn sẽ không thể phục hồi lại.
                                        Nếu bạn đã nắm rõ điều đó và vẫn muốn xóa hãy nhập lại tên không gian làm việc
                                        <span
                                            className="font-semibold ml-2"
                                        >
                                            "{data?.name}"
                                        </span>.
                                    </p>
                                    <Input
                                        placeholder="Nhập lại ..."
                                        value={confirm}
                                        setValue={setConfirm}
                                        type="text"
                                        error={isErrorConfirm()}
                                    />
                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button
                                                className="btn hover:btn-primary mr-2"
                                                disabled={isErrorConfirm() !== null}
                                                onClick={deleteWorkspaceHandler}
                                            >
                                                Thực hiện
                                            </button>
                                            <button
                                                className="btn hover:btn-error hover:text-base-100"
                                                onClick={() => {
                                                    setConfirm("")
                                                }}
                                            >
                                                Hũy bỏ
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>
            }
        </>
    )
}