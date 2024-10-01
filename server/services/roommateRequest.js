import RoommateRequestModel, { RoommateRequestTypes } from "../models/roommateRequest.js";
import RoommateGroup from './../services/roommateGroup.js';
import Roommate from './../services/roommate.js';

//Searching for the data
const search =  (param) => {
  const promise = RoommateRequestModel.find(param).exec();
  return promise;
};

// Get : Get ID from DB
export const get = (id) => {
  const getRoommateRequest = RoommateRequestModel.findById(id).exec();
  return getRoommateRequest;
}

export const getActiveForProfile = async (id) => {
  const profile = await Roommate.get(id);
  const searchResult = [
    ... await search({recipient: id, status: "pending"}),
    ... await search({sender: id, status: "pending"}),
    ... await search({recipient: profile.group, status: "pending"})
  ]
  return searchResult;
}

// Create : Create Data in DB
export const create =  (RoommateRequests) => {
  var promises = [];
  Object.keys(RoommateRequests).forEach(key => {
    const RoommateRequest = RoommateRequests[key];
    const newRoommateRequest = new RoommateRequestModel(RoommateRequest);
    promises.push(newRoommateRequest.save());
  });
  return Promise.all(promises);
}

// Update : Update existing Data in DB
const update =  (id, updatedRoommateRequest) => {
    const promise = RoommateRequestModel.findByIdAndUpdate({ _id: id },
      updatedRoommateRequest, { new: true }
    ).exec();
    return promise;
}

// Remove : Remove Data from DB
const remove =  (id) => {
    const roommateRequest = RoommateRequestModel.deleteOne({ _id: id }).exec();
    return roommateRequest;
}

const clearRequests = (id) => {
  var promises = [search({recipient: id}), search({sender: id})];
  return Promise.all(promises).then(searchResults => {
    var searchResult = [...searchResults[0], ...searchResults[1]];
    var returnPromises = [];
    Object.keys(searchResult).forEach(key => {
      const result = searchResult[key];
      returnPromises.push(update(result._id, {status: "closed"}));
    })
    return Promise.all(returnPromises);
  })
}

const denyRequest = async (id) => {
  var roommateRequest = await get(id);
  if(roommateRequest.status != "pending") return {};
  return update(id, {status: "closed"});
}

const acceptRequest = async (id) => {
  var roommateRequest = await get(id);
  if(roommateRequest.type == RoommateRequestTypes.create_group) {
    await Roommate.leaveGroup(roommateRequest.sender);
    await Roommate.leaveGroup(roommateRequest.recipient);
    var newGroup = await RoommateGroup.create([{members: []}]);
    await Roommate.joinGroup(roommateRequest.recipient, newGroup[0]._id);
    await Roommate.joinGroup(roommateRequest.sender, newGroup[0]._id);
    return Promise.all([clearRequests(roommateRequest.recipient), clearRequests(roommateRequest.sender)]);
  } else if(roommateRequest.type == RoommateRequestTypes.invite_group) {
    await Roommate.leaveGroup(roommateRequest.recipient);
    await Roommate.joinGroup(roommateRequest.recipient, (await Roommate.get(roommateRequest.sender)).group);
    return clearRequests(roommateRequest.recipient);
  } else {
    await Roommate.leaveGroup(roommateRequest.sender);
    const recipient = (await Roommate.get(roommateRequest.recipient));
    const group = recipient ? recipient.group : roommateRequest.recipient;
    await Roommate.joinGroup(roommateRequest.sender, group);
    return clearRequests(roommateRequest.sender);
  }
}

//Export Default
export default {
  search: search,
  get: get,
  create: create,
  update: update,
  remove: remove,
  clearRequests: clearRequests,
  denyRequest: denyRequest,
  acceptRequest: acceptRequest,
  getActiveForProfile: getActiveForProfile
}