import Input from "../../components/utils/Input.jsx";
import {useState} from "react";
import {Link, useOutletContext} from "react-router-dom";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";

export default function Profile(){
    const [data, isPending, update] = useOutletContext()
    const authAxiosRequest = useAuthAxiosRequest()
    const [name, setName] = useState(() => data?.name)
    const [organization, setOrganization] = useState(() => data?.organization || "")
    const [department, setDepartment] = useState(() => data?.department || "")
    const [title, setTitle] = useState(() => data?.title || "")

    const updateProfileAccount = () => {
        const profile = {
            name,
            organization,
            department,
            title
        }
        authAxiosRequest
            .patch("/account", profile)
            .then(res => {
                update()
                window.scrollTo(0, 0)
            })
            .catch(error => {
                // ???
                console.log(error)
            })
    }

    const isValidName = () => {
        if (name === ""){
            return "Tên không được để trống"
        } else if (name.length > 50) {
            return "Tên chứa tối đa 50 ký tự"
        }
        return null
    }

    const isValidAttribute = ( attribute, message ) => {
        if (attribute.length > 255) {
            return `Tên ${message} chứa tối đa 255 ký tự`
        }
        return null
    }

    const isActive = () => {
        return name.length > 0 && name.length <= 255 && organization.length <= 255 && department.length <= 255 && title.length <= 255;
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mt-4 mb-2 font-bold">
                <h1>
                    Giới thiệu
                </h1>
            </div>
            <div
                className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 flex flex-col justify-center items-center py-2 bg-base-200 rounded-box"
            >
                <Input
                    label="Họ và tên"
                    placeholder="Họ và tên ..."
                    type="text"
                    value={name}
                    setValue={setName}
                    error={isValidName()}
                />
                <Input
                    label="Tổ chức"
                    placeholder="Tổ chức ..."
                    type="text"
                    value={organization}
                    setValue={setOrganization}
                    error={isValidAttribute(organization, "tổ chức")}
                />
                <Input
                    label="Phòng ban"
                    placeholder="Phòng ban ..."
                    type="text"
                    value={department}
                    setValue={setDepartment}
                    error={isValidAttribute(department, "phòng ban")}
                />
                <Input
                    label="Chức vụ"
                    placeholder="Chức vụ ..."
                    type="text"
                    value={title}
                    setValue={setTitle}
                    error={isValidAttribute(title, "chức vụ")}
                />
                <button
                    className="btn btn-outline btn-primary px-6 my-4"
                    disabled={!isActive()}
                    onClick={updateProfileAccount}
                >
                    Cập nhật
                </button>
            </div>
            <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mt-4 mb-2 font-bold">
                <h1>
                    Bảo mật
                </h1>
            </div>
            <div
                className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 flex flex-col justify-center items-center py-4 bg-base-200 rounded-box"
            >
                <label className="form-control w-full max-w-md my-1">
                    <div className="label ml-2">
                        <span className="label-text">Địa chỉ email</span>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center">
                        <input
                            type="text"
                            placeholder="Địa chỉ email ..."
                            className="input input-bordered w-full max-w-md disabled:input-bordered ml-2 mr-1"
                            value={data?.email}
                            disabled
                        />
                        <Link
                            to="/account/email"
                            className="btn btn-outline btn-primary px-6 ml-1 mr-2"
                        >
                            Cập nhật
                        </Link>
                    </div>
                </label>
                <label className="form-control w-full max-w-md my-1">
                    <div className="label ml-2">
                        <span className="label-text">Mật khẩu</span>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center">
                        <input
                            type="text"
                            placeholder="Mật khẩu ..."
                            className="input input-bordered w-full max-w-md disabled:input-bordered ml-2 mr-1"
                            value="********"
                            disabled
                        />
                        <Link
                            to="/account/password"
                            className="btn btn-outline btn-primary px-6 ml-1 mr-2"
                        >
                            Cập nhật
                        </Link>
                    </div>
                </label>
            </div>
        </div>
    )
}