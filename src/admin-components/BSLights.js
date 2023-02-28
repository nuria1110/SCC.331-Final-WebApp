import React, { useState, useEffect} from "react";
import useFetch from "../myHooks/useFetch";
import Popup from "../popup-components/Popup";
import BSLightSensor from "./BSLightSensor";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

function BSLights(props) {

    const [roomData] = useFetch('https://rest.distressing.dev/room/info?buildingID='+parseInt(props.id))

    const [roomID, setRoomID] = useState(null)
    const [roomName, setRoomName] = useState(null)

    const [ppAdd, setPPAdd] = useState(false)
    const [newID, setNewID] = useState(null)
    const [newName, setNewName] = useState(null)

    const openPPAdd = (id, name) => {
        setRoomID(id)
        setRoomName(name)
        setPPAdd(true)
    }

    const handleSubmitAdd = () => {
        fetch('https://rest.distressing.dev/light/add?lightID='+newID+'&name='+newName+'&roomID='+roomID, {credentials: 'include'})
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }


    return (<>
        <div className="bsl">
            <Popup trigger={ppAdd} setTrigger={setPPAdd}>
                <div className='si-popup'>
                    <p>Add a light sensor to {roomName}</p>
                    <div className='si-popup-divider'></div>  
                    <div className='si-form'>
                        <form onSubmit={handleSubmitAdd}>
                            <label><p>Microbit ID:</p></label>
                            <input type="number" onChange={e => setNewID(e.target.value)} required />
                            <label><p>Name:</p></label>
                            <input type="text" onChange={e => setNewName(e.target.value)} required />

                            <button type="submit" className='form-button add'>Add</button>            
                        </form>  
                    </div>                  
                </div>
            </Popup> 

            {roomData !== null ? (<>
                {roomData.rooms.length > 0 ? (<>
                    {roomData.rooms.map((item) => {
                        return(<>            
                        
                            <div className="bs-item">
                                <button className="r-button add right" onClick={() => openPPAdd(item.roomID, item.roomName)}>Add Light +</button>   
                                <p>{item.roomName}</p>
                                <div className='room-divider'></div>
                                <BSLightSensor id={item.roomID} name={item.roomName}/>
                            </div>
                        </>)
                    })}
                </>) : (<p className="comment">There are no rooms in this building.</p>)}
            </>) : (<p className="comment">Loading...</p>)}
        </div>

    </>)
}

export default BSLights