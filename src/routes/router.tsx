import {
    createBrowserRouter,
} from "react-router";

import {Sidebar} from "../shared/layout/sidebar";

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