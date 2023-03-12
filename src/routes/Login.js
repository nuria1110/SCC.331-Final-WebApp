import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../myHooks/useUserData';
import { Link } from "react-router-dom";
import '../login.css';

function Login() {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const { setRole } = useUserData()
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn) {
          navigate('/selectinstitute');
        }
      });

      const handleSubmit = (e) => {
        e.preventDefault();
    
        fetch('https://rest.distressing.dev/login?user='+username+'&password='+password, {credentials: 'include'})
        .then(res => res.json())
        .then((data) => {
          console.log(data);
          if (!data.success) {
            alert("Error logging in")
          } else {
            setRole(data.auth)
            setLoggedIn(true);
          }
        })
        .catch((err) => {
            console.log(err);
        });
      }

    return(<>
        <div className="login">            
            <div className='l-intro'>
                <h1>Log In</h1>        
            </div>
            <div className='l-form'>
                <form onSubmit={handleSubmit}>
                <label><p>Username:</p></label>
                <input type="text" onChange={e => setUserName(e.target.value)} required />
                <label><p>Password:</p></label>
                <input type="password" onChange={e => setPassword(e.target.value)} required />

                <button type="submit" className='li-button'>Log In</button>            
                </form>  
            </div>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div> 
    </>)
}

export default Login;