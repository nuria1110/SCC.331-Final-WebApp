import React, { useState, useEffect} from "react";
import useFetch from "../myHooks/useFetch";
import Popup from "../popup-components/Popup";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

function BSRooms(props) {

    const [roomData] = useFetch('https://rest.distressing.dev/room/info?buildingID='+parseInt(props.id))

    const [ppAdd, setPPAdd] = useState(false)
    const [ppEdit, setPPEdit] = useState(false)
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
        fetch('', {credentials: 'include'})
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you wish to delete this room?')){
            fetch('', {credentials: 'include'})
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
        <div className="bs-rooms">
            <button className="r-button add" onClick={openPPAdd}>Add Room +</button> 

            <Popup trigger={ppAdd} setTrigger={setPPAdd}>
                <div className='si-popup'>
                    <p>Add a Room to {props.name}</p>
                    <div className='si-popup-divider'></div>  
                    <div className='si-form'>
                        <form onSubmit={handleSubmitAdd}>
                        <label><p>Name:</p></label>
                        <input type="text" onChange={e => setNewName(e.target.value)} required />

                        <button type="submit" className='form-button'>Add</button>            
                        </form>  
                    </div>                  
                </div>
            </Popup>  

            <Popup trigger={ppEdit} setTrigger={setPPEdit}>
                <div className='si-popup'>
                    <p>Edit {editName}</p>
                    <div className='si-popup-divider'></div>  
                    <div className='si-form'>
                        <form onSubmit={handleSubmitEdit}>
                        <label><p>Change Name:</p></label>
                        <input type="text" onChange={e => setNewName(e.target.value)} />

                        <div className='ic-buttons'>
                            <button type="submit" className='ic-save'>Save</button>  
                            <button className='ic-delete' onClick={handleDelete}><span>Delete</span><RiDeleteBin6Line/></button>                         
                        </div>
                        </form>  
                    </div>   
                </div>
            </Popup>

            {roomData !== null ? (<>
                {roomData.rooms.length > 0 ? (<>
                    {roomData.rooms.map((item) => {
                        return(<>
                            <div className="bsr">
                                <button className="r-button edit right" onClick={() => openPPEdit(item.roomID, item.roomName)}><span>Edit</span><AiOutlineEdit/></button>   
                                <p>{item.roomName}</p>
                                <div className='room-divider'></div>
                                {/*sensors*/}
                            </div>


                        </>)
                    })}
                </>) : (<p>There are no rooms in this building.</p>)}
            </>) : (<p>Loading...</p>)}
        </div>
    )
}

export default BSRooms