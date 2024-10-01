import { Button } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../RoommateCard.scss";
import "./RoommateSearchGroupCard.scss"

export const RoommateSearchGroupCard = (props) => {
  var [data, setData] = useState(props.data);
  var [groupMembers, setGroupMembers] = useState([]);
  var [profile, setProfile] = useState(props.profile);
  var [requests, setRequests] = useState([]);
  var [requestSent, setRequestSent] = useState(true);

  var getRequests = () => {
    fetch("http://localhost:3000/roommateRequest/getActiveForProfile/" + profile._id)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setRequests(json);
      });
  }

  var getMemberProfile = (memberId) => {
    return fetch('http://localhost:3000/roommate/id/' + memberId).then(response => response.json());
  }

  var isRequestAlreadySent = (requests, target) => {
    for (var i = 0; i < Object.keys(requests).length; i++) {
      var request = requests[Object.keys(requests)[i]];
      if (request.sender === target._id || request.recipient === target._id) return true;
    }
    return false;
  }

  var onRequestSentClick = (event) => {
    const body = [{
      sender: profile._id,
      recipient: data._id
    }];

    fetch('http://localhost:3000/roommateRequest', {
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
          getRequests();
        }
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    if (data?.members) {
      Promise.all(data.members.map(memberId => getMemberProfile(memberId))).then(memberProfiles => {
        setGroupMembers(memberProfiles);
      }).catch(error => console.error(error));
    }
  }, [data])

  useEffect(() => {
    getRequests();
  }, [profile])

  useEffect(() => {
    setRequestSent(isRequestAlreadySent(requests, data));
  }, [requests])

  return (
    <>
      <div className="card2">
        <div className="profile-picture-container">
          <img src="images/house.jpeg" alt="Picture"></img>
        </div>
        <div className="card-content">
          <div className="card-item" style={{ gridColumn: "1/3" }}>
            Name : {data.groupname ? data.groupname : "Flatmate Group " + data._id}
          </div>
          <div className="card-item" style={{ gridColumn: "1/3" }}>
            Members
            <ul>
              {groupMembers.map(memberProfile => {
                return (
                  <>
                    <li> <Link to={"/roommate/" + memberProfile.username}>{memberProfile.name}</Link></li>
                  </>
                )
              })}
            </ul>
          </div>
          <div className="card-item">
            {
              requestSent ? (
                <>
                  <span> Request Already Sent/Recieved!</span>
                </>
              ) : (
                <>
                  <Button onClick={onRequestSentClick} disabled={requestSent}>Request to join</Button>
                </>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
};

export default RoommateSearchGroupCard;