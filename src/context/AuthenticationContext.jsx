import {createContext, useEffect, useState} from "react";
import {tokenService} from "../services/tokenService.jsx";
import {axiosAuthRequest} from "../utils/axiosRequest.js";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthenticationContextProvider = ({ children })  => {
    const [token, setToken] = useState(() => tokenService.getToken())
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token == null){
            setUser(null)
        } else {
            axiosAuthRequest.get("/account")
                .then(res => {
                    setUser(res.data)
                })
                .catch(() => {
                    setUser(null)
                })
        }
    }, [token]);

    const login = (token) => {
        setToken(token)
        tokenService.setToken(token)
    }

    const logout = () => {
        setToken(null)
        tokenService.deleteToken()
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}