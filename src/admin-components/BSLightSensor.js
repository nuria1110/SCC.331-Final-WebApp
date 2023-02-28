import React, { useState, useEffect} from "react";
import useFetch from "../myHooks/useFetch";
import Popup from "../popup-components/Popup";
import { BsLightbulbFill } from "react-icons/bs";
import { BsLightbulbOffFill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

function BSLightSensor(props) {

    const [lights] = useFetch('https://rest.distressing.dev/light/info?roomID=' + props.id)
    const [lightState, setLightState] = useState('')

    const [ppEdit, setPPEdit] = useState(false)

    const [newID, setNewID] = useState(null)
    const [newName, setNewName] = useState(null)
    const [editID, setEditID] = useState(null)
    const [editName, setEditName] = useState(null)

    const openPPEdit = (id, name) => {
        setEditID(id)
        setEditName(name)
        setPPEdit(true)
    }

    useEffect(() => {
        if(lights !== null) {
            lights.lights.forEach(item => {
                item.light === "1" ? setLightState([...lightState, true]) : setLightState([...lightState, false])
            });
        }
    }, [lights])

    const handleClick = (id, i) => {
        const updatedLightState = lightState.map((state, index) => 
            index === i ? !state : state);
        console.log(updatedLightState)
        setLightState(updatedLightState)        
        
        Promise.all([
            fetch('https://rest.distressing.dev/light/set/status?lightID='+id+'&status='+updatedLightState[i], {credentials: "include"})
            .then(res => res.json()),
            ])
        .then((data) => {console.log(data)})
        .catch((err) => {console.log(err);});
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

    const handleDelete = () => {
        if (window.confirm('Are you sure you wish to delete this light?')){
            Promise.all([
                fetch('https://rest.distressing.dev/light/delete?lightID='+ editID, {credentials: "include"})
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


    return (<>

        <Popup trigger={ppEdit} setTrigger={setPPEdit}>
            <div className='si-popup'>
                <p>Edit {editName}</p>
                <div className='si-popup-divider'></div>  
                <div className='si-form'>
                    <form>
                        {/* <label><p>Building: </p></label>
                        <input type="text" onChange={e => setNewID(e.target.value)} required /> */}
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
    
        <div className='bs-lights'>
            {lights !== null ? (<>                
                {lights.lights.length > 0 && lightState !== null? (<>
                    {lights.lights.map((item, index) => {
                        return(<>
                            <p>                         
                                <button 
                                    className={`l-button ${lightState[index] ? ("active") : ("")}`}
                                    onClick={() => handleClick(item.microbitID, index)}>
                                    {lightState[index] ? (<BsLightbulbFill/>) : (<BsLightbulbOffFill/>)}
                                </button> 
                                {item.name}   
                                <button className="r-button edit right" onClick={() => openPPEdit(item.microbitID, item.name)}><span>Edit</span><AiOutlineEdit/></button>
                            </p>                                  
                        </>                                  
                        )
                    })}   
                </>) : (<p>No Lights.</p>)}
            </>):(<p>Loading...</p>)}            
        </div>   
    </>)
}

export default BSLightSensor