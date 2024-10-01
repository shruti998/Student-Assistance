import { Button } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

export const RoommateRequestTypes = {
  create_group: "create_group", // both are individuals, create a new group
  join_group: "join_group", // recipient is in a group, requesting to join the recipients group
  invite_group: "invite_group", // recipient is being invited to join sender's group
}

export const RoommateRequestItem = (props) => {
  var [request, setRequest] = useState(props.request);
  var outgoing = props.outgoing;

  var onAcceptClick = () => {
    fetch('http://localhost:3000/roommateRequest/accept/' + request._id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        window.location.reload(false);
      })
      .catch(error => console.error(error));
  }

  var onDenyClick = () => {
    fetch('http://localhost:3000/roommateRequest/deny/' + request._id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        window.location.reload(false);
      })
      .catch(error => console.error(error));
  }

  var render = () => {
    if (!outgoing) {
      if (request.type == RoommateRequestTypes.create_group) {
        return (
          <>
            <Link to={"/roommate/" + request?.senderProfile?.username}> {request?.senderProfile?.name} </Link> wants to create a group with you!
            <Button onClick={onAcceptClick}>Accept</Button> <Button onClick={onDenyClick}>Deny</Button>
          </>
        );
      } else if (request.type == RoommateRequestTypes.invite_group) {
        return (<>
          <Link to={"/roommate/" + request?.senderProfile?.username}> {request?.senderProfile?.name} </Link> wants you to join their group!
          <Button onClick={onAcceptClick}>Accept</Button> <Button onClick={onDenyClick}>Deny</Button>
        </>
        );
      } else {
        return (<>
          <Link to={"/roommate/" + request?.senderProfile?.username}> {request?.senderProfile?.name} </Link> wants to join your group!
          <Button onClick={onAcceptClick}>Accept</Button> <Button onClick={onDenyClick}>Deny</Button>
        </>
        );
      }
    } else {
      if (request.type == RoommateRequestTypes.create_group) {
        return (<>
          You have invited <Link to={"/roommate/" + request?.recipientProfile?.username}> {request?.recipientProfile?.name} </Link> to create a group with you!
          <Button onClick={onDenyClick}>Cancel Request</Button>
        </>
        );
      } else if (request.type == RoommateRequestTypes.invite_group) {
        return (<>You have asked <Link to={"/roommate/" + request?.recipientProfile?.username}> {request?.recipientProfile?.name} </Link> to join your group! <Button onClick={onDenyClick}>Cancel Request</Button></>);
      } else {
        return (<>You have requested <Link to={"/roommate/" + request?.recipientProfile?.username}> {request?.recipientProfile?.name} </Link> to join their group! <Button onClick={onDenyClick}>Deny</Button></>);
      }
    }
  };
  return (
    <div className="request-item">
      {
        render()
      }
    </div>
  )
}

export default RoommateRequestItem;