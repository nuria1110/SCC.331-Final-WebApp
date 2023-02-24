import React, { useState, useEffect } from 'react';
import BSetting from './BSetting';
import USetting from './USetting';
import MSetting from './MSetting';

function AdminSettings(props) {

    const [setting, setSetting] = useState(null)

    useEffect(() => {
        if (props.s === "Buildings"){
            setSetting(<BSetting/>)
        } else if (props.s === "Users") {
            setSetting(<USetting/>)
        } else if (props.s === "Microbits") {
            setSetting(<MSetting/>)
        }
    }, [props.s])


    return (
        <>{setting}</>
    )
}

export default AdminSettings