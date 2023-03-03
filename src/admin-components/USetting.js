import React, { useState, useEffect} from "react";
import useFetch from "../myHooks/useFetch";
import Popup from "../popup-components/Popup";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

function USetting() {

    const [users] = useFetch('https://rest.distressing.dev/users/all')

    const [ppEdit, setPPEdit] = useState(false)
    const [editName, setEditName] = useState(null)
    const [newName, setNewName] = useState(null)
    const [newPw, setNewPw] = useState(null)
    const [newPw2, setnewPw2] = useState(null)
    const [role, setRole] = useState(null)
    const [checkedState, setCheckedState] = useState(false);

    const openPPEdit = (name, role) => {
        setEditName(name)
        if(role === 'ADMIN') {
            setRole(3)
            setCheckedState(true)
        } else {
            setRole(1)
        }
        setPPEdit(true)
    }

    const handleChecked = () => {
        setCheckedState(!checkedState);
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
        if (window.confirm('Are you sure you wish to delete this user?')){
            Promise.all([
                fetch('https://rest.distressing.dev/users/delete?user='+editName, {credentials: "include"})
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
        <div className="us-content">

            <Popup trigger={ppEdit} setTrigger={setPPEdit}>
                <div className='si-popup'>
                    <p>Edit {editName}</p>
                    <div className='si-popup-divider'></div>  
                    <div className='si-form'>
                        <form>
                            <label><p>Change Name:</p></label>
                            <input type="text" placeholder={editName} onChange={e => setNewName(e.target.value)} />
                            <label><p>Change Password:</p></label>
                            <input type="password" onChange={e => setNewPw(e.target.value)} />
                            <label><p>Confirm Password:</p></label>
                            <input type="password" onChange={e => setNewPw(e.target.value)} />
                            
                            <label>Administrator Permissions:</label>
                            <input
                                type="checkbox"
                                checked={checkedState}
                                onChange={() => handleChecked()}/>

                            <div className='ic-buttons'>
                                <button className='ic-save add' onClick={handleSubmitEdit}>Save</button> 
                                <button className='ic-delete red' onClick={handleDelete}><span>Delete</span><RiDeleteBin6Line/></button>                         
                            </div>
                        </form>  
                    </div>   
                </div>
            </Popup>

            {users !== null ? (<>
                {users.users.length > 0 ? (<>
                    {users.users.map((item) => {
                        return(<>
                            <div className="us-item">
                                <button className="r-button edit right" onClick={() => openPPEdit(item.username, item.role)}><span>Edit</span><AiOutlineEdit/></button>      
                                <p>{item.username} </p>
                                <p className="item-detail">{item.role === 'ADMIN' && <>- admin</>}</p>
                            </div>
                            <div className='room-divider'></div>
                        </>)
                    })}
                </>) : (<p className="comment">No users found.</p>)}
            </>) : (<p className="comment">Loading...</p>)} 

        </div>
    )
}

export default USetting