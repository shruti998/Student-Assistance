import { response } from 'express';
import User from './../services/user.js';
import UserModel from './../models/user.js';
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

// API Request : To get data from DB for scpecific ID
const get = (request, response) => {
    const id = request.params.id;
    User.get(id)
        .then((event) => {
            response.status(200);
            response.json(event);
        })
        .catch(errorHandler(response));
};

// API Request : To Save data in DB
const create = (request, response) => {
    const newUser = Object.assign({}, request.body);
    User.create(newUser)
        .then((user) => {
            response.status(200);
            response.json(user);
        })
        .catch(errorHandler(response));
};

// API Request : To get all data from DB
const index = (request, response) => {
    User.search({})
        .then((user) => {
            response.status(200);
            response.json(user);
        })
        .catch(errorHandler(response));
};


// API Request : To Update an exisitng ID in DB
const update = (request, response) => {
    const id = request.params.id;
    const updateUser = Object.assign({}, request.body);
    User.update(id, updateUser)
        .then((user) => {
            response.status(200);
            response.json(user);
        })
        .catch(errorHandler(response));
};



// API Request : To Remove an exisitng ID from DB
const remove = (request, response) => {
    const id = request.params.id;
    User.remove(id)
        .then((user) => {
            response.status(200);
            response.json({
                message: `User ${id} deleted successfully!`
            });
        })
        .catch(errorHandler(response));
};

//register with email verification
const register = async (request, response) => {
    const { userName, fullName, email, password } = request.body;
    const newUser = { userName, fullName, email, password }

    const oldUser = await UserModel.findOne({ email: request.body.email });
    if (oldUser) {
        response.status(409)
        response.json(oldUser)
    }
    else {
        User.create(newUser)
            .then((user) => {
                response.status(200);
                response.json(user);
            })
            .catch(errorHandler(response));
    }
}

// Check Login Functionality 
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }
    try {
        const userValid = await UserModel.findOne({ email: email });
        if (userValid) {
            if (password != userValid.password) {
                res.status(401).json({ error: "invalid details" })
            } else {
                // create an AuthToken
                var authToken = await AuthToken.create({username: userValid.userName, type: "user"});
                res.status(201).json({ status: 201 , authToken: authToken});
            }
        } else {
            res.status(401).json({ status: 401, message: "invalid details" });
        }
    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
}

export default {
    create: create,
    index: index,
    get: get,
    update: update,
    remove: remove,
    register: register,
    login: login
}