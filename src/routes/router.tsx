import {
    createBrowserRouter,
} from "react-router";

// Layout Components
import {Sidebar} from "../shared/layout/sidebar";

// Page Components
import HomePage from "../modules/home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Sidebar/>,
        children: [
            {
                index: true,
                element: <HomePage/>,
            }
        ],
    },
]);