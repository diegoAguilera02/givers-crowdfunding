
import { Navigate } from "react-router-dom";
import { CreateCampaignPage, DashboardPage } from "../../pages";
import CreateFoundationPage from "../../pages/CreateFoundation";
export const giversRoutes = [
    {
        path: "dashboard",
        element: <DashboardPage />
    },
    {
        path: "create-campaign",
        element: <CreateCampaignPage />
    },
    {
        path: "create-foundation",
        element: <CreateFoundationPage />
    },
    {
        path: "/panel/*",
        element: <Navigate to={"/panel/dashboard"} />
    }
]