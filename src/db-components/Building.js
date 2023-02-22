import React, {useState, useEffect} from "react";
import useFetch from "../myHooks/useFetch";
// import Room from './Room';
import "../style.css";

function Building(props) {

    const name = props.name;    
    const [capacity, setCapacity] = useState(null)
    const [rooms] =  useFetch('https://rest.distressing.dev/room/info?buildingID='+ parseInt(props.id))

    const timedFetch = () => {
        Promise.all([
            fetch('https://rest.distressing.dev/building/count?buildingID='+ parseInt(props.id), {credentials: 'include'})
            .then(res => res.json()),
            ])
        .then((data) => {
            console.log(data[0])
            setCapacity(data[0].total)
        })        
    }

    useEffect(() => {
        timedFetch();
        const interval = setInterval(() => {
            timedFetch()
        }, 5000);
        return () => clearInterval(interval);
    });


    return (<>
        <div className='db-card'>
            <h2>{name}</h2> 

            {capacity !== null && rooms !== null ? (<>
                <h3>Current Capacity:</h3>
                <div className="db-cap">                    
                    <p>{capacity}</p>
                </div>                             
            </>):(<p>Loading...</p>)}

        </div>
    </>)
}

export default Building