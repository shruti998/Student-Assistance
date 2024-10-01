import { response } from 'express';
import RoommateGroup from './../services/roommateGroup.js'
import RoommateProfile from './../services/roommate.js'
import RoommateRequest from '../services/roommateRequest.js';
import { RoommateRequestTypes } from '../models/roommateRequest.js';

// Error Handling 
const errorHandler = (response) => {
    return (error) => {
        response.status(500);
        response.json({
            message: error.message
        })
    };
}

const search = (request, response) => {
  RoommateRequest.search(request.body)
  .then((results) => {
    response.status(200);
    response.json(results);
  })
  .catch(errorHandler(response));
}

// API Request : To get data from DB for scpecific ID
const get =  (request, response) => {
    const id = request.params.id;
    RoommateRequest.get(id)
        .then((event) => {
            response.status(200);
            response.json(event);
        })
        .catch(errorHandler(response));
};

const getActiveForProfile = (request, response) => {
  const id = request.params.id;
  RoommateRequest.getActiveForProfile(id).then(results => {
    response.status(200);
    response.json(results);
  }).catch(errorHandler(response));
}

// API Request : To Save data in DB
const create =  (request, response) => {
    var newRoommateRequests = [];
    var newRoommateRequestsPromises = [];
    Object.keys(request.body).forEach(key => {
      const newRoommateRequest = request.body[key];
      if(!newRoommateRequest.recipient || !newRoommateRequest.sender) return;

      var promises = [
        RoommateGroup.get(newRoommateRequest.sender),
        RoommateProfile.get(newRoommateRequest.sender),
        RoommateGroup.get(newRoommateRequest.recipient),
        RoommateProfile.get(newRoommateRequest.recipient)
      ];

      var returnPromise = Promise.all(promises).then(results => {
        var sender = results[0] && Object.keys(results[0]).length > 0 ? results[0] : results[1];
        var recipient = results[2] && Object.keys(results[2]).length > 0 ? results[2] : results[3];

        var senderType = sender.username ? 
          sender.group && sender.group !== "" ? "profileWithGroup" : "profile"
        : "group";

        var recipientType = recipient.username ? 
        recipient.group && recipient.group !== "" ? "profileWithGroup" : "profile"
        : "group";

        var returnRequest = Object.assign({}, newRoommateRequest);
        if(senderType === "group") return null;
        if(senderType === "profile") {
          if(recipientType === "profile") {
            // request to create new group
            returnRequest.type = RoommateRequestTypes.create_group;
          } else {
            returnRequest.type = RoommateRequestTypes.join_group;
          }
        } else {
          if(recipientType === "profile" || recipientType === "profileWithGroup") {
            returnRequest.type = RoommateRequestTypes.invite_group;
          } else {
            returnRequest.type = RoommateRequestTypes.join_group;
          }
        }
        returnRequest.status = "pending";
        return returnRequest;
      });
      newRoommateRequestsPromises.push(returnPromise);
    });

    Promise.all(newRoommateRequestsPromises).then(results => {
      RoommateRequest.create(results)
      .then((roommateRequests) => {
          response.status(200);
          response.json(roommateRequests);
      })
      .catch(errorHandler(response));
    })
    .catch(errorHandler(response));
};

// API Request : To Update an exisitng ID in DB
const update =  (request, response) => {
    const id = request.params.id;
    const updateRoommateRequest = Object.assign({}, request.body);
    RoommateRequest.update(id, updateRoommateRequest)
        .then((roommateRequest) => {
            response.status(200);
            response.json(roommateRequest);
        })
        .catch(errorHandler(response));
};

// API Request : To Remove an exisitng ID from DB
const remove =  (request, response) => {
    const id = request.params.id;
    RoommateRequest.remove(id)
        .then((removed) => {
            response.status(200);
            response.json({
                message: `RoommateRequest ${id} deleted successfully!`
            });
        })
        .catch(errorHandler(response));
};

const acceptRequest = (request, response) => {
  const id = request.params.id;
  RoommateRequest.acceptRequest(id).then(result => {
    response.status(200);
    response.json({
      message: "Successfully accepted roommate request!"
    })
  }).catch(errorHandler(response));
}

const denyRequest = (request, response) => {
  const id = request.params.id;
  RoommateRequest.denyRequest(id).then(result => {
    response.status(200);
    response.json({
      message: "Successfully denied roommate request!"
    })
  }).catch(errorHandler(response));
}

export default {
  search: search,
  create: create,
  get: get,
  update: update,
  remove: remove,
  acceptRequest: acceptRequest,
  denyRequest: denyRequest,
  getActiveForProfile: getActiveForProfile
}