import {useOutletContext} from "react-router-dom";
import TableStar from "./TableStar.jsx";
import TableScope from "./TableScope.jsx";
import JoiningTable from "./JoiningTable.jsx";
import TableDrawer from "./TableDrawer.jsx";
import {useState} from "react";
import CategoryForm from "../category/CategoryForm.jsx";
import {useQuery} from "@tanstack/react-query";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import CategoryList from "../category/CategoryList.jsx";

export default function TableHomeView(){
    const { data, update } = useOutletContext()
    const { workspace, table } = data
    const tableId = table?.id
    const [showCategoryForm, setShowCategoryForm] = useState(false)
    const [times, setTimes] = useState(0)
    const updateCategoryList = () => {
        setTimes(prevState => prevState + 1)
    }

    return (
        <div
            className="w-full h-full flex flex-row overflow-x-auto overflow-y-hidden"
            style={{
                backgroundImage: `url("${table?.background}")`,
                backgroundColor: "#f9fafb",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}
        >
            <CategoryList tableId={tableId} update={times} updateCategoryList={updateCategoryList} table={table}/>
            {
                (table?.role === "ADMIN" || table?.role === "MEMBER") &&
                <>
                    {
                        showCategoryForm === false ?
                            <button
                                className="btn btn-outline hover:bg-base-300 hover:outline-base-300 hover:border-base-300 hover:text-base-content w-72 m-2"
                                onClick={() => {
                                    setShowCategoryForm(true)
                                }}
                            >
                                <i className="fa-solid fa-plus"></i>
                                <p>
                                    Thêm danh sách
                                </p>
                            </button> :
                            <CategoryForm
                                tableId={table?.id}
                                setShowCategoryForm={setShowCategoryForm}
                                updateCategoryList={updateCategoryList}
                            />
                    }
                </>
            }
        </div>
    )
}