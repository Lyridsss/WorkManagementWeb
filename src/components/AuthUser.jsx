import {useContext} from "react";
import {AuthContext} from "../context/AuthenticationContext.jsx";
import {Navigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function AuthUser({ children }){
    // eslint-disable-next-line no-unused-vars
    const { user, login, logout} = useContext(AuthContext)
    return (
        <>
            {user == null ? <Navigate to="/intro" replace/> : children}
        </>
    )
}