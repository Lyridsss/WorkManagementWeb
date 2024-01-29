import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import App from "../App.jsx";
import IntroductionPage from "../pages/IntroductionPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import AuthUser from "../components/AuthUser.jsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<App/>}
            errorElement={<div>404</div>}
        >
            <Route
                index
                element={
                    <AuthUser>
                        <HomePage />
                    </AuthUser>
                }
            >
            </Route>
            <Route
                path="/intro"
                element={<IntroductionPage/>}
            ></Route>
        </Route>
    )
)