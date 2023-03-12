import React, { useState } from 'react'
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
    const [searchInput, setSearchInput] = useState("");

    const handleSInstitute = () => {
        navigate('/selectinstitute');
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    return (<>
        <div className = "dashboard">
            <div className = "db-intro">
                
                <button className='db-button grey' onClick={handleSInstitute}><AiOutlineArrowLeft/><span>Select Zone</span></button>
                <h1>Hi!</h1>
                <h2>Welcome to the {instituteData[1]} Dashboard.</h2>  
                
                <div className='db-search'>
                    <input
                        type="text"
                        placeholder="Search Area"
                        onChange={handleSearch}
                        value={searchInput} />
                </div>    
                
            </div>      

            <div className = "db-content">
                {buildingData !== null ? (<>
                    {buildingData.buildings.length > 0 ? (<>
                        {buildingData.buildings.filter(x => x.buildingName.toLowerCase().includes(searchInput.toLowerCase())).map((item) => {
                            return (                        
                                <Building id={item.buildingID} name={item.buildingName}/>
                            );
                        })}
                    </>) : (<p className="comment">There are no Areas in this Zone yet. To add one, got to the Administrator settings page. </p>)}
                </>) : (<p className="comment">Loading...</p>)} 
            </div>
        </div>            
    </>)
}

export default Dashboard