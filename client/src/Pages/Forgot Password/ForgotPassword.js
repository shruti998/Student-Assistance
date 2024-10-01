/**
 * Title : ForgotPasword.js
 * Description : Class to handle forgot password functionality
 * @author : Romil Tiwari
 */

import React, { useState } from 'react';

export const ForgotPassword = () => {

    //Variable Decalration
    var [password, setPassword] = useState();
    var [confirmPassword, setConfirmPassword] = useState();
    var [email, setEmail] = useState();

    const passwordUpdate = (event) => {
        setPassword(event.target.value)
    }

    const confirmPasswordUpdate = (event) => {
        setConfirmPassword(event.target.value)
    }

    const emailUpdate = (event) => {
        setEmail(event.target.value)
    }

    /**
     * Description : Function to check if Entered Password and Confirm Password
     * are equal.
     */
    const handleReset = () => {
        if (password === confirmPassword) {
            console.log(password)
            console.log(confirmPassword)
            setPassword(password)
        } else {
            alert("New and Re-Enter Passwords do not match");
        }
    }

    /**
     * Description: Function to verify email and user is exisiting in the system
     */
    const verifyEmail = async () => {
        const postURL = "http://localhost:3000/register";
        fetch(postURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        }).then((response) => {
            if (response.status === 409) {
                alert("Email Verified");
            } else {
                alert("Email doesnot exist. Please register!");
            }
        });
    }

    //Render HTML
    return (
        <div className="parent-container">
            <div className="eventContainer">
                <div className="main-signin-header">
                    <h1 className="user-title">Forgot Password</h1>
                    <div className="landing-image-container-signup">
                        <img src="./images/login.png" alt="Sign Up">
                        </img>
                    </div>
                </div>
                <div className="eventOperationsContainer">
                    <div>
                        <form class="form-style-8" onReset={handleReset} >
                            <ul>
                                <li>
                                    <label for="Email">Email</label>
                                    <input
                                        type="text"
                                        required
                                        onChange={emailUpdate}
                                        maxlength="100"
                                    />
                                    <span>Enter Email Here</span>
                                </li>
                                <div className="verify-button">
                                    <button id="register-button" className="button1 button6" onClick={verifyEmail} >
                                        Verify
                                    </button>
                                </div>
                                <li>
                                    <label for="password">Password</label>
                                    <input id="new"
                                        type="password"
                                        name="password"
                                        required
                                        onChange={passwordUpdate}
                                        maxlength="100"
                                    />
                                    <span>Enter New Password Here</span>
                                </li>
                                <li>
                                    <label for="password">Re-Enter Password</label>
                                    <input id="confirm"
                                        name="confirm"
                                        type="password"
                                        required
                                        onChange={confirmPasswordUpdate}
                                        maxlength="100"
                                    />
                                    <span>Re-Enter New Password Here</span>
                                </li>
                            </ul>
                            <a>
                                <button type="reset" className="button button5"> Reset </button>
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword