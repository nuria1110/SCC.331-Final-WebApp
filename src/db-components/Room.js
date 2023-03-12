import React from "react";
import useFetch from "../myHooks/useFetch";
import Sensor from "./Sensor";

function Room(props) {

    const [sensors] = useFetch('https://rest.distressing.dev/room/sensors?roomID='+parseInt(props.id))

    return (<>
        <div className="db-room">
            {sensors !== null ? (<>
                {sensors.sensors.length > 0 ? (<>
                    <h3>{props.name}</h3>
                    {sensors.sensors.map((item) => {
                        return (                        
                            <Sensor id={item.sensorID}/>  
                        );
                    })}                
                </>) : ('')}       
            </>):(<p>Loading...</p>)}
        </div>
    </>)
}

export default Room