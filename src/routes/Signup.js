import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../login.css';

function Signup() {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();

    const [pwFail, setPwFail] = useState(false)
    const navigate = useNavigate();

    const handleSignup = (e) => {
        if (password === password2) {
            signUp()
            alert('Sign up successful.')
            navigate('/');
        } else {
            e.preventDefault()
            setPwFail(true)
        }
    }

    const signUp = () => {
        fetch('https://rest.distressing.dev/users/add?user='+username+'&password='+password, {credentials: 'include'})
        .then(res => res.json())
        .then((data) => {
            console.log(data);
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
                    <label><p>Confirm Password:</p></label>
                    <input type="password" onChange={e => setPassword2(e.target.value)} />
                    {pwFail ? (<p className="comment">! Please check your passwords match.</p>) : ('')}

                    <button type="submit" className='su-button'>Sign Up</button>            
                </form>  
            </div>
            <p>Already have an account? <Link to="/">Log In</Link></p>
        </div> 
    </>)
}

export default Signup;