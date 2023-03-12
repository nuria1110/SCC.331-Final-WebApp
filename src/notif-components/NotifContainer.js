import React, { useState } from 'react';
import useFetch from '../myHooks/useFetch';
import Notification from './Notification';
import { MdError } from 'react-icons/md'
import "./notif.css";

function NotifContainer() {

    const [errors] = useFetch('https://rest.distressing.dev/error/info')

    const [notif, setNotif] = useState(false);
    const showNotif = () => setNotif(!notif);


    return (
        <div className='notifications'>
            {errors !== null ? (<>
            
                <button className='notif-button' onClick={showNotif}>
                    {errors.errors.length > 0 && <button className='badge'>{errors.errors.length}</button>}
                    <MdError/>
                </button>
                
                <div className={notif ? "notif-container active" : "notif-container"}>
                    <p><b>Micro:bit Alerts</b></p>
                        {errors.errors.map((item) => {
                            return (<>
                                <Notification id={item.microbitID} mesg={item.error} time={item.time}/>
                            </>)
                        })}
                </div>
           </>) : ('')}

        </div>
    )
}

export default NotifContainer