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
  var profileId = request.query.profileId;
  var groupId = request.query.groupId;

  var profileSearchParams = {}
  profileSearchParams._id = { $ne: profileId };
  if (groupId && groupId !== "")
    profileSearchParams.group = { $ne: groupId };

  var groupSearchParams = {}
  groupSearchParams._id = { $ne: groupId };

  var promises = [];

  promises.push(RoomateProfile.search(profileSearchParams));
  promises.push(RoommateGroup.search(groupSearchParams));

  Promise.all(promises).then(results => {
    response.status(200);
    results[0] = results[0].map(r => {
      return Object.assign({}, r._doc, { type: "profile" });
    })

    results[1] = results[1].map(r => {
      return Object.assign({}, r._doc, { type: "group" });
    })
    response.json([...results[0], ...results[1]]);
  }).catch(errorHandler(response));
}

export default {
  search: search
}