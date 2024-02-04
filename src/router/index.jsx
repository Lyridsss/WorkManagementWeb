import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import App from "../App.jsx";
import IntroductionPage from "../pages/IntroductionPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import AuthUser from "../components/AuthUser.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import AccountPage from "../pages/AccountPage.jsx";
import Profile from "../layouts/Profile.jsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<App/>}
            errorElement={<ErrorPage/>}
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
                path="/account"
                element={
                    <AuthUser>
                        <AccountPage/>
                    </AuthUser>
                }
            >
                <Route
                    index
                    element={<Profile />}
                ></Route>
            </Route>
            <Route
                path="/intro"
                element={<IntroductionPage/>}
            ></Route>
            <Route
                path="/register"
                element={<RegisterPage/>}
            >
            </Route>
            <Route
                path="/login"
                element={<LoginPage/>}
            ></Route>
        </Route>
    )
)