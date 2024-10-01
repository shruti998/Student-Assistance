import { response } from 'express';
import RoommateGroup from './../services/roommateGroup.js'
import RoomateProfile from './../services/roommate.js'

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
  RoommateGroup.search(request.body)
  .then((results) => {
    response.status(200);
    response.json(results);
  })
  .catch(errorHandler(response));
}

// API Request : To get data from DB for scpecific ID
const get =  (request, response) => {
    const id = request.params.id;
    RoommateGroup.get(id)
        .then((event) => {
            response.status(200);
            response.json(event);
        })
        .catch(errorHandler(response));
};

const getForRoomate = (request, response) => {
    const roommate_id = request.params.id;
    RoomateProfile.get(roommate_id).then(roommateProfile => {
        if(roommateProfile?.group && roommateProfile?.group != "") {
            RoommateGroup.get(roommateProfile.group)
            .then((event) => {
                response.status(200);
                response.json(event);
            }).catch(errorHandler(response));
        } else {
            response.status(200);
            response.json({});
        }
    }).catch(errorHandler(response));
}

// API Request : To Save data in DB
const create =  (request, response) => {
    const newRoomateGroups = Object.assign({}, request.body);
    RoommateGroup.create(newRoomateGroups)
        .then((roommateGroups) => {
            response.status(200);
            response.json(roommateGroups);
        })
        .catch(errorHandler(response));
};

// API Request : To get all data from DB
const index =  (request, response) => {
    RoommateGroup.search({})
        .then((rommateGroups) => {
            response.status(200);
            response.json(rommateGroups);
        })
        .catch(errorHandler(response));
};

// API Request : To Update an exisitng ID in DB
const update =  (request, response) => {
    const id = request.params.id;
    const updateRoommateGroup = Object.assign({}, request.body);
    RoommateGroup.update(id, updateRoommateGroup)
        .then((roommateGroup) => {
            response.status(200);
            response.json(roommateGroup);
        })
        .catch(errorHandler(response));
};

// API Request : To Remove an exisitng ID from DB
const remove =  (request, response) => {
    const id = request.params.id;
    RoommateGroup.remove(id)
        .then((roommateGroup) => {
            response.status(200);
            response.json({
                message: `RoommateGroup ${id} deleted successfully!`
            });
        })
        .catch(errorHandler(response));
};

export default {
  search: search,
  create: create,
  index: index,
  get: get,
  getForRoomate: getForRoomate,
  update: update,
  remove: remove
}