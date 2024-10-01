import AuthTokenModel from "../models/authToken.js";

//Searching for the data
const search =  (param) => {
    const promise = AuthTokenModel.find(param).exec();
    return promise;
};

// Get : Get ID from DB
export const get = (id) => {
    const getAuthToken = AuthTokenModel.findById(id).exec();
    return getAuthToken;
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Create : Create Data in DB
export const create = (authToken) => {
  authToken.token = makeid(16);
  const newAuthToken = new AuthTokenModel(authToken);
  return newAuthToken.save();
}

// Update : Update existing Data in DB
const update = (id, updateAuthToken) => {
    const promise = AuthTokenModel.findByIdAndUpdate({ _id: id },
      updateAuthToken, { new: true }
    ).exec();
    return promise;
}

// Remove : Remove Data from DB
const remove =  (id) => {
    const authToken = AuthTokenModel.deleteOne({ _id: id }).exec();
    return authToken;
}

//Export Default
export default {
    search: search,
    get: get,
    create: create,
    update: update,
    remove: remove,
}