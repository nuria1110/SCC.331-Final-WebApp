import React, { useEffect } from 'react'
import useFetch from "../myHooks/useFetch";
import { useUserData } from '../myHooks/useUserData';
import Building from '../db-components/Building';

function Dashboard() {
    const { getInstituteData } = useUserData()
    const instituteData = getInstituteData()

    const [buildingData] = useFetch('https://rest.distressing.dev/building/info?instituteID='+instituteData[0])

    return (<>
        <div className = "dashboard">
            <div className = "db-intro">
                <h1>Hello,</h1>
                <h2>Welcome to the {instituteData[1]} Dashboard.</h2>   
            </div>        
            
            <div className = "db-content">
                {buildingData == null ? (<p>Loading...</p>) : (<>
                    {buildingData.buildings && buildingData.buildings.map((item) => {
                        return (                        
                            <Building id={item.buildingID} name={item.buildingName}/>
                        );
                    })} 
                </>)}                    
            </div>
        </div>            
    </>)
}

export default Dashboard