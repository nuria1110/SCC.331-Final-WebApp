import React, { useState, useEffect } from 'react';
import useFetch from "../myHooks/useFetch";

function BSSensors(props) {
  
    const [sensors] = useFetch('https://rest.distressing.dev/room/sensors?roomID=' + props.id)
    const [nullMicrobits] = useFetch('https://rest.distressing.dev/microbit/null')
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        if(nullMicrobits !== null ){
            if(nullMicrobits.microbits.length > 0) {
                setSelected(nullMicrobits.microbits[0].microbitID)
            }
        }
    }, [nullMicrobits])

    const handleChangeDropdown = (e) => {
        setSelected(e.target.value)
    }
    
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
            fetch('https://rest.distressing.dev/sensor/add?microbitID='+selected+'&roomID='+props.id, {credentials: "include"})
            .then(res => res.json()),
            ])
        .then((data) => {
            console.log(data)
            alert("Sensor "+selected+" added to "+props.name)
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

                        {nullMicrobits !== null ? (<>
                            {nullMicrobits.microbits.length > 0 ? (<>
                                <div className="sensor-dropdown">
                                    <select value={selected} onChange={(e) => handleChangeDropdown(e)}>
                                        {nullMicrobits.microbits.map((item) => {
                                            return (
                                                <option key={item.microbitID} value={item.microbitID}>{item.microbitID}</option>
                                            );
                                        })}
                                    </select>
                                </div>                            
                            </>) : (<p>No available microbits.</p>)}
                        </>) : (<p>Loading...</p>)}

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