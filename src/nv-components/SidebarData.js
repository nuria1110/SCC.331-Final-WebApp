import React from "react";
import { MdDashboard } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import { FaUserCog } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs"

export const SidebarDataAdmin = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard />,
    cName: "nav-text",
  },
  {
    title: "Graphs & Charts",
    path: "/data",
    icon: <BsGraphUp />,
    cName: "nav-text",
  },  
  {
    title: "Location Map",
    path: "/map",
    icon: <FiMapPin />,
    cName: "nav-text",
  },
  {
    title: "Admin",
    path: "/admin",
    icon: <FaUserCog />,
    cName: "nav-text",
  },
];

export const SidebarDataUser = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard />,
    cName: "nav-text",
  },
  {
    title: "Graphs & Charts",
    path: "/data",
    icon: <BsGraphUp />,
    cName: "nav-text",
  },  
  {
    title: "Location Map",
    path: "/map",
    icon: <FiMapPin />,
    cName: "nav-text",
  },
];