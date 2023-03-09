import React, { lazy } from 'react';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Login from "./routes/Login";
// import Signup from "./routes/Signup";
// import SInstitute from "./routes/SInstitute";
import Navbar from './nv-components/Navbar';
// import Dashboard from './routes/Dashboard';
// import Grafana from './routes/Grafana';
// import Map from './routes/Map';
// import Admin from './routes/Admin';
import "./style.css";

const Signup = lazy(() => import('./routes/Signup'))
const SInstitute = lazy(() => import('./routes/SInstitute'))
const Dashboard = lazy(() => import('./routes/Dashboard'))
const Grafana = lazy(() => import('./routes/Grafana'))
const Map = lazy(() => import('./routes/Map'))
const Admin = lazy(() => import('./routes/Admin'))

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
        element: 
            <React.Suspense fallback={<>...</>}>
              <Signup />
            </React.Suspense>,
    }, 
    {
        path: "/selectinstitute",
        element:
            <React.Suspense fallback={<>...</>}>
                <SInstitute />
            </React.Suspense>,
    },     
    {
        element: <AppLayout />,
        children: [
            {
                path: "dashboard",
                element:             
                    <React.Suspense fallback={<>...</>}>
                        <Dashboard />
                    </React.Suspense>,
            },
            {
                path: "data",
                element: 
                    <React.Suspense fallback={<>...</>}>
                        <Grafana />
                    </React.Suspense>,
            },            
            {
                path: "map",
                element: 
                    <React.Suspense fallback={<>...</>}>
                        <Map />
                    </React.Suspense>,
            },
            {
                path: "admin",
                element:
                    <React.Suspense fallback={<>...</>}>
                        <Admin />
                    </React.Suspense>,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);