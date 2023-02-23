import React, { useEffect } from 'react'
import useFetch from "../myHooks/useFetch";
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../myHooks/useUserData';
import Building from '../db-components/Building';
import { AiOutlineArrowLeft } from "react-icons/ai";

function Dashboard() {
    const { getInstituteData } = useUserData()
    const instituteData = getInstituteData()
    const navigate = useNavigate();

    const [buildingData] = useFetch('https://rest.distressing.dev/building/info?instituteID='+instituteData[0])

    const handleSInstitute = () => {
        navigate('/selectinstitute');
    }

    return (<>
        <div className = "dashboard">
            <div className = "db-intro">
                <button className='db-button' onClick={handleSInstitute}><AiOutlineArrowLeft/><span>Select Institute</span></button>
                <h1>Hi!</h1>
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