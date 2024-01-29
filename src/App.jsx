import { AuthenticationContextProvider } from "./context/AuthenticationContext.jsx";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <AuthenticationContextProvider>
            <Outlet/>
        </AuthenticationContextProvider>
    )
}

export default App
