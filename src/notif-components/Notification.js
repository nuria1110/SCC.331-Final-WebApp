import React from "react";

function Notification(props) {
    return (<>
        <div className="notif">
            <p>Microbit: <b>{props.id}</b></p>
            <p>{props.mesg}</p>
            <p className="notif-time">{props.time}</p>
        </div> 
    </>);
}

export default Notification;