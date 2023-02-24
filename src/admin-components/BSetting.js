import React, { useState, useEffect} from "react";
import useFetch from "../myHooks/useFetch";
import { AiOutlineEdit } from "react-icons/ai";

import BSRooms from "./BSRooms";
import BSDoors from "./BSDoors";
import BSLights from "./BSLights";

function BSetting() {

    const [buildingData] = useFetch('https://rest.distressing.dev/building/info')
    const [selected, setSelected] = useState(0)
    const [sName, setSName] = useState(null)
    const [currentData, setCurrentData] = useState(null)

    const menuItems = ["Rooms", "Doors", "Lights"];
    const [settingStr, setSettingStr] = useState(menuItems[0]);  

    useEffect(() => {
        if(buildingData !== null){
            setSelected(buildingData.buildings[0].buildingID)
            fetchData()
        }
    }, [buildingData])

    useEffect(() => {
        fetchData()
    }, [selected])

    const fetchData = () => {
        Promise.all([
            fetch('https://rest.distressing.dev/room/info?buildingID=' + parseInt(selected), {credentials: "include"})
            .then(res => res.json()),
            ])
        .then((data) => {
            console.log(data)
            setCurrentData(data[0].rooms)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleChangeDropdown = (e) => {
        setSelected(e.target.value)
    }

    const handleClickMenu = (s) => {
        const newSettingStr = s; 
        setSettingStr(newSettingStr);
        console.log(newSettingStr)
    }

    const bsSetting = () => {
        if(settingStr === menuItems[0]) {
            return <BSRooms id={selected}/>
        } else if(settingStr === menuItems[1]) {
            return <BSDoors id={selected}/>
        } else if(settingStr === menuItems[2]) {
            return <BSLights id={selected}/>
        }
            
    }

    return (<>                
        {buildingData !== null ? (<> 
            <div className="bs-content">
                <div className="b-options">
                    <div className="s-dropdown">
                        <select value={selected} onChange={(e) => handleChangeDropdown(e)}>
                            {buildingData.buildings.map((item) => {
                                return (
                                    <option key={item.buildingID} value={item.buildingID}>{item.buildingName}</option>
                                );
                            })}
                        </select>
                    </div>
                    <button className="b-button edit"><span>Edit</span><AiOutlineEdit/></button>
                    <button className="b-button add right">Add Building +</button>                        
                </div>

                <div className="bs-menu">
                    <ul>
                        {menuItems.map((item) => {
                            return (
                                <li
                                    key={item}
                                    onClick={() => {handleClickMenu(item);}}
                                    className={`menu-item ${settingStr === item && "active"}`}
                                    >
                                    {item}
                                </li>
                            );
                        })}
                    </ul>  
                </div>
                {bsSetting()}
        
            </div>                                 
        </>) : (<p>Loading....</p>)}
    </>)
}

export default BSetting