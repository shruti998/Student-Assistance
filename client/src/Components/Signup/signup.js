// import React, { Component } from 'react';
import React from "react";
import { FormErrors } from "./FormErrors";
import "./signup.scss";
import "./../../Pages/Manage Events/PostEvents.scss";
import { useHistory } from 'react-router-dom';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            fullName: "",
            email: "",
            password: "",
            //   confirmpassword: ''
            formErrors: { userName: "", fullName: "", email: "", password: "" },
            userNameValid: false,
            fullNmaeValid: false,
            emailValid: false,
            passwordValid: false,
            formValid: false,
        };
    }
    save() {

        const postURL = "http://localhost:3000/register";
        fetch(postURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // We should keep the fields consistent for managing this data later
                userName: this.state.userName,
                fullName: this.state.userName,
                email: this.state.email,

                password: this.state.password,

            }),
        }).then(() => {
            // Once posted, the user will be notified
            alert("You have been added to the system!");
        });
    }

    // /**
    //  * @Definition : Fetch ToDo Data from Database
    //  */
    //  fetchValueFromDatabase() {
    //     fetch('http://localhost:3000/todolist/', {
    //         method: 'GET',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //     }).then(response => response.json())
    //         .then(responseList => {
    //             this.setState({
    //                 data: responseList
    //             })
    //         })
    //         .catch(error => this.setState({ error }));
    // }


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let userNameValid = this.state.userNameValid;
        let fullNameValid = this.state.fullNameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        // let confirmpasswordValid = this.state.confirmpasswordValid;

        switch (fieldName) {
            case "userName":
                userNameValid = value.length <= 8;
                fieldValidationErrors.userName = userNameValid
                    ? ""
                    : " must be less than 8 characters";
                break;
            case "fullName":
                fullNameValid = value.length <= 20;
                fieldValidationErrors.fullName = fullNameValid
                    ? ""
                    : " must be less than 20 characters";
                break;
            case "email":
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? "" : " is invalid";
                break;
            case "password":
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? "" : " is too short";
                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                userNameValid: userNameValid,
                fullNameValid: fullNameValid,
                emailValid: emailValid,
                passwordValid: passwordValid,
            },
            this.validateForm
        );
    }

    validateForm() {
        this.setState({
            formValid:
                this.state.userNameValid &&
                this.state.fullNameValid &&
                this.state.emailValid &&
                this.state.passwordValid,
        });
    }

    errorClass(error) {
        return error.length === 0 ? "" : "has-error";
    }
    //   routeChange=()=> {
    //     let path = `/`;
    //     let history = useHistory();
    //     history.push(path);
    //   }

    render() {
        return (
            <div className="super-parent-container">
            <div className="parent-container">
                <div className="eventContainer">
                    <div className="main-signup-header">
                        <h1 className="eventsTitle">Welcome User</h1>
                        <div className="landing-image-container-signup">
                            <img src="./images/profiling.png" alt="Sign Up">
                            </img>
                        </div>
                    </div>
                    <div className="eventOperationsContainer">
                        <form class="form-style-7" >
                            <h2>Sign up</h2>
                            <p>
                                Already Have an account?&nbsp;
                                <a href="http://localhost:3000/login">Sign In!</a>
                            </p>
                            <div className="panel panel-default">
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>
                            <ul>
                                <li>
                                    <div
                                        className={`form-group ${this.errorClass(
                                            this.state.formErrors.userName
                                        )}`}
                                    >
                                        <label htmlFor="userName">Username</label>
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            placeholder=""
                                            onChange={this.handleUserInput}
                                        />

                                    </div>
                                    <span>Enter Your User Name here</span>
                                </li>
                                <li>
                                    <div
                                        className={`form-group ${this.errorClass(
                                            this.state.formErrors.fullName
                                        )}`}
                                    >
                                        <label htmlFor="fullName">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            name="fullName"
                                            onChange={this.handleUserInput}
                                        />
                                    </div>
                                    <span>Enter Your Full Name here</span>
                                </li>
                                <li>
                                    <div
                                        className={`form-group ${this.errorClass(
                                            this.state.formErrors.email
                                        )}`}
                                    >
                                        <label htmlFor="email">Email address</label>
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            name="email"
                                            onChange={this.handleUserInput}
                                        />
                                    </div>
                                    <span>Enter Your Email here</span>
                                </li>
                                <li>
                                    <div
                                        className={`form-group ${this.errorClass(
                                            this.state.formErrors.password
                                        )}`}
                                    >
                                        <label htmlFor="password">Password</label>
                                        <input
                                           type="text"
                                            className="form-control"
                                            name="password"
                                            onChange={this.handleUserInput}
                                        />
                                    </div>
                                    <span>Enter Your User Password here</span>
                                </li>
                            </ul>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!this.state.formValid}
                                onClick={this.save.bind(this)}
                            //   onClick={this.routeChange}
                            >
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="parent-container-login">

            </div>
            </div>
        );
    }
}

export default SignUp;
