import React, { useState, useEffect} from "react";
import useFetch from "../myHooks/useFetch";

function BSPermissions(props) {

    const [walkers] = useFetch('https://rest.distressing.dev/room/ids/all')
    const [haveAccess] = useFetch('https://rest.distressing.dev/door/ids?doorID='+props.id)

    const [checkedState, setCheckedState] = useState(null);
    const [checkAll, setCheckAll] = useState(false)

    useEffect(()=> {
        if(walkers !== null){
            let accessArray = []
            walkers.microbits.forEach((i) => {
                accessArray.push(haveAccess.microbits.includes(i))
            })
            setCheckedState(accessArray)            
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
        const updatedCheckedState = checkedState.map((state, index) => 
            index === i ? !state : state);
        console.log(updatedCheckedState)
        setCheckedState(updatedCheckedState);
    }

    const handleSave = () => {
        walkers.microbits.forEach((e, index) => {
            if(checkedState[index]){
                console.log("add" + e)
                addPermission(e)
            } else {
                console.log("delete" + e)
                deletePermission(e)
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
                    {walkers !== null && checkedState !== null ? (<>
                        {walkers.microbits.length > 0 ? (<>
                            <div className="up-list">

                                <label class="um-container">
                                    <input
                                        type="checkbox"
                                        checked={checkAll}
                                        onChange={handleCheckAll}/>
                                    <span class="checkmark"></span>
                                    Select All
                                </label>

                                {walkers.microbits && walkers.microbits.map((item, index) => {
                                    return (     
                                        <label class="um-container" key={item}>
                                            <input
                                                type="checkbox"
                                                id={item}
                                                checked={checkedState[index]}
                                                onChange={() => handleChange(index)}/>
                                            <span class="checkmark"></span>
                                            User {item}
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