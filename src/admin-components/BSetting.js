import React, { useState, useEffect} from "react";
import useFetch from "../myHooks/useFetch";
import { useUserData } from '../myHooks/useUserData';

import Popup from "../popup-components/Popup";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

import BSRooms from "./BSRooms";
import BSDoors from "./BSDoors";

import BSMapView from "../map-components/BSMapView";
import { useLocation } from '../myHooks/useLocation';

function BSetting() {
    const { getInstituteData } = useUserData()
    const instituteData = getInstituteData()

    const [buildingData] = useFetch('https://rest.distressing.dev/building/info?instituteID='+instituteData[0])
    const [selected, setSelected] = useState(null)
    const [sName, setSName] = useState(null)
    const [sLat, setSLat] = useState(null)
    const [sLong, setSLong] = useState(null)

    const [ppAdd, setPPAdd] = useState(false)
    const [ppEdit, setPPEdit] = useState(false)

    const [newName, setNewName] = useState(null)
    const { getLatLong } = useLocation()   

    const menuItems = ["Rooms", "Doors"];
    const [settingStr, setSettingStr] = useState(menuItems[0]);  
    
    useEffect(() => {
        if(buildingData !== null ){
            if(buildingData.buildings.length > 0) {
                setSelected(buildingData.buildings[0].buildingID)
            }
        }
    }, [buildingData])

    useEffect(() => {
        if(buildingData !== null){
            if(buildingData.buildings.length > 0 && selected !== null) {
                let i = buildingData.buildings.map(e => e.buildingID).indexOf(selected);
                setSName(buildingData.buildings[i].buildingName)
                setNewName(buildingData.buildings[i].buildingName)
                setSLat(buildingData.buildings[i].latitude)
                setSLong(buildingData.buildings[i].longitude)                
            }
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
    
    const handleSubmitEdit = () => {
        const latLong = getLatLong() 
        fetch('https://rest.distressing.dev/building/update?buildingID='+selected+'&name='+newName+'&lat='+latLong[0]+'&long='+latLong[1], {credentials: 'include'})
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            data.success && alert("Update successfull.")
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleSubmitAdd = () => {
        const latLong = getLatLong() 
        if (latLong !== null) {
            fetch('https://rest.distressing.dev/building/add?instituteID='+instituteData[0]+'&name='+newName+'&lat='+latLong[0]+'&long='+latLong[1], {credentials: 'include'})
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                alert(newName+" has been added successfully.")
            })
            .catch((err) => {
                console.log(err);
            });            
        }

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
        }
            
    }

    return (<>                
        {buildingData !== null ? (<> 

            <div className="bs-content">
                <div className="b-options">
                    {buildingData.buildings.length > 0 && selected !== null ? (<>
                        <div className="b-dropdown">
                            <select value={selected} onChange={(e) => handleChangeDropdown(e)}>
                                {buildingData.buildings.map((item) => {
                                    return (
                                        <option key={item.buildingID} value={item.buildingID}>{item.buildingName}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="b-button edit" onClick={openPPEdit}><span>Edit</span><AiOutlineEdit/></button>  
                         <button className="b-button add right" onClick={openPPAdd}>Add Area +</button> 

                    </>) : (<>
                        <p>There are no areas in this zone.</p>
                        <button className="b-button add" onClick={openPPAdd}>Add Area +</button> 
                    </>)}

                                          
                </div>

                <Popup trigger={ppEdit} setTrigger={setPPEdit}>
                    <div className='si-popup'>
                        <p>Edit {sName}</p>
                        <div className='si-popup-divider'></div>  
                        <div className='si-form'>
                            <form>
                            <label><p>Change Name:</p></label>
                            <input type="text" placeholder={sName} onChange={e => setNewName(e.target.value)} />

                            <BSMapView type="edit" lat={parseFloat(sLat)} long={parseFloat(sLong)}/>

                            <div className='ic-buttons'>
                                <button className='ic-save add' onClick={handleSubmitEdit}>Save</button>  
                                <button className='ic-delete red' onClick={handleDelete}><span>Delete</span><RiDeleteBin6Line/></button>                         
                            </div>
                            </form>  
                        </div>   
                    </div>
                </Popup>

                <Popup trigger={ppAdd} setTrigger={setPPAdd}>
                    <div className='si-popup'>
                        <p>Create Area</p>
                        <div className='si-popup-divider'></div>  
                        <div className='si-form'>
                            <form onSubmit={handleSubmitAdd}>
                            <label><p>Name:</p></label>
                            <input type="text" onChange={e => setNewName(e.target.value)} required />

                            <BSMapView type="add"/>

                            <button type="submit" className='form-button add'>Add</button>            
                            </form>  
                        </div>                  
                    </div>
                </Popup> 
                
                {buildingData.buildings.length > 0 && selected !== null ? (<>
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
                </>) : ('')}
            </div>                                 
        </>) : (<p className="comment">Loading....</p>)}
    </>)
}

export default BSetting