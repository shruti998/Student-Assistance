/**
 * Title : Login.js
 * Description : Class to handle Login functionality
 * @author : Romil Tiwari
 */

import React, { useState } from 'react';
import './Login.scss'
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { authTokenState } from '../../Auth/authSelector';

export const Login = () => {
    var [authToken, setAuthToken] = useRecoilState(authTokenState);
    const navigate = useNavigate();

    //Variable Declaration
    var [email, setEmail] = useState();
    var [password, setPassword] = useState();
    var [isAdmin,setIsAdmin]=useState(false);
    var [isAdminDiv,setIsAdminDiv]=useState(true);
    var [isUserDiv,setIsUserDiv]=useState(true);

    const adminUpdate = (event) => {
        setIsAdmin(true)
        console.log("admin update",isAdmin)
        setIsAdminDiv(true)
        setIsUserDiv(false)
    }
    const userUpdate = (event) => {
        setIsAdmin(false)
        console.log("user  update",isAdmin)
        setIsAdminDiv(false)
        setIsUserDiv(true)
    }


    const setEmailUpdate = (event) => {
        setEmail(event.target.value)
    }

    const passwordUpdate = (event) => {
        setPassword(event.target.value)
    }

    /**
     * Description : Handle Login Activity
     * @param {*} event 
     */
    const handleLogin = () => {
        console.log("admin",isAdmin)
       if(isAdmin==false){
        const loginUrl =  "http://localhost:3000/login";
        fetch(loginUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        }).then((result) => result.json()).then(json => {
            console.log(json);
            window.sessionStorage.setItem("authToken", json.authToken.token);
            setAuthToken(window.sessionStorage.getItem("authToken"));
            window.location.replace('/');
        });
       }
       else{
        const postURL = "http://localhost:3000/admin/login";
        fetch(postURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email:email,
                password: password
            }),
        }).then((result) => result.json()).then(json => {
            console.log(json);
            window.sessionStorage.setItem("authToken", json.authToken.token);
            setAuthToken(window.sessionStorage.getItem("authToken"));
            window.location.replace('/Admin');
        });
       }
    };

  
    //Render HTML
    return (
        <div className="parent-container">
            <div className="eventContainer">
                <div className="main-signin-header">
                    <h1 className="user-title">Sign In</h1>
                    <div className="landing-image-container-signup">
                        <img src="./images/login.png" alt="Sign Up">
                        </img>
                    </div>
                    <div className="heading-top">
                                <label>
                                    Don't have an account yet?&nbsp;
                                </label>
                                <a href="/register">
                                    <button id="register-button" className="button1 button6">
                                        Register
                                    </button>
                                </a>
                            </div>
                </div>
                <div className="eventOperationsContainer">
                    <div>
                        <div className='adminoruser'>
                       { isAdminDiv?<div >
                        <button className='ad className="button button5' onClick={adminUpdate}>Admin</button>
                        </div>:null
}
{ isUserDiv?<div>
                          <button className='ad className="button button5'onClick={userUpdate}>User</button>
                          </div>
                          :null}
                        </div>
                        <div className="form-style-8">
                            <ul>
                                <li>
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        required
                                        onChange={setEmailUpdate}
                                        maxLength="100"
                                    />
                                    <span>Enter your registered email here</span>
                                </li>
                                <li>
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        required
                                        onChange={passwordUpdate}
                                        maxLength="100"
                                    />
                                    <span>Enter password here</span>
                                </li>
                            </ul>
                            <div>
                                <a>
                                    <button className="button button5" onClick={handleLogin}> Login</button>
                                </a>
                            </div>
                            <div className="forgot-password">
                                <a href = "/Forgotpassword">
                                <label>
                                    Forgot Password?&nbsp;
                                </label>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login;