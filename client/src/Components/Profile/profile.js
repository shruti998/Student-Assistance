
import React, { useState } from "react";

export const Profile = () => {
    var userId= localStorage.getItem("userid");
    var [user, setUser] =  useState();
    var [password, setPassword] = useState();
    var [confirmPassword, setConfirmPassword] = useState();
    var [email, setEmail] = useState();
    var [fullName, setFullname] = useState();
    var [userName, setusername] = useState();
    var [currentUser, setCurrentUser] = useState(null);
    React.useEffect( () => {
       var temp =  async () => {
        const userDet = await fetch("http://localhost:3000/profile/"+userId, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }});
        var data = await userDet.json();
        console.log(data);
        setUser(data);
        setEmail(data.email);
        setFullname(data.fullName);
        setusername(data.userName);
        };
        temp();
    },[]);
    console.log(user);
  

  const passwordUpdate = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordUpdate = (event) => {
    setConfirmPassword(event.target.value);
  };
  const UsernameUpdate = (event) => {
    setusername(event.target.value);
  };

  const emailUpdate = (event) => {
    setEmail(event.target.value);
  };
  const fullnameUpdate = (event) => {
    setFullname(event.target.value);
  };
  const sendValueToDb = async () => {
    const postURL = "http://localhost:3000/profile/"+userId;
    fetch(postURL, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        fullName: fullName,
        email: email,
        password: password,
      }),
    }).then((response) => {
      if (response.status === 409) {
        alert("Already Exists.");
      } else {
        alert("Updated Successfully");
      }
    });
  };

  var logoutLocally = () => {
    window.sessionStorage.removeItem("authToken");
    window.location.replace("/");
  }

console.log(userName);
  return (
    <div className="parent-container">
      <div className="eventContainer">
        <div className="main-signin-header">
          <h1 className="user-title">Welcome User</h1>
          <div className="landing-image-container-signup">
            <img src="./images/login.png" alt="Sign Up"></img>
          </div>
        </div>
        <div className="eventOperationsContainer">
          <div>
            <form class="form-style-8">
              <ul>
                <li>
                  <label for="username">Username</label>
                  <input
                    id="new"
                    type="text"
                    name="username"
                    required
                    value={userName}
                    onChange={UsernameUpdate}
                    maxlength="100"
                  />
                  <span>Enter New Username Here</span>
                </li>
                <li>
                  <label for="Email">Email</label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={emailUpdate}
                    maxlength="100"
                  />
                  <span>Enter Email Here</span>
                </li>
                {/* <div className="verify-button">
                                            <button id="register-button" className="button1 button6" onClick={updateEmail} >
                                                Verify
                                            </button>
                                        </div> */}
                <li>
                  <label for="fullname">Fullname</label>
                  <input
                    id="new"
                    type="text"
                    name="fullname"
                    required
                    value={fullName}
                    onChange={fullnameUpdate}
                    maxlength="100"
                  />
                  <span>Enter New Fullname Here</span>
                </li>
                {/* <li>
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
                                        </li> */}
              </ul>
              <a>
                <button
                  type="reset"
                  className="button button5"
                  onClick={sendValueToDb}
                >
                  {" "}
                  update{" "}
                </button>
              </a>
              <a>
                <button
                  className="button button5"
                  onClick={logoutLocally}
                >
                  {" "}
                  Logout{" "}
                </button>
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

