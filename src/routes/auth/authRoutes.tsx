import { Navigate } from "react-router-dom";
import LoginPage from "../../pages/auth/Login";
import RegisterPage from "../../pages/auth/Register";
import { CampaignDetailsPage, CampaignsPage, HowItWorksPage } from "../../pages";



export const authRoutes = [
    {
        path: "",
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
        path: "campaign/:id",
        element: <CampaignDetailsPage />
    },
    {
        path: "/*",
        element: <Navigate to={""} />
    }
]