import "./RoommateSearchProfileCard.scss";
import "../RoommateCard.scss";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "antd";

export const RoommateSearchProfileCard = (props) => {
  var [data, setData] = useState(props.data);
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

  useEffect(() => {
    getRequests();
  }, [profile])

  useEffect(() => {
    setRequestSent(isRequestAlreadySent(requests, data));
  }, [requests])

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

  return (
    <>
      <div className="card2">
        <div className="profile-picture-container">
          <img src={data.picture} alt="Picture"></img>
        </div>
        <div className="card-content">
          <div className="card-item">
            Name : {data.name}
          </div>
          <div className="card-item">
            Age : {data.age}
          </div>
          <div className="card-item">
            Likes
            <ul>
              {
                Object.keys(data.likes).map(like => {
                  return (
                    <li>
                      {data.likes[like]}
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="card-item">
            Dislikes
            <ul>
              {
                Object.keys(data.dislikes).map(dislike => {
                  return (
                    <li>
                      {data.dislikes[dislike]}
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="card-item">
            Living Preferences
          </div>
          <div></div>
          <div className="card-item">
            Number of People : {data.livingPreferences.numberOfPeople}
          </div>
          <div className="card-item">
            Eating Preferences : {data.livingPreferences.eatingPreferences}
          </div>
          <div className="card-item">
            Smoking : {data.livingPreferences.smoking ? "Yes" : "No"}
          </div>
          <div className="card-item">
            Drinking : {data.livingPreferences.drinking ? "Yes" : "No"}
          </div>
          <div className="card-item">
            {
              requestSent ? (
                <>
                  <span> Request Already Sent/Recieved!</span>
                </>
              ) : (
                <>
                  <Button disabled={requestSent} onClick={onRequestSentClick}>{profile.group ? "Invite to group" : "Request to join"}</Button>
                </>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
};

export default RoommateSearchProfileCard;