import { Navigate } from "react-router-dom";
import LoginPage from "../../pages/auth/Login";
import RegisterPage from "../../pages/auth/Register";
import { CampaignsPage, HowItWorksPage } from "../../pages";



export const authRoutes = [
    {
        path: "main",
        element: <CampaignsPage />
    },
    {
        path: "login",
        element: <LoginPage />
    },
    {
        path: "register",
        element: <RegisterPage />
    },
    {
        path: "/*",
        element: <Navigate to={"/login"} />
    }
]