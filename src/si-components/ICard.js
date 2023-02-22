import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../myHooks/useUserData';
import Popup from "../popup-components/Popup";
import iCardImage from "./iCardImage.png"
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./icard.css"

function ICard (props) {

    const [popup, setPopup] = useState(false)
    const [newName, setNewName] = useState(null)

    const { setInstitute } = useUserData()
    const navigate = useNavigate();

    const openPopup = () => {
        setPopup(true)
    }

    //not working?
    const handleSubmit = () => {
        fetch('https://rest.distressing.dev/institute/update?instituteID='+props.id+'?name='+newName, {credentials: 'include'})
        .then(res => res.json())
        .then((data) => {
          console.log(data);
          alert(data)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you wish to delete this institute?')){
            fetch('https://rest.distressing.dev/institute/delete?instituteID='+props.id, {credentials: 'include'})
            .then(res => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
        }

    }

    const handleCardClick = () => {
        setInstitute(props.id, props.name)
        navigate('/dashboard');
    }

    return (<>
        <div className='ic-container'>
            <div className="ic-clicker" onClick={handleCardClick}>
                <p>{props.name}</p>
                <img src={iCardImage} />
            </div>
            <button onClick={openPopup}><p><span>Edit</span><AiOutlineEdit/></p></button>
        </div> 
        

        <Popup trigger={popup} setTrigger={setPopup}>
            <div className='si-popup'>
                <p>Edit {props.name}</p>
                <div className='si-popup-divider'></div>       
                <div className='si-form'>
                    <form onSubmit={handleSubmit}>
                    <label><p>Change Name:</p></label>
                    <input type="text" onChange={e => setNewName(e.target.value)} required />

                    <div className='ic-buttons'>
                        <button type="submit" className='ic-save'>Save</button>  
                        <button className='ic-delete' onClick={handleDelete}><span>Delete</span><RiDeleteBin6Line/></button>                         
                    </div>
                    </form>  
                </div>             
            </div>
        </Popup> 
        
    </>)
}

export default ICard;