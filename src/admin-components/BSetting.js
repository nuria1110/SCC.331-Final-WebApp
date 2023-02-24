import React, { useState, useEffect} from "react";
import useFetch from "../myHooks/useFetch";
import Popup from "../popup-components/Popup";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

import BSRooms from "./BSRooms";
import BSDoors from "./BSDoors";
import BSLights from "./BSLights";

function BSetting() {

    const [buildingData] = useFetch('https://rest.distressing.dev/building/info')
    const [selected, setSelected] = useState(0)
    const [sName, setSName] = useState(null)

    const [ppAdd, setPPAdd] = useState(false)
    const [ppEdit, setPPEdit] = useState(false)
    const [newName, setNewName] = useState(null)
    const [newLat, setNewLat] = useState(null)
    const [newLong, setNewLong] = useState(null)

    const menuItems = ["Rooms", "Doors", "Lights"];
    const [settingStr, setSettingStr] = useState(menuItems[0]);  

    useEffect(() => {
        if(buildingData !== null){
            setSelected(buildingData.buildings[0].buildingID)
        }
    }, [buildingData])

    useEffect(() => {
        if(buildingData !== null){
            let i = buildingData.buildings.map(e => e.buildingID).indexOf(selected);
            setSName(buildingData.buildings[i].buildingName)
        }
    }, [selected])

    const handleChangeDropdown = (e) => {
        setSelected(e.target.value)
    }

    const openPPAdd = () => {
        setPPAdd(true)
    }

    const openPPEdit = () => {
        setPPEdit(true)
    }
    
    //TODO
    const handleSubmitEdit = () => {
        fetch('', {credentials: 'include'})
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleSubmitAdd = () => {
        fetch('https://rest.distressing.dev/building/add?name='+newName+'&lat='+newLat+'&long='+newLong, {credentials: 'include'})
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            alert(newName+" has been added successfully.")
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you wish to delete this building?\nThis will also delete its rooms and sensors.')){
            fetch('https://rest.distressing.dev/building/delete?buildingID='+parseInt(selected), {credentials: 'include'})
            .then(res => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    const handleClickMenu = (s) => {
        const newSettingStr = s; 
        setSettingStr(newSettingStr);
    }

    const bsSetting = () => {
        if(settingStr === menuItems[0]) {
            return <BSRooms id={selected} name={sName}/>
        } else if(settingStr === menuItems[1]) {
            return <BSDoors id={selected} name={sName}/>
        } else if(settingStr === menuItems[2]) {
            return <BSLights id={selected} name={sName}/>
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
                    <button className="b-button edit" onClick={openPPEdit}><span>Edit</span><AiOutlineEdit/></button>
                    <button className="b-button add right" onClick={openPPAdd}>Add Building +</button>                        
                </div>

                <Popup trigger={ppEdit} setTrigger={setPPEdit}>
                    <div className='si-popup'>
                        <p>Edit {sName}</p>
                        <div className='si-popup-divider'></div>  
                        <div className='si-form'>
                            <form onSubmit={handleSubmitEdit}>
                            <label><p>Change Name:</p></label>
                            <input type="text" onChange={e => setNewName(e.target.value)} />

                            {/*TODO - add map for location*/}

                            <div className='ic-buttons'>
                                <button type="submit" className='ic-save'>Save</button>  
                                <button className='ic-delete' onClick={handleDelete}><span>Delete</span><RiDeleteBin6Line/></button>                         
                            </div>
                            </form>  
                        </div>   
                    </div>
                </Popup>

                <Popup trigger={ppAdd} setTrigger={setPPAdd}>
                    <div className='si-popup'>
                        <p>Create Buidliing</p>
                        <div className='si-popup-divider'></div>  
                        <div className='si-form'>
                            <form onSubmit={handleSubmitAdd}>
                            <label><p>Name:</p></label>
                            <input type="text" onChange={e => setNewName(e.target.value)} required />

                            {/*TODO - add map for location*/}

                            <button type="submit" className='form-button'>Add</button>            
                            </form>  
                        </div>                  
                    </div>
                </Popup> 

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
        </>) : (<p className="comment">Loading....</p>)}
    </>)
}

export default BSetting