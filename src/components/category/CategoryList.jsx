import {useQuery} from "@tanstack/react-query";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useState} from "react";
import Input from "../utils/Input.jsx";
import CardList from "../card/CardList.jsx";

export default function CategoryList({ tableId, update, updateCategoryList, table }){
    const authAxiosRequest = useAuthAxiosRequest()
    const { data, isPending, isError } = useQuery({
        queryKey: ["category-list", tableId, update],
        queryFn: () => {
            return authAxiosRequest
                .get(`/tables/${tableId}/categories`)
                .then(res => res.data)
                .catch(error => console.log(error.response?.data))
        }
    })
    const [categoryName, setCategoryName] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [deletedCategory, setDeletedCategory] = useState(null)
    const [error, setError] = useState(null)
    const updateCategory = () => {
        const payload = {
            name: categoryName
        }
        authAxiosRequest
            .patch(`/categories/${categoryId}`, payload)
            .then(() => {
                updateCategoryList()
            })
            .catch(e => {
                setError(e.response?.data.message)
                document.getElementById('update-category-model').showModal()
            })
    }

    const deleteCategory = () => {
        authAxiosRequest
            .delete(`/categories/${deletedCategory?.id}`)
            .then(() => {
                updateCategoryList()
            })
            .catch(e => {
                return console.log(e.response?.data)
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
        <>
            {(isPending || isError) ?
                <>
                    <div className="skeleton min-w-72 h-20 m-2">
                    </div>
                    <div className="skeleton min-w-72 h-20 m-2">
                    </div>
                    <div className="skeleton min-w-72 h-20 m-2">
                    </div>
                </> :
                <>
                    {data?.map(category =>
                        <div
                            className="min-w-72 max-w-80 h-fit flex flex-col bg-base-200 m-2 rounded-md border"
                            key={category.id}
                        >
                            <div
                                className="w-full flex justify-between py-2.5 px-2 bg-base-300 text-base-content rounded-t-md rounded-b-none"
                            >
                        <span className="font-semibold">
                            {category.name}
                        </span>
                                {(table?.role === "ADMIN" || table?.role === "MEMBER") &&
                                    <div className="dropdown">
                                        <div tabIndex={0} role="button" className="hover:text-primary">
                                            <i className="fa-solid fa-ellipsis"></i>
                                        </div>
                                        <ul tabIndex={0}
                                            className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li>
                                                <button
                                                    className="font-semibold text-yellow-500"
                                                    onClick={() => {
                                                        setCategoryId(category.id)
                                                        setCategoryName(category.name)
                                                        document.getElementById('update-category-model').showModal()
                                                    }}
                                                >
                                                    Cập nhật
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="font-semibold text-red-500"
                                                    onClick={() => {
                                                        setDeletedCategory(category)
                                                        document.getElementById('delete-category-modal').showModal()
                                                    }}
                                                >
                                                    Xóa
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                }
                            </div>
                            <CardList categoryId={category.id} table={table}/>
                        </div>
                    )}
                    <dialog id="update-category-model" className="modal">
                        <div className="modal-box">
                            <h1 className="font-semibold">
                                Cập nhật danh mục
                            </h1>
                            <Input
                                value={categoryName}
                                setValue={updateCategoryName}
                                error={isErrorCategoryName()}
                                type="text"
                                placeholder="Tên danh mục"
                                label="Tên danh mục"
                            />
                            <div className="modal-action">
                                <form method="dialog">
                                    <button
                                        className="btn btn-primary mr-2"
                                        onClick={updateCategory}
                                        disabled={isErrorCategoryName() != null}
                                    >
                                        Cập nhật
                                    </button>
                                    <button
                                        className="btn btn-error"
                                        onClick={() => {
                                            setCategoryId("")
                                            setCategoryName("")
                                            setError(null)
                                        }}
                                    >
                                        Hủy bỏ
                                    </button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                    <dialog id="delete-category-modal" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-error">
                                QUAN TRỌNG
                            </h3>
                            <p className="pt-2">
                                Việc xóa danh mục công việc sẽ khiến cho những dữ liệu bên trong bị xóa bỏ và bạn sẽ không
                                thể phục hồi lại.
                            </p>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button
                                        className="btn hover:btn-primary mr-2"
                                        onClick={deleteCategory}
                                    >
                                        Thực hiện
                                    </button>
                                    <button
                                        className="btn hover:btn-error hover:text-base-100"
                                        onClick={() => {
                                            setDeletedCategory(null)
                                        }}
                                    >
                                        Hũy bỏ
                                    </button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </>
            }
        </>
    )
}