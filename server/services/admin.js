import { REPL_MODE_SLOPPY } from "repl";
import admin from './../models/admin.js';

//Searching for the data
const search =  (param) => {
    const promise = admin.find(param).exec();
    return promise;
};

// Get : Get ID from DB
export const get = (id) => {
    const getUser = admin.findById(id).exec();
    return getUser;
}

// Create : Create Data in DB
export const create =  (Users) => {
    const newUser = new admin(Users);
    return newUser.save();
}

// Update : Update existing Data in DB
const update =  (id, updatedUser) => {
    const promise = admin.findByIdAndUpdate({ _id: id },
        updatedUser, { new: true }
    ).exec();
    return promise;
}

// Remove : Remove Data from DB
const remove =  (id) => {
    const usr = admin.deleteOne({ _id: id }).exec();
    return usr;
}

export default {
    search: search,
    get: get,
    create: create,
    update: update,
    remove: remove
}