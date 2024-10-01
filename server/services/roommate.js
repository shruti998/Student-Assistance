import RoommateProfileModel from "../models/roommateProfile.js";
import RoommateGroup from './../services/roommateGroup.js';
import RoommateRequest from './../services/roommateRequest.js';

//Searching for the data
const search =  (param) => {
    const promise = RoommateProfileModel.find(param).exec();
    return promise;
};

// Get : Get ID from DB
export const get = (id) => {
    const getRoommateProfile = RoommateProfileModel.findById(id).exec();
    return getRoommateProfile;
}

// Create : Create Data in DB
export const create =  (RoommateProfiles) => {
  var promises = [];
  Object.keys(RoommateProfiles).forEach(key => {
    const RoommateProfile = RoommateProfiles[key];
    const newRoommateProfile = new RoommateProfileModel(RoommateProfile);
    promises.push(newRoommateProfile.save());
  });
  return Promise.all(promises);
}

// Update : Update existing Data in DB
const update =  (id, updatedRoommateProfile) => {
    const promise = RoommateProfileModel.findByIdAndUpdate({ _id: id },
      updatedRoommateProfile, { new: true }
    ).exec();
    return promise;
}

// Remove : Remove Data from DB
const remove =  (id) => {
    const roommateProfile = RoommateProfileModel.deleteOne({ _id: id }).exec();
    return roommateProfile;
}

const leaveGroup = (id) => {
  return get(id).then(profile => {
    const group = profile.group;
    if(group && group !== "") {
      var promises  = [];
      promises.push(update(id, { $unset: {group : ""}}))
      promises.push(RoommateGroup.removeMember(group, id));
      return Promise.all(promises).then(res => RoommateRequest.clearRequests(id));
    }
    return {};
  });
}

const joinGroup = async (id, groupId) => {
  // leave existing group
  await leaveGroup(id);
  console.log("left group");
  await update(id, {group: groupId});
  return RoommateGroup.addMember(groupId, id);
}

//Export Default
export default {
    search: search,
    get: get,
    create: create,
    update: update,
    remove: remove,
    leaveGroup: leaveGroup,
    joinGroup: joinGroup
}