import { CreateCampaignPage, DashboardPage } from "../../pages";
import CreateFoundationPage from "../../pages/CreateFoundation";



export const adminRoutes = [
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
];