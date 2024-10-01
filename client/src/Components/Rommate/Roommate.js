import React, { useState, useRef, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { date } from "yup";
import "./Rommate.scss";
import RoommateNavPanel from "./RoommateNavPanel/RommateNavPanel";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RoommateEdit } from "./RoommateEdit/RoommateEdit";
import { RoommateView } from "./RoommateView/RoommateView";
import { useIsFocused } from "@react-navigation/native";

export const Roommate = (props) => {
  var [profile, setProfile] = useState(null);
  var params = useParams();

  var username = useSelector((state) => state.Roommate.username);
  var currentUser = true;

  if (params.username) {
    username = params.username;
    currentUser = false;
  }
  console.log(username);

  var getProfile = (username) => {
    const body = {
      username: username
    };

    fetch('http://localhost:3000/roommate/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.length != 0) {
          setProfile(json[0]);
        } else {
          setProfile(null);
        }
      })
      .catch(error => {
        console.error(error)
        setProfile(null);
      });
  }

  // Define the effect that fetches data and updates the state
  useEffect(() => {
    getProfile(username);

    // Clean up the effect when the component is unmounted
    return () => {
      // Perform any cleanup operations here
    };
  }, [username]); // Only run the effect when the component is first rendered

  const inputFieldRef = useRef(null);

  var dispatch = useDispatch();

  return (

    <div className="parent-container">
      <div className="eventContainer">
        <div className="main-roommate-header">
          <h1 className="eventsTitle">Find Roomates</h1>
          <div className="landing-image-container-roomate">
            <img src="./images/roommate.png" alt="Upcoming Events">
            </img>
          </div>
          <div className="roommate-nav-main-container">
            <div className="roommate-nav-container">
              <RoommateNavPanel></RoommateNavPanel>
            </div>


          </div>
        </div>
        <div className="event-list-result">
          <div className="roommate-content-container">
            {profile ? (
              <>
                <RoommateView data={profile} username={username}></RoommateView>
              </>
            ) : (
              <>
                {currentUser ? (
                  <>
                    User profile not created, please create it below. <br />
                    <RoommateEdit ></RoommateEdit>
                  </>
                ) : (
                  <>User Not Found</>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roommate;