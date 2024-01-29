const setToken = (token) => {
    localStorage.setItem("work-manage-web-app-token", token)
}

const getToken = () => {
    return localStorage.getItem("work-manage-web-app-token")
}

const deleteToken = () => {
    localStorage.removeItem("work-manage-web-app-token")
}

export const tokenService = {
    setToken,
    getToken,
    deleteToken
}