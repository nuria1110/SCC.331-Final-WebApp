import React, { useState, useEffect } from 'react';
import useFetch from "../myHooks/useFetch";
import { useUserData } from '../myHooks/useUserData';

function Grafana() {
    const { getRole } = useUserData()
    const role = getRole()
    const [userUrl] = useFetch('https://rest.distressing.dev/grafana/user') 
    const [url, setUrl] = useState(null)

    useEffect(() => {
        if(role === "3"){
            fetchAdmin()
        } else {
            setUrl(userUrl.url)
        }
      }, [role])

      const fetchAdmin = () => {
        Promise.all([
            fetch('https://rest.distressing.dev/grafana/admin', {credentials: "include"})
            .then(res => res.json()),
            ])
        .then((data) => {
            console.log(data)
            setUrl(data[0].url)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (<>
        <div class = "grafana">

        <div className='grafana-intro'>
            <h1>Graphs & Charts</h1>
        </div>    

        {url !== null ? (
            <iframe
                title=''
                frameBorder="0"
                src={url}>
            </iframe>
            ) : (<p>Loading...</p>)}        
        </div>
    </>)
}

export default Grafana;