import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";

export default function TableDrawerBackground({ table, options, setDisplay, update  }){
    const authAxiosRequest = useAuthAxiosRequest()
    const { data, isPending, isError } = useQuery({
        queryKey: ["table-background"],
        queryFn: () =>
            authAxiosRequest
                .get(`/images`)
                .then(res => res.data)
                .catch(error => console.log(error))
    })
    const updateBackground = imageId => {
        if (imageId == null) {
            return null
        }
        const data = {
            id: imageId
        }
        authAxiosRequest
            .patch(`/tables/${table?.id}/background`, data)
            .then(() => {
                update()
            })
            .catch(error => console.log(error))
    }

    const deleteBackground = () => {
        authAxiosRequest
            .delete(`/tables/${table?.id}/background`)
            .then(() => {
                update()
            })
            .catch(error => console.log(error))
    }
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
                <div
                    className="col-span-1 flex justify-center items-center bg-base-300 rounded-md hover:cursor-pointer"
                    onClick={deleteBackground}
                >
                    None
                </div>
                {data?.map(image =>
                    <img
                        key={image.id}
                        src={image.imageUri}
                        alt="Image"
                        className="hover:cursor-pointer"
                        onClick={() => updateBackground(image.id)}
                    />
                )}
            </div>
        </>
    )
}