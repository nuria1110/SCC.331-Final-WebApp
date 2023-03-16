import React, { useState, useEffect} from "react";
import useFetch from "../myHooks/useFetch";
import Popup from "../popup-components/Popup";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

function USetting() {

    const [users] = useFetch('https://rest.distressing.dev/users/all')

    const [types, setTypes] = useState({
        admin: true,
        user: true
    })

    const onChange = (e) => {
        setTypes({ ...types, [e.target.value]: e.target.checked });
    };    

    const [ppEdit, setPPEdit] = useState(false)

    const [editName, setEditName] = useState(null)
    const [role, setRole] = useState(null)

    const [newName, setNewName] = useState(null)
    const [newPw, setNewPw] = useState(null)
    const [newPw2, setNewPw2] = useState(null)

    const [checkedState, setCheckedState] = useState(false);
    const [newPwFail, setNewPwFail] = useState(false)

    const openPPEdit = (n, r) => {
        setEditName(n)
        setRole(r)
        if(r === 'ADMIN') {
            setCheckedState(true)
        } else {
            setCheckedState(false)
        }
        setNewPwFail(false)
        setPPEdit(true)
    }

    const handleChecked = () => {
        setCheckedState(!checkedState);    
    }

    useEffect(() => {
        if(checkedState){
            setRole('ADMIN')
        } else {
            setRole('USER')            
        }   
    }, [checkedState])

    const updateName = () => {
        fetch('https://rest.distressing.dev/users/update/username?userold='+editName+'&user='+newName, {credentials: 'include'})
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });     
    }

    const updatePw = () => {
        fetch('https://rest.distressing.dev/users/update/password?user='+editName+'&password='+newPw, {credentials: 'include'})
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });           
    }

    const updateRole = () => {
        fetch('https://rest.distressing.dev/users/update/role?user='+editName+'&role='+role, {credentials: 'include'})
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });   
    }

    const handleSubmitEdit = (e) => {
        let un = false;
        let upw = false;
        
        if(newPw !== null){
            if(newPw === newPw2){
                upw = true;
            } else {
                e.preventDefault()
                setNewPwFail(true)
                return;
            }
        }        
        
        if(newName !== null && editName !== newName){
            un = true;
        }
        
        upw && updatePw()
        updateRole()
        un && updateName()
        alert('User updated successfully')
        
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you wish to delete this user?')){
            Promise.all([
                fetch('https://rest.distressing.dev/users/delete?user='+editName, {credentials: "include", keepAlive: true})
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

            <div className="filters">
                <label class="um-container">
                    <input
                        type="checkbox"
                        value="admin"
                        checked={types.admin}
                        onChange={onChange}/>
                    <span class="checkmark"></span>
                    Admin Users
                </label>

                <label class="um-container">
                    <input
                        type="checkbox"
                        value="user"
                        checked={types.user}
                        onChange={onChange}/>
                    <span class="checkmark"></span>
                    Other Users
                </label>
            </div>

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
                            <input type="password" onChange={e => setNewPw2(e.target.value)} />
                            {newPwFail ? (<p className="comment">! Please check your passwords match.</p>) : ('')}
                            
                            <label class="um-container">
                                <input
                                    type="checkbox"
                                    checked={checkedState}
                                    onChange={handleChecked}/>
                                <span class="checkmark"></span>
                                Administrator Permissions
                            </label>

                            <div className='ic-buttons'>
                                <button className='ic-save add' onClick={(e) => handleSubmitEdit(e)}>Save</button> 
                                <button className='ic-delete red' onClick={handleDelete}><span>Delete</span><RiDeleteBin6Line/></button>                         
                            </div>
                        </form>  
                    </div>   
                </div>
            </Popup>

            {users !== null ? (<>
                {users.users.length > 0 ? (<>
                    {users.users.filter(x => types[(x.role).toLowerCase()]).map((item) => {
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