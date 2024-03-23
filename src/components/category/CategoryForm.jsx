import {useState} from "react";
import Input from "../utils/Input.jsx";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";

export default function CategoryForm({ tableId, setShowCategoryForm, updateCategoryList }){
    const [categoryName, setCategoryName] = useState("")
    const [error, setError] = useState(null)
    const authAxiosRequest = useAuthAxiosRequest()
    const createCategory = () => {
        const data = {
            name: categoryName
        }
        authAxiosRequest
            .post(`/tables/${tableId}/categories`, data)
            .then(() => {
                updateCategoryList()
                setShowCategoryForm(false)
            })
            .catch(e => {
                setError(e.response?.data.message)
            })
    }

    const updateCategoryName = name => {
        setError(null)
        setCategoryName(name)
    }

    const isErrorCategoryName = () => {
        if (error) {
            return error
        }
        if (categoryName.length === 0){
            return "Không được bỏ trống"
        } else if (categoryName.length > 120){
            return "Tên danh mục không vượt quá 120 ký tự"
        }
        return null
    }

    return (
        <div className="min-w-72 h-fit p-1 m-2 flex flex-col border rounded-md">
            <div className="w-full flex">
                <Input
                    value={categoryName}
                    setValue={updateCategoryName}
                    error={isErrorCategoryName()}
                    type="text"
                    placeholder="Tên danh mục"
                    label="Tên danh mục"
                />
            </div>
            <div className="w-full flex justify-between">
                <button
                    className="btn btn-primary mt-1 w-1/3"
                    onClick={createCategory}
                    disabled={isErrorCategoryName() != null}
                >
                    Thêm
                </button>
                <button
                    className="btn btn-error mt-1 w-1/3"
                    onClick={() => {
                        setShowCategoryForm(false)
                    }}
                >
                    Đóng
                </button>
            </div>
        </div>
    )
}