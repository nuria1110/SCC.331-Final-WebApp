import React, {useState, useEffect} from "react";

function Sensor(props) {

    const [temperature, setTemperature] = useState(null)
    const [noise, setNoise] = useState(null)
    const [light, setLight] = useState(null)
    const [descN, setDescN] = useState("")
    const [descL, setDescL] = useState("")

    const timedFetch = () => {
        Promise.all([
            fetch('https://rest.distressing.dev/latest?microbitID='+parseInt(props.id)+'&type=temperature&offset=0', {credentials: "include"})
            .then(res => res.json()),
            fetch('https://rest.distressing.dev/latest?microbitID='+parseInt(props.id)+'&type=noise&offset=0', {credentials: "include"})
            .then(res => res.json()),
            fetch('https://rest.distressing.dev/latest?microbitID='+parseInt(props.id)+'&type=light&offset=0', {credentials: "include"})
            .then((res) => res.json())
            ])
        .then((data) => {
            console.log(data)
            setTemperature(data[0].temperature)
            setNoise(data[1].noise)
            setLight(data[2].light)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        timedFetch()
        const interval = setInterval(() => {
            timedFetch()
        }, 5000);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        if(noise && noise >= 30){
            setDescN("Loud")
        } else if (noise && noise >= 20) {
            setDescN("Moderate")
        } else {
            setDescN("Quiet")
        }

        if(light && light >= 100){
            setDescL("Bright")
        } else {
            setDescL("Dark")
        }
    }, [noise, light])


    return (<>
        <div className="db-sensor">
            <p>Sensor {props.id}</p>
            <table id = "sensors">
                <thead>
                    <tr>
                        <th>Temperature</th>
                        <th>Noise</th>
                        <th>Light</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    {temperature !== null ? (
                        <>                            
                        <td>{temperature} °C</td>
                        <td>{descN}</td>
                        <td>{descL}</td>
                        </>
                    ) :(<td>Loading...</td>) }
                </tr>                         
                </tbody>
            </table>
        </div>
    
    </>)
}

export default Sensor