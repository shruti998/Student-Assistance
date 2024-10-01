/**
 * Title : ManageEvents.js
 * Description : Class to handle CRUD operations on Events
 * @author : Romil Tiwari
 */

import { responsiveArray } from 'antd/es/_util/responsiveObserve';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Signup.scss';

export const UserInteraction = () => {

     //Variable Declaration
    const navigate = useNavigate();
    var [showRegistrationDiv, setRegistrationDiv] = useState(true);
    var [userName, setUserName] = useState();
    var [fullName, setFullname] = useState();
    var [email, setEmail] = useState();
    var [password, setPassword] = useState();
    
    const userNameUpdate = (event) => {
        setUserName(event.target.value)
    }

    const fullNameUpdate = (event) => {
        setFullname(event.target.value)
    }

    const emailUpdate = (event) => {
        setEmail(event.target.value)
    }

    const passwordUpdate = (event) => {
        setPassword(event.target.value)
    }

    /**
     * Description : Function to save value to db
     */
    const sendValueToDb = async () => {
        const postURL = "http://localhost:3000/register";
        fetch(postURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: userName,
                fullName: fullName,
                email: email,
                password: password

            }),
        }).then((response) => {
            if(!response.ok) {
                alert("This Email Already Exists. Please Login to continue");
            } else {
                alert("Registration Successful");
            }
        });
    }

    // Render HTML
    return (
        <div className="super-parent-container">
            {showRegistrationDiv ? <div className="parent-container">
                <div className="eventContainer">
                    <div className="main-signup-header-register">
                        <h1 className="user-title">Register</h1>
                        <div className="landing-image-container-signup">
                            <img src="./images/profiling.png" alt="Sign Up">
                            </img>
                        </div>
                        <div className='heading-top'>
                        <a href= "/Login">
                                <label>
                                    Already Have an account?&nbsp;
                                </label>
                                <button id="signup-button" className="button1 button6">
                                    Sign In
                                </button>
                                </a>
                                </div>
                    </div>
                    <div className="eventOperationsContainer">
                        <form className="form-style-8">
                            <ul className="form-register">
                                <li>
                                    <label htmlFor="userName">Username</label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={20}
                                        minLength={5}
                                        className="form-control"
                                        name="userName"
                                        onChange={userNameUpdate}
                                    />
                                    <span>Enter Your User Name here</span>
                                </li>
                                <li>
                                    <label htmlFor="fullName">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={20}
                                        minLength={5}
                                        className="form-control"
                                        name="fullName"
                                        onChange={fullNameUpdate}
                                    />
                                    <span>Enter Your Full Name here</span>
                                </li>
                                <li>
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        name="email"
                                        onChange={emailUpdate}
                                    />
                                    <span>Enter Your Email here</span>
                                </li>
                                <li>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        required
                                        maxLength={20}
                                        minLength={5}
                                        className="form-control"
                                        name="password"
                                        onChange={passwordUpdate}
                                    />
                                    <span>Enter Your User Password here</span>
                                </li>
                            </ul>
                            <button type = "submit" className="button button5" onClick={sendValueToDb} >Submit</button>
                        </form>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}

export default UserInteraction;