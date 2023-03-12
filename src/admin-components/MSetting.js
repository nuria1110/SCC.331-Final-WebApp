import React, { useState } from "react";
import useFetch from "../myHooks/useFetch";

function MSetting() {

    const [microbits] = useFetch('https://rest.distressing.dev/microbit/all')

    const [types, setTypes] = useState({
        sensor: true,
        door: true,
        walker: true,
        null: true
    })

    const onChange = (e) => {
        setTypes({ ...types, [e.target.value]: e.target.checked });
    };  
    
    const handleRemove = (id) => {
        if (window.confirm('Are you sure you wish to remove this walker?')){
            Promise.all([
                fetch('https://rest.distressing.dev/microbit/delete/walker?microbitID='+id, {credentials: "include"})
                .then(res => res.json()),
                ])
            .then((data) => {
                console.log(data)
                window.location.reload(false)
            })
            .catch((err) => {
                console.log(err);
            });            
        }
    }

    const handleAdd = (id) => {

        Promise.all([
            fetch('https://rest.distressing.dev/microbit/add/walker?microbitID='+id, {credentials: "include"})
            .then(res => res.json()),
            ])
        .then((data) => {
            console.log(data)
            alert("Microbit " +id+ " assigned as walker.")
            window.location.reload(false)
        })
        .catch((err) => {
            console.log(err);
        });            
    }

    return (
        <div className="us-content">

            <p>Microbit sensors and doors can be managed through the Areas setting tab.</p>

            <div className="filters">
                <label class="um-container">
                    <input
                        type="checkbox"
                        value="sensor"
                        checked={types.sensor}
                        onChange={onChange}/>
                    <span class="checkmark"></span>
                    Sensors
                </label>

                <label class="um-container">
                    <input
                        type="checkbox"
                        value="door"
                        checked={types.door}
                        onChange={onChange}/>
                    <span class="checkmark"></span>
                    Doors
                </label>

                <label class="um-container">
                    <input
                        type="checkbox"
                        value="walker"
                        checked={types.walker}
                        onChange={onChange}/>
                    <span class="checkmark"></span>
                    Walkers
                </label>

                <label class="um-container">
                    <input
                        type="checkbox"
                        value="null"
                        checked={types.null}
                        onChange={onChange}/>
                    <span class="checkmark"></span>
                    Not Assigned
                </label>
            </div>

            {microbits !== null ? (<>
                {microbits.microbits.length > 0 ? (<>
                    {microbits.microbits.filter(x => types[(x.type).toLowerCase()]).map((item) => {
                        return(<>
                            <div className="us-item">   
                                {item.type === "null" && <button className="r-button edit right" onClick={() => handleAdd(item.microbitID)}>Assign Walker</button>} 
                                {item.type === "walker" && <button className="r-button red right" onClick={() => handleRemove(item.microbitID)}>Remove Walker</button>} 
                                <p>Microbit: {item.microbitID}</p>
                                <p className="item-detail">- {item.type}</p>
                            </div>
                            <div className='room-divider'></div>
                        </>)
                    })}
                </>) : (<p className="comment">No Microbits found.</p>)}
            </>) : (<p className="comment">Loading...</p>)} 

        </div>
    )
}

export default MSetting