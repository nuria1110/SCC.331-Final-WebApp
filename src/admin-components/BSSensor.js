import React, { useState } from 'react';
import useFetch from "../myHooks/useFetch";

function BSSensors(props) {
  
    const [sensors] = useFetch('https://rest.distressing.dev/room/sensors?roomID=' + props.id)

    const [newSensor, setNewSensor] = useState(null)

    const handleRemoveSensor = (id) => {
        Promise.all([
            fetch('https://rest.distressing.dev/sensor/delete?microbitID='+ id, {credentials: "include"})
            .then(res => res.json()),
            ])
        .then((data) => {
            console.log(data)
            alert("Sensor removed from " + props.name)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleAddSensor = () => {
        Promise.all([
            fetch('https://rest.distressing.dev/sensor/add?microbitID='+newSensor+'&roomID='+props.id, {credentials: "include"})
            .then(res => res.json()),
            ])
        .then((data) => {
            console.log(data)
            alert("Sensor "+newSensor+" added to "+props.name)
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    return (<>
        {props.isPopup ? (<>
            <div className='si-popup'>
                <p>Edit {props.name} Sensors</p>
                <div className='si-popup-divider'></div> 

                <form  className='a-sensor' onSubmit={handleAddSensor}>
                    <label><p>Add Sensor:</p></label>
                        <input type="number" onChange={e => setNewSensor(e.target.value)} required />
                        <button type="submit" className='r-button add right'>Add</button> 
                </form>   

                {sensors !== null ? (<>                
                    {sensors.sensors.length > 0 ? (<>
                        <form className='e-sensor'>
                            {sensors.sensors.map((item) => {
                                return(<>
                                    <button className='r-button red right' onClick={() => handleRemoveSensor(item.sensorID)}>Remove</button>   
                                    <p key={item.sensorID}>Sensor {item.sensorID}</p> 
                                    <div className='si-popup-divider'></div>                                     
                                </>)
                            })}                        
                        </form>
                    </>) : (<p>No Sensors.</p>)}
                </>):(<p>Loading...</p>)}   
            </div>
        </>) : (<>
            <div className='bs-sensors'>
                {sensors !== null ? (<>                
                    {sensors.sensors.length > 0 ? (<>
                        {sensors.sensors.map((item) => {
                            return(
                                <p key={item.sensorID}>Sensor {item.sensorID}</p>                                
                            )
                        })}                  
                    </>) : (<p>No Sensors.</p>)}
                </>):(<p>Loading...</p>)}            
            </div>        
        </>)}

    </>)
}

export default BSSensors