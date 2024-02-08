import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import App from "../App.jsx";
import IntroductionPage from "../pages/public/IntroductionPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import AuthUser from "../components/AuthUser.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import RegisterPage from "../pages/public/RegisterPage.jsx";
import LoginPage from "../pages/public/LoginPage.jsx";
import AccountPage from "../pages/AccountPage.jsx";
import Profile from "../layouts/user/Profile.jsx";
import EmailForm from "../layouts/user/EmailForm.jsx";
import PasswordForm from "../layouts/user/PasswordForm.jsx";
import WorkspacesPage from "../pages/WorkspacesPage.jsx";
import WorkspacesForm from "../layouts/workspaces/WorkspacesForm.jsx";
import WorkspaceList from "../layouts/workspaces/WorkspaceList.jsx";

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
                        <HomePage/>
                    </AuthUser>
                }
            >
            </Route>
            <Route
                path="workspaces"
                element={
                    <AuthUser>
                        <WorkspacesPage/>
                    </AuthUser>
                }
            >
                <Route
                    index
                    element={<WorkspaceList/>}
                ></Route>
                <Route
                    path="form"
                    element={
                        <WorkspacesForm/>
                    }
                ></Route>
            </Route>
            <Route
                path="account"
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
                <Route
                    path="email"
                    element={<EmailForm/>}
                ></Route>
                <Route
                    path="password"
                    element={<PasswordForm/>}
                ></Route>
            </Route>
            <Route
                path="intro"
                element={<IntroductionPage/>}
            ></Route>
            <Route
                path="register"
                element={<RegisterPage/>}
            >
            </Route>
            <Route
                path="login"
                element={<LoginPage/>}
            ></Route>
        </Route>
    )
)