import {Link} from "react-router-dom";

export default function Logo({ url }){
    return (
        <Link to={url} className={`flex justify-center items-center px-2 py-2 text-3xl text-primary`}>
            WM
        </Link>
    )
}