import React, { useState } from "react";
import useFetch from "../myHooks/useFetch";

function MSetting() {

    const [microbits] = useFetch('https://rest.distressing.dev/microbit/all')

    const [types, setTypes] = useState({
        sensor: true,
        door: true,
        light: true,
        walker: true,
        none: true
    })

    const onChange = (e) => {
        setTypes({ ...types, [e.target.value]: e.target.checked });
    };   

    return (
        <div className="us-content">

            <p>Microbit roles can be managed through the Areas setting tab.</p>

            <div>
                <label><input
                    type="checkbox"
                    value="sensor"
                    checked={types.sensor}
                    onChange={onChange}
                />Sensors</label>

                <label><input
                    type="checkbox"
                    value="door"
                    checked={types.door}
                    onChange={onChange}
                />Door</label>

                <label><input
                    type="checkbox"
                    value="light"
                    checked={types.light}
                    onChange={onChange}
                />Light</label>

                <label><input
                    type="checkbox"
                    value="walker"
                    checked={types.walker}
                    onChange={onChange}
                />Walker</label>

                <label><input
                    type="checkbox"
                    value="none"
                    checked={types.none}
                    onChange={onChange}
                />Not Assigned</label>

            </div>

            {microbits !== null ? (<>
                {microbits.microbits.length > 0 ? (<>
                    {microbits.microbits.filter(x => types[(x.type).toLowerCase()]).map((item) => {
                        return(<>
                            <div className="us-item">   
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