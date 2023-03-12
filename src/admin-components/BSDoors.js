import React, { useState, useEffect} from "react";
import useFetch from "../myHooks/useFetch";
import Popup from "../popup-components/Popup";
import BSPermissions from "./BSPermissions";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

function BSDoors(props) {

    const [doorData] = useFetch('https://rest.distressing.dev/building/door/info?buildingID='+parseInt(props.id))
    const [nullMicrobits] = useFetch('https://rest.distressing.dev/microbit/null')

    const [ppAdd, setPPAdd] = useState(false)
    const [ppEdit, setPPEdit] = useState(false)
    const [ppUA, setPPUA] = useState(false)

    const [selected, setSelected] = useState(0)
    const [newName, setNewName] = useState(null)
    const [editID, setEditID] = useState(null)
    const [editName, setEditName] = useState(null)

    useEffect(() => {
        if(nullMicrobits !== null ){
            if(nullMicrobits.microbits.length > 0) {
                setSelected(nullMicrobits.microbits[0].microbitID)
            }
        }
    }, [nullMicrobits])

    const handleChangeDropdown = (e) => {
        setSelected(e.target.value)
    }
    
    const openPPAdd = () => {
        setPPAdd(true)
    }

    const openPPEdit = (id, name) => {
        setEditID(id)
        setEditName(name)
        setNewName(name)
        setPPEdit(true)
    }

    const openPPUA = (id, name) => {
        setEditID(id)
        setEditName(name)
        setPPUA(true)
    }

    const handleSubmitEdit = () => {
        fetch('https://rest.distressing.dev/door/update?doorID='+editID+'&name='+newName, {credentials: 'include'})
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleSubmitAdd = () => {
        fetch('https://rest.distressing.dev/door/add?doorID='+selected+'&buildingID='+props.id+'&name='+newName, {credentials: 'include'})
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you wish to delete this door?')){
            Promise.all([
                fetch('https://rest.distressing.dev/door/delete?doorID=' + editID, {credentials: "include"})
                .then(res => res.json()),
                ])
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err);
            });            
        }
    }

    return (
        <div className='bsd'>
            <button className="r-button add" onClick={openPPAdd}>Add Door +</button> 

            <Popup trigger={ppAdd} setTrigger={setPPAdd}>
                <div className='si-popup'>
                    <p>Add a door sensor to {props.name}</p>
                    <div className='si-popup-divider'></div>  
                    <div className='si-form'>
                        <form onSubmit={handleSubmitAdd}>
                            <label><p>Microbit ID:</p></label>

                            {nullMicrobits !== null ? (<>
                                {nullMicrobits.microbits.length > 0 ? (<>
                                    <div className="dl-dropdown">
                                        <select value={selected} onChange={(e) => handleChangeDropdown(e)}>
                                            {nullMicrobits.microbits.map((item) => {
                                                return (
                                                    <option key={item.microbitID} value={item.microbitID}>{item.microbitID}</option>
                                                );
                                            })}
                                        </select>
                                    </div>                            
                                </>) : (<p>No available microbits.</p>)}
                            </>) : (<p>Loading...</p>)}

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

            <Popup trigger={ppUA} setTrigger={setPPUA}>
                <BSPermissions key={editID} id={editID} name={editName}/>
            </Popup>

            {doorData !== null ? (<>
                {doorData.doors.length > 0 ? (<>
                    {doorData.doors.map((item) => {
                        return(<>
                            <div className="bs-item">
                                <button className="r-button edit right" onClick={() => openPPEdit(item.doorID, item.doorName)}><span>Edit</span><AiOutlineEdit/></button>  
                                <p>{item.doorName}</p>
                                <button className="r-button grey right" onClick={() => openPPUA(item.doorID, item.doorName)}>User Permissions</button> 
                                <p className="item-detail">Microbit ID: {item.doorID}</p>
                                
                                <div className='room-divider'></div>
                            </div>
                        </>)
                    })}
                </>) : (<p className="comment">There are no doors in this building.</p>)}
            </>) : (<p className="comment">Loading...</p>)}
        </div>
    )
}

export default BSDoors