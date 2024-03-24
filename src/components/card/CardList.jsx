import {useState} from "react";
import CategoryForm from "../category/CategoryForm.jsx";
import Input from "../utils/Input.jsx";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";

export default function CardList({ table, categoryId }){
    const [showCardForm, setShowCardForm] = useState(false)
    const [name, setName] = useState("")
    const authAxiosRequest = useAuthAxiosRequest()
    const [times, setTimes] = useState(0)
    const { data, isPending, isError } = useQuery({
        queryKey: ["card-list", categoryId, times],
        queryFn: () => {
            return authAxiosRequest
                .get(`/categories/${categoryId}/cards`)
                .then(res => res.data)
                .catch(e => console.log(e.response?.data))
        }
    })

    const update = () => {
        setTimes(prevState => prevState + 1)
    }

    const isErrorName = () => {
        if (name.length === 0){
            return "Không được bỏ trống"
        } else if (name.length > 120){
            return "Tên thẻ không vượt quá 120 ký tự"
        }
        return null
    }

    const createCard = () => {
        const payload = {
            name
        }
        authAxiosRequest
            .post(`/categories/${categoryId}/cards`, payload)
            .then(() => {
                update()
                setShowCardForm(false)
                setName("")
            })
            .catch(e => {
                return console.log(e.response?.data)
            })
    }

    return (
        <div className="w-full">
            {
                data?.map(card =>
                    <div
                        key={card.id}
                        className="max-w-72 p-2 m-2 font-semibold bg-white cursor-pointer drop-shadow-md rounded-md hover:text-primary border"
                    >
                        {card.name}
                    </div>
                )
            }
            {
                (table?.role === "ADMIN" || table?.role === "MEMBER") &&
                <>
                    {
                        showCardForm === false ?
                            <button
                                className="btn btn-outline hover:bg-base-300 hover:outline-base-300 hover:border-base-300 hover:text-base-content max-w-72 m-2"
                                onClick={() => {
                                    setShowCardForm(true)
                                }}
                            >
                                <i className="fa-solid fa-plus"></i>
                                <p>
                                    Thêm thẻ
                                </p>
                            </button> :
                            <div className="max-w-72 h-fit p-1 m-2 flex flex-col border rounded-md">
                                <div className="w-full flex">
                                    <Input
                                        value={name}
                                        setValue={setName}
                                        error={isErrorName()}
                                        type="text"
                                        placeholder="Tên thẻ"
                                        label="Tên thẻ"
                                    />
                                </div>
                                <div className="w-full flex justify-between">
                                    <button
                                        className="btn btn-primary mt-1 w-1/3"
                                        onClick={createCard}
                                        disabled={isErrorName() != null}
                                    >
                                        Thêm
                                    </button>
                                    <button
                                        className="btn btn-error mt-1 w-1/3"
                                        onClick={() => {
                                            setName("")
                                            setShowCardForm(false)
                                        }}
                                    >
                                        Đóng
                                    </button>
                                </div>
                            </div>
                    }

                </>
            }
        </div>
    )
}