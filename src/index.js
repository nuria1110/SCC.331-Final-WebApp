import React from 'react';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Login from "./routes/Login"
import Signup from "./routes/Signup"
import "./style.css";

// const AppLayout = () => (
//     <>
//         <Navbar />
//         <Outlet />
//     </>
// );

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    }, 
    {
        path: "/signup",
        element: <Signup />,
    },     
    // {
    //     element: <AppLayout />,
    //     children: [
    //         {
    //             path: "dashboard",
    //             element: <Dashboard />,
    //         },
    //         {
    //             path: "map",
    //             element: <Map />,
    //         },
    //         {
    //             path: "data",
    //             element: <GrafanaDashboard />,
    //         },
    //         {
    //             path: "admin",
    //             element: <Admin />,
    //         },
    //     ],
    // },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);