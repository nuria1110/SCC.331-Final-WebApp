import React from 'react';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Login from "./routes/Login";
import Signup from "./routes/Signup";
import SInstitute from "./routes/SInstitute";
import Navbar from './nv-components/Navbar';
import Dashboard from './routes/Dashboard';
import Grafana from './routes/Grafana';
import Admin from './routes/Admin';
import "./style.css";

const AppLayout = () => (
    <>
        <Navbar />
        <Outlet />
    </>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    }, 
    {
        path: "/signup",
        element: <Signup />,
    }, 
    {
        path: "/selectinstitute",
        element: <SInstitute />,
    },     
    {
        element: <AppLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            // {
            //     path: "map",
            //     element: <Map />,
            // },
            {
                path: "data",
                element: <Grafana />,
            },
            {
                path: "admin",
                element: <Admin />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);