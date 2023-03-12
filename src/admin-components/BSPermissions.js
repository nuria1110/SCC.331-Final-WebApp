import React, { useState, useEffect} from "react";
import useFetch from "../myHooks/useFetch";

function BSPermissions(props) {

    const [walkers] = useFetch('https://rest.distressing.dev/microbit/walker')
    const [haveAccess] = useFetch('https://rest.distressing.dev/door/ids?doorID='+props.id)

    const [checkedState, setCheckedState] = useState('')
    const [checkAll, setCheckAll] = useState(false)

    useEffect(() => {
        if(walkers !== null && haveAccess !== null) {
            walkers.microbits.forEach(item => {
                haveAccess.microbits.includes(item.microbitID) ? setCheckedState(checkedState => ([...checkedState, true])) : setCheckedState(checkedState => ([...checkedState, false]))                
            });
            console.log(checkedState)
        }
    }, [walkers])

    const deletePermission = (id) => {
        Promise.all([
            fetch('https://rest.distressing.dev/door/delete/permission?doorID='+props.id+'&microbitID='+id, {credentials: "include"})
            .then(res => res.json()),
            ])
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const addPermission = (id) => {
        Promise.all([
            fetch('https://rest.distressing.dev/door/add/permission?doorID='+props.id+'&microbitID='+id, {credentials: "include"})
            .then(res => res.json()),
            ])
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleCheckAll = () => {
        let updatedCheckedState = checkedState
        if(!checkAll) {
            setCheckAll(true)
            updatedCheckedState = updatedCheckedState.map(s => true)
            setCheckedState(updatedCheckedState)
        } else {
            setCheckAll(false)
            updatedCheckedState = updatedCheckedState.map(s => false)
            setCheckedState(updatedCheckedState)
        }
    }

    const handleChange = (i) => {
        let updatedCheckedState = checkedState.map((state, index) => 
            index === i ? !state : state);
        console.log(updatedCheckedState)
        setCheckedState(updatedCheckedState);
    }

    const handleSave = () => {
        walkers.microbits.forEach((item, index) => {
            if(checkedState[index]){
                addPermission(item.microbitID)
            } else {
                deletePermission(item.microbitID)
            }
        })
        alert("User door access permissions have been saved.")
    }


    return (<>
        <div className='si-popup'>
            <p>User Permissions:</p>
            <p>{props.name}</p>
            <div className='si-popup-divider'></div>  
            <div className='si-form'>

                <form onSubmit={handleSave}>
                    {walkers !== null ? (<>
                        {walkers.microbits.length > 0 ? (<>
                            <div className="up-list">

                                <label className="um-container">
                                    <input
                                        type="checkbox"
                                        checked={checkAll}
                                        onChange={handleCheckAll}/>
                                    <span className="checkmark"></span>
                                    <b>Select All</b>
                                </label>

                                {checkedState.length > 0 && walkers.microbits.map((item, index) => {
                                    return (     
                                        <label className="um-container" key={item.microbitID}>
                                            <input
                                                type="checkbox"
                                                id={item.microbitID}
                                                checked={checkedState[index]}
                                                onChange={() => handleChange(index)}/>
                                            <span className="checkmark"></span>
                                            User {item.microbitID}
                                        </label>
                                    );
                                })}                                 
                            </div>                        
                            <button type="submit" className='form-button'>Save</button> 
                        </>) : (<p>No users available.</p>)}
                    </>) : (<p>Loading...</p>)}      
                </form>  
                
            </div>                  
        </div>
        
    </>)
}

export default BSPermissions