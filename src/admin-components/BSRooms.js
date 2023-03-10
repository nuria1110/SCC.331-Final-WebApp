import React, { useState } from "react";
import useFetch from "../myHooks/useFetch";
import Popup from "../popup-components/Popup";
import BSSensor from "./BSSensor";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

function BSRooms(props) {

    const [roomData] = useFetch('https://rest.distressing.dev/room/info?buildingID='+props.id)

    const [ppAdd, setPPAdd] = useState(false)
    const [ppEdit, setPPEdit] = useState(false)
    const [ppSensors, setPPSensors] = useState(false)

    const [newName, setNewName] = useState(null)
    const [editID, setEditID] = useState(null)
    const [editName, setEditName] = useState(null)

    const openPPAdd = () => {
        setPPAdd(true)
    }

    const openPPEdit = (id, name) => {
        setEditID(id)
        setEditName(name)
        setPPEdit(true)
    }

    const openPPSensors = (id, name) => {
        setEditID(id)
        setEditName(name)
        setPPSensors(true)
    }

    const handleSubmitEdit = () => {
        newName === null && setNewName(editName)
        fetch('https://rest.distressing.dev/room/update?name='+newName+'&roomID='+editID, {credentials: 'include'})
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleSubmitAdd = () => {
        fetch('https://rest.distressing.dev/room/add?name='+newName+'&buildingID='+props.id, {credentials: 'include'})
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you wish to delete this room?\nThis action will also remove its sensors.')){
            fetch('https://rest.distressing.dev/room/delete?roomID='+ editID, {credentials: 'include'})
            .then(res => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <div className="bsr">
            <button className="r-button add" onClick={openPPAdd}>Add Room +</button> 

            <Popup trigger={ppAdd} setTrigger={setPPAdd}>
                <div className='si-popup'>
                    <p>Add a Room to {props.name}</p>
                    <div className='si-popup-divider'></div>  
                    <div className='si-form'>
                        <form onSubmit={handleSubmitAdd}>
                            <label><p>Name:</p></label>
                            <input type="text" onChange={e => setNewName(e.target.value)} required />

                            <button type="submit" className='form-button add'>Add</button>            
                        </form>  
                    </div>                  
                </div>
            </Popup>  

            <Popup trigger={ppEdit} setTrigger={setPPEdit}>
                <div className='si-popup'>
                    <p>Edit {editName}</p>
                    <div className='si-popup-divider'></div>  
                    <div className='si-form'>
                        <form>
                            <label><p>Change Name:</p></label>
                            <input type="text" placeholder={editName} onChange={e => setNewName(e.target.value)} />

                            <div className='ic-buttons'>
                                <button className='ic-save add' onClick={handleSubmitEdit}>Save</button> 
                                <button className='ic-delete red' onClick={handleDelete}><span>Delete</span><RiDeleteBin6Line/></button>                         
                            </div>
                        </form>  
                    </div>   
                </div>
            </Popup>

            <Popup trigger={ppSensors} setTrigger={setPPSensors}>
                <BSSensor id={editID} name={editName} isPopup={true}/>
            </Popup>

            {roomData !== null ? (<>
                {roomData.rooms.length > 0 ? (<>
                    {roomData.rooms.map((item) => {
                        return(<>
                            <div className="bs-item">
                                <button className="r-button grey right" onClick={() => openPPSensors(item.roomID, item.roomName)}>Sensors <AiOutlineEdit/></button> 
                                <button className="r-button edit right" onClick={() => openPPEdit(item.roomID, item.roomName)}><span>Edit</span><AiOutlineEdit/></button>      
                                <p>{item.roomName}</p>
                                <div className='room-divider'></div>
                                <BSSensor id={item.roomID} isPopup={false}/>
                            </div>
                        </>)
                    })}
                </>) : (<p className="comment">There are no rooms in this area.</p>)}
            </>) : (<p className="comment">Loading...</p>)}
        </div>
    )
}

export default BSRooms