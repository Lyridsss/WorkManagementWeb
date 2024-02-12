import {Navigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthenticationContext.jsx";

export default function AuthUser({ children }){

    const { token } = useContext(AuthContext)

    return (
        <>
            {token == null ? <Navigate to="/intro" replace/> : children}
        </>
    )
}