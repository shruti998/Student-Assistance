import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import "./RoommateRequests.scss";
import "../Rommate/Rommate.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import RoommateNavPanel from "../Rommate/RoommateNavPanel/RommateNavPanel";
import { Button } from "antd";
import RoommateRequestItem from "./RoommateRequestItem/RoommateRequestItem";

export const RoommateRequests = (props) => {
  var [profile, setProfile] = useState(null);
  var [requests, setRequests] = useState([]);
  var [requestProfiles, setRequestProfiles] = useState(null);

  var getRequests = () => {
    if (!profile) return;
    fetch("http://localhost:3000/roommateRequest/getActiveForProfile/" + profile._id)
      .then(response => response.json())
      .then(json => {
        setRequests(json);
      });
  }

  var getRequestProfiles = async (requests) => {
    var result = [];
    for (var i = 0; i < Object.keys(requests).length; i++) {
      var request = requests[Object.keys(requests)[i]];
      var senderProfile = await (await fetch("http://localhost:3000/roommate/id/" + request.sender)).json();
      var recipientProfile = await (await fetch("http://localhost:3000/roommate/id/" + request.recipient)).json();
      result.push(Object.assign({}, request, { senderProfile: senderProfile, recipientProfile: recipientProfile }));
    }
    return result;
  }

  var username = useSelector((state) => state.Roommate.username);

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
        if (json != []) {
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

  useEffect(() => {
    getProfile(username);
  }, [username]);

  useEffect(() => {
    getRequests();
  }, [profile]);

  useEffect(() => {
    if (!requests) return;
    getRequestProfiles(requests).then(results => {
      setRequestProfiles(results);
    });
  }, [requests])

  var onAcceptClick = (requestId) => {
    console.log(requestId);
  }

  var onDenyClick = (requestId) => {
    console.log(requestId);
  }

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
        <div className="roommate-content-container">
          <div className="request-container">
            <h3>Incoming Requests</h3>
            <div>
              {
                requestProfiles ?
                  requestProfiles.map(request => {
                    if (request.recipient === profile._id || request.recipient === profile.group) {
                      return (<RoommateRequestItem request={request} outgoing={false} />);
                    } else {
                      return;
                    }
                  }) : <></>
              }
            </div>
          </div>
          <div className="event-both-result">
            <div className="request-container">
              <h3>Outgoing Requests</h3>
              <div>
                {
                  requestProfiles ?
                    requestProfiles.map(request => {
                      if (request.sender === profile._id) {
                        return (<RoommateRequestItem request={request} outgoing={true} />);
                      } else {
                        return;
                      }
                    }) : <></>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoommateRequests;