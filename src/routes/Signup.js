import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../login.css';

function Signup() {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSignup = () => {
        fetch('https://rest.distressing.dev/users/add?user='+username+'&password='+password, {credentials: 'include'})
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            // navigate('/');
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return(<>
        <div className="login">            
            <div className='l-intro'>
                <h1>Sign up</h1>        
            </div>
            <div className='l-form'>
                <form onSubmit={handleSignup}>
                <label><p>Username:</p></label>
                <input type="text" onChange={e => setUserName(e.target.value)} required />
                <label><p>Password:</p></label>
                <input type="password" onChange={e => setPassword(e.target.value)} required />

                <button type="submit" className='su-button'>Sign Up</button>            
                </form>  
            </div>
            <p>Already have an account? <Link to="/">Log In</Link></p>
        </div> 
    </>)
}

export default Signup;