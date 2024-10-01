import { response } from 'express';
import Roommate from './../services/roommate.js'

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
  Roommate.search(request.body)
  .then((results) => {
    response.status(200);
    response.json(results);
  })
  .catch(errorHandler(response));
}

// API Request : To get data from DB for scpecific ID
const get =  (request, response) => {
    const id = request.params.id;
    Roommate.get(id)
        .then((event) => {
            response.status(200);
            response.json(event);
        })
        .catch(errorHandler(response));
};

// API Request : To Save data in DB
const create =  (request, response) => {
    const newRoommateProfiles = Object.assign({}, request.body);
    Roommate.create(newRoommateProfiles)
        .then((roommateProfiles) => {
            response.status(200);
            response.json(roommateProfiles);
        })
        .catch(errorHandler(response));
};

// API Request : To get all data from DB
const index =  (request, response) => {
    Roommate.search({})
        .then((roommateProfile) => {
            response.status(200);
            response.json(roommateProfile);
        })
        .catch(errorHandler(response));
};

// API Request : To Update an exisitng ID in DB
const update =  (request, response) => {
    const id = request.params.id;
    const updateRoommateProfile = Object.assign({}, request.body);
    Roommate.update(id, updateRoommateProfile)
        .then((roommateProfile) => {
            response.status(200);
            response.json(roommateProfile);
        })
        .catch(errorHandler(response));
};

// API Request : To Remove an exisitng ID from DB
const remove =  (request, response) => {
    const id = request.params.id;
    Roommate.remove(id)
        .then((roommateProfile) => {
            response.status(200);
            response.json({
                message: `RoommateProfile ${id} deleted successfully!`
            });
        })
        .catch(errorHandler(response));
};

const leaveGroup = (request, response) => {
    const id = request.params.id;
    Roommate.leaveGroup(id).then(result => {
        response.status(200);
        response.json({
            message: 'Left the group!'
        });
    }).catch(errorHandler(response));
}

export default {
  search: search,
  create: create,
  index: index,
  get: get,
  update: update,
  remove: remove,
  leaveGroup: leaveGroup
}