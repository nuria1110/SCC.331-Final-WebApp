import React, { useState } from 'react';
import useFetch from "../myHooks/useFetch";
import { useUserData } from '../myHooks/useUserData';
import ICard from "../si-components/ICard";
import Popup from "../popup-components/Popup";

function SInstitute() {

    const { getRole } = useUserData()
    const role = getRole()

    const [institutes] = useFetch('https://rest.distressing.dev/institute/info')

    const [popup, setPopup] = useState(false)
    const [newName, setNewName] = useState(null)

    const openPopup = () => {
        setPopup(true)
    }

    const handleSubmit = () => {
        fetch('https://rest.distressing.dev/institute/add?name='+newName, {credentials: 'include'})
        .then(res => res.json())
        .then((data) => {
          console.log(data);
          alert(newName + " Institute has successfully been added.")
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return(<>  
        <div className="sInstitute">
            <div className='si-intro'>
                <h1>Select Zone</h1>        
            </div>   
            {role === "3" ? (
                <div className="si-button">
                    <button className='add' onClick={openPopup} >Add Zone +</button>
                </div>                 
            ) : ('')} 

            <Popup trigger={popup} setTrigger={setPopup}>
                <div className='si-popup'>
                    <p>Create Zone</p>
                    <div className='si-popup-divider'></div>  
                    <div className='si-form'>
                        <form onSubmit={handleSubmit}>
                        <label><p>Name:</p></label>
                        <input type="text" onChange={e => setNewName(e.target.value)} required />

                        <button type="submit" className='form-button'>Add</button>            
                        </form>  
                    </div>                  
                </div>
            </Popup> 

            <div className="si-content">
                {institutes !== null ? (<>
                    {institutes.institutes.length > 0 ? (<>
                        {institutes.institutes.map((item) => {
                            return(<>
                                <ICard id={item.instituteID} name={item.name}/>
                            </>)
                        })}
                    </>) 
                    : (<p className='comment'>There are no existing Zones.</p>)}
                </>) : (<p className='comment'>Loading...</p>)}
            </div>           
        </div>
    </>)
}

export default SInstitute;