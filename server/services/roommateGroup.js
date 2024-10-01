import RoommateGroupModel from "../models/roommateGroup.js";
import Roommate from './../services/roommate.js';

//Searching for the data
const search =  (param) => {
    const promise = RoommateGroupModel.find(param).exec();
    return promise;
};

// Get : Get ID from DB
export const get = (id) => {
    const getRoommateGroup = RoommateGroupModel.findById(id).exec();
    return getRoommateGroup;
}

// Create : Create Data in DB
export const create =  (RoommateGroups) => {
  var promises = [];
  Object.keys(RoommateGroups).forEach(key => {
    const RoommateGroup = RoommateGroups[key];
    const newRoommateGroup = new RoommateGroupModel(RoommateGroup);
    promises.push(newRoommateGroup.save());
  });
  return Promise.all(promises);
}

// Update : Update existing Data in DB
const update =  (id, updatedRoommateGroup) => {
    const promise = RoommateGroupModel.findByIdAndUpdate({ _id: id },
      updatedRoommateGroup, { new: true }
    ).exec();
    return promise;
}

// Remove : Remove Data from DB
const remove =  (id) => {
    const roomateGroup = RoommateGroupModel.deleteOne({ _id: id }).exec();
    return roomateGroup;
}

const removeMember = (id, memberId) => {
  return get(id).then(group => {
    var members = []
    Object.keys(group?.members).forEach(key => {
      const member = group?.members[key];
      if(member != memberId) members.push(member);
    })
    return update(id, {members: members});
  })
}

const addMember = async (id, memberId) => {
  var roommateGroup = await get(id);
  var members = roommateGroup.members;
  return update(id, {members: [...members, memberId]});
}

//Export Default
export default {
    search: search,
    get: get,
    create: create,
    update: update,
    remove: remove,
    removeMember: removeMember,
    addMember: addMember
}