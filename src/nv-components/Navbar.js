/**
 * Side NavBar class
 * Displays sidebar and options depending on Sidebar data
 */

import React, { useState, useEffect } from "react";
import { useUserData } from '../myHooks/useUserData';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarDataAdmin, SidebarDataUser } from "./SidebarData";
import { IconContext } from "react-icons";
import "./navbar.css";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const [sData, setSData] = useState(SidebarDataUser)
  const { getRole } = useUserData()
  const role = getRole()

  useEffect(() => {
    if(role === "3"){
      setSData(SidebarDataAdmin)
    }
  }, [role])

  return (
    <>
      <IconContext.Provider value={{ color: "#FFF"}}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {sData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className="nav-span">{item.title}</span>
                  </Link>
                </li>
              );
            })}         
          </ul>
                      
        </nav>
         
      </IconContext.Provider>
    </>
  );
}

export default Navbar;