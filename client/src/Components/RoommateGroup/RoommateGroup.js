import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import { date } from "yup";
import "./RoommateGroup.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import RoommateNavPanel from "../Rommate/RoommateNavPanel/RommateNavPanel";
import { Button } from "antd";

export const RoommateGroup = (props) => {
  var [profile, setProfile] = useState(null);
  var [groupData, setGroupData] = useState(null);
  var [editName, setEditName] = useState(false);
  var [editedName, setEditedName] = useState("");
  var [groupMembers, setGroupMembers] = useState([]);

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
        } else {
          setProfile(null);
        }
      })
      .catch(error => {
        console.error(error);
        setProfile(null);
      });
  }

  var updateGroupData = (newGroupName) => {
    const body = {
      groupname: newGroupName
    };

    fetch('http://localhost:3000/roommateGroup/id/' + groupData.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (Object.keys(json).length !== 0) {
          setGroupData(json);
        }
      })
      .catch(error => console.error(error));
  }

  var getGroupData = (profileId) => {
    fetch('http://localhost:3000/roommateGroup/profile/' + profileId)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (Object.keys(json).length !== 0) {
          setGroupData(json);
        } else {
          setGroupData(null);
        }
      })
      .catch(error => console.error(error));
  }

  var getMemberProfile = (memberId) => {
    return fetch('http://localhost:3000/roommate/id/' + memberId).then(response => response.json());
  }

  useEffect(() => {
    getProfile(username);
  }, [username]);

  useEffect(() => {
    if (profile) getGroupData(profile.id);
  }, [profile])

  useEffect(() => {
    if (groupData?.members) {
      Promise.all(groupData.members.map(memberId => getMemberProfile(memberId))).then(memberProfiles => {
        setGroupMembers(memberProfiles);
      }).catch(error => console.error(error));
    }
  }, [groupData])

  var onNameButtonClick = (event) => {
    if (editName) {
      // Update db with new name
      if (editedName !== "") updateGroupData(editedName);
    }
    if (groupData.groupname) setEditedName(groupData.groupname);
    setEditName(!editName);
  }

  var onEditNameChange = (event) => {
    setEditedName(event.target.value);
  }

  var onLeaveGroupClick = () => {
    if (!profile) return;
    fetch('http://localhost:3000/roommate/leaveGroup/' + profile._id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        getGroupData(profile._id);
      })
      .catch(error => console.error(error));
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
        <div className="event-list-result">
          <div className="roommate-content-container">
            {groupData ? (
              <>
                <div className="group-container">
                  <h3>Flatmate Group </h3>
                  <div className="name-container">
                    {
                      editName ? (
                        <>
                          <input onChange={onEditNameChange} type="text" placeholder="Group Name" value={groupData?.groupname} />
                        </>
                      ) : (
                        <>
                          {groupData.groupname === "" ? "<No Group Name Set>" : groupData.groupname}
                        </>
                      )
                    }
                    <Button onClick={onNameButtonClick}>
                      {
                        editName ? (<>Save</>) : (<>Edit</>)
                      }
                    </Button>
                  </div>
                  <h4> Group Members </h4>
                  <ul>
                    {groupMembers.map(member => {
                      return (
                        <li key={member.id}>
                          <Link to={'/roommate/' + member.username}>{member.name}</Link>
                        </li>
                      );
                    })}
                  </ul>
                  <Button color="red" onClick={onLeaveGroupClick}> Leave Group</Button>
                </div>
              </>
            ) : (
              <>
                <span>You are not in a group yet!</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoommateGroup;