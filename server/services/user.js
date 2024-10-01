import { REPL_MODE_SLOPPY } from "repl";
import UserModel from './../models/user.js';

//Searching for the data
const search =  (param) => {
    const promise = UserModel.find(param).exec();
    return promise;
};

// Get : Get ID from DB
export const get = (id) => {
    const getUser = UserModel.findById(id).exec();
    return getUser;
}

// Create : Create Data in DB
export const create =  (Users) => {
    const newUser = new UserModel(Users);
    return newUser.save();
}

// Update : Update existing Data in DB
const update =  (id, updatedUser) => {
    const promise = UserModel.findByIdAndUpdate({ _id: id },
        updatedUser, { new: true }
    ).exec();
    return promise;
}

// Remove : Remove Data from DB
const remove =  (id) => {
    const usr = UserModel.deleteOne({ _id: id }).exec();
    return usr;
}
// const updatePassword=(data,updatedUser)=>
// {
//     const promise = UserModel.findByIdAndUpdate({ _id: id },
//         updatedUser, { new: true }
//     ).exec();
//     return promise;
//}

//Export Default
export default {
    search: search,
    get: get,
    create: create,
    update: update,
    remove: remove
}