
import React, { useState } from "react";
import { useUserData } from '../myHooks/useUserData';
import { useEffect } from "react";
import AdminSettings from "../admin-components/AdminSettings";

function Admin () {
    const menuItems = ["Buildings", "Users", "Microbits"];
    const [settingStr, setSettingStr] = useState(menuItems[0]);  

    const { getRole } = useUserData()
    const role = getRole()

    useEffect(() => {
        if(role !== '3'){
            alert("You don't have permission.")
            window.location.replace('/')
        }
    }, [role])

    const handleClick = (s) => {
        const newSettingStr = s; 
        setSettingStr(newSettingStr);
        console.log(newSettingStr)
    }

    return (
        <div className = "admin">
            <div className='admin-intro'>
                <h1>Administrator Settings</h1>
            </div>

            <div className='admin-content'>
                <div className='admin-menu'>
                    <ul>
                        {menuItems.map((item) => {
                            return (
                                <li
                                key={item}
                                onClick={() => {handleClick(item);}}
                                className={`menu-item ${settingStr === item && "active"}`}
                                >
                                {item}
                                </li>
                            );
                        })}
                    </ul>   
                </div>
                <div className='admin-divider'></div>
                <AdminSettings s={settingStr}/>
            </div>
             
        </div>
    )
}

export default Admin;