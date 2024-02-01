import {createContext, useEffect, useState} from "react";
import {tokenService} from "../services/tokenService.jsx";

export const AuthContext = createContext(null);

export const AuthenticationContextProvider = ({ children })  => {
    const [token, setToken] = useState(() => tokenService.getToken())

    const login = (token) => {
        setToken(token)
        tokenService.setToken(token)
    }

    const logout = () => {
        setToken(null)
        tokenService.deleteToken()
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}