import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../login.css';

function Signup() {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSignup = () => {

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