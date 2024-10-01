import { response } from 'express';
import AuthToken from '../services/authToken.js';

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
  AuthToken.search(request.body)
  .then((results) => {
    response.status(200);
    response.json(results);
  })
  .catch(errorHandler(response));
}

// API Request : To get data from DB for scpecific ID
const get =  (request, response) => {
    const id = request.params.id;
    AuthToken.get(id)
        .then((event) => {
            response.status(200);
            response.json(event);
        })
        .catch(errorHandler(response));
};

const getToken = (request, response) => {
  const token = request.params.token;
  AuthToken.search({token: token}).then(results => {
    response.status(200);
    response.json(results[0]);
  }).catch(errorHandler(response));
}

// API Request : To Save data in DB
const create =  (request, response) => {
    const newAuthToken = Object.assign({}, request.body);
    AuthToken.create(newAuthToken)
        .then((authToken) => {
            response.status(200);
            response.json(authToken);
        })
        .catch(errorHandler(response));
};

// API Request : To Update an exisitng ID in DB
const update =  (request, response) => {
    const id = request.params.id;
    const updateAuthToken = Object.assign({}, request.body);
    AuthToken.update(id, updateAuthToken)
        .then((authToken) => {
            response.status(200);
            response.json(authToken);
        })
        .catch(errorHandler(response));
};

// API Request : To Remove an exisitng ID from DB
const remove =  (request, response) => {
    const id = request.params.id;
    AuthToken.remove(id)
        .then((result) => {
            response.status(200);
            response.json({
                message: `authToken ${id} deleted successfully!`
            });
        })
        .catch(errorHandler(response));
};

export default {
  search: search,
  create: create,
  get: get,
  getToken: getToken,
  update: update,
  remove: remove
}