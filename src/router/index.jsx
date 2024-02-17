import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import App from "../App.jsx";
import { axiosAuthRequest } from "../utils/axiosRequest.js";
import { tokenService } from "../services/tokenService.jsx";
import IntroductionPage from "../pages/public/IntroductionPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import AuthUser from "../components/auth/AuthUser.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import RegisterPage from "../pages/public/RegisterPage.jsx";
import LoginPage from "../pages/public/LoginPage.jsx";
import AccountPage from "../pages/AccountPage.jsx";
import Profile from "../layouts/user/Profile.jsx";
import EmailForm from "../layouts/user/EmailForm.jsx";
import PasswordForm from "../layouts/user/PasswordForm.jsx";
import WorkspacesPage from "../pages/workspace/WorkspacesPage.jsx";
import WorkspacesForm from "../layouts/workspaces/WorkspacesForm.jsx";
import Workspaces from "../layouts/workspaces/Workspaces.jsx";
import Workspace from "../layouts/workspaces/Workspace.jsx";
import TablePage from "../pages/table/TablePage.jsx";
import TableForm from "../layouts/table/TableForm.jsx";
import WorkspaceHomeLayout from "../layouts/workspaces/WorkspaceHomeLayout.jsx";
import WorkspaceSettingsLayout from "../layouts/workspaces/WorkspaceSettingsLayout.jsx";
import WorkspaceMemberLayout from "../layouts/workspaces/WorkspaceMemberLayout.jsx";
import WorkspaceReviewPage from "../pages/workspace/WorkspaceReviewPage.jsx";

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
                    element={<Workspaces/>}
                ></Route>
                <Route
                    path="form"
                    element={
                        <WorkspacesForm/>
                    }
                ></Route>
                <Route
                    path=":workspaceId"
                    element={
                        <Workspace/>
                    }
                >
                    <Route
                        index
                        element={<WorkspaceHomeLayout/>}
                    ></Route>
                    <Route
                        path="settings"
                        element={<WorkspaceSettingsLayout/>}
                    ></Route>
                    <Route
                        path="members"
                        element={<WorkspaceMemberLayout/>}
                        loader={() => {
                            return axiosAuthRequest(tokenService.getToken())
                                .get("/account")
                                .then(res => res.data)
                                .catch(error => error)
                        }}
                    ></Route>
                </Route>
            </Route>
            <Route
                path="workspaces/:workspaceId/invitations/:inviteCodeId"
                element={<WorkspaceReviewPage />}
            ></Route>
            <Route
                path="tables"
                element={<TablePage/>}
            >
                <Route
                    path="form"
                    element={<TableForm/>}
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