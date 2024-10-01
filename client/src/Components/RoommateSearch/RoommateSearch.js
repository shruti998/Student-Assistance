import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import "./RoommateSearch.scss";
import "../Rommate/Rommate.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import RoommateNavPanel from "../Rommate/RoommateNavPanel/RommateNavPanel";
import { Button } from "antd";
import RoommateSearchProfileCard from "./RoommateSearchProfileCard/RoommateSearchProfileCard";
import RoommateSearchGroupCard from "./RoommateSearchGroupCard/RoommateSearchGroupCard";

export const RoommateSearch = (props) => {
  var [profile, setProfile] = useState(null);
  var [searchResults, setSearchResults] = useState([]);
  var [searchParams, setSearchParams] = useState({});

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
        console.log(json);
        if (json != []) {
          setProfile(json[0]);
          const newParams = { profileId: json[0]._id };
          if (json[0].group) newParams.groupId = json[0].group;
          setSearchParams(Object.assign({}, searchParams, newParams));
        } else {
          setProfile(null);
        }
      })
      .catch(error => {
        console.error(error);
        setProfile(null);
      });
  }

  var getSearchResults = (searchParams) => {
    if (!searchParams.profileId || searchParams.profileId === "") return;
    var endpoint = "http://localhost:3000/roommateSearch";
    var options = Object.keys(searchParams).map(key => key + "=" + searchParams[key]).join("&");
    fetch(endpoint + "?" + options).then(response => response.json())
      .then(json => {
        console.log(json);
        setSearchResults(json);
      }).catch(error => console.error(error));
  }

  useEffect(() => {
    getProfile(username);
  }, [username]);

  useEffect(() => {
    getSearchResults(searchParams);
  }, [searchParams]);

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
            <div className="search-container">
              <span className="title"> <h3> Look For A Roommate </h3></span>
            </div>
            <div className="card-container">
              {searchResults.map(result => (
                <>
                  {result.type == "profile" ? (
                    <RoommateSearchProfileCard data={result} profile={profile}></RoommateSearchProfileCard>
                  ) : (
                    <RoommateSearchGroupCard data={result} profile={profile}></RoommateSearchGroupCard>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoommateSearch;