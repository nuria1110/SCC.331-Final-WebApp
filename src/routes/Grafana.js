import React, { useState, useEffect } from 'react';
import { useUserData } from '../myHooks/useUserData';

function Grafana() {
    const { getRole } = useUserData()
    const role = getRole()
    const [url, setUrl] = useState(null)

    useEffect(() => {
        if(role === "3"){
            setUrl('https://grafana.distressing.dev/d/SJ0h3d1Vk/331-admin-dashboard?kiosk=tv&from=now-1h&to=now&refresh=5s')
        } else {
            setUrl('https://grafana.distressing.dev/d/kDr5qOJVk/331-user-dashboard?orgId=2&from=now-1h&to=now&refresh=5s&kiosk=tv')
        }
      }, [role])

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