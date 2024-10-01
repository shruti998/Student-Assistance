import express from "express";
import roommate from "../controllers/roommate.js";
import roommateGroup from "../controllers/roommateGroup.js";
import roommateSearch from "../controllers/roommateSearch.js";
import roommateRequest from "../controllers/roommateRequest.js";

// Express Framework
const expressRouter = express.Router();

// Roommate
// Search & Create Operation
expressRouter.route("/roommate")
  .get(roommate.index)
  .post(roommate.create);

// Retrieve update & delete command
expressRouter
  .route("/roommate/id/:id")
  .get(roommate.get)
  .put(roommate.update)
  .delete(roommate.remove);

expressRouter
  .route("/roommate/search/")
  .post(roommate.search);

expressRouter.route("/roommate/leaveGroup/:id")
  .post(roommate.leaveGroup);

// RoommateGroup
// Search & Create Operation
expressRouter.route("/roommateGroup")
  .get(roommateGroup.index)
  .post(roommateGroup.create);

// Retrieve update & delete command
expressRouter
  .route("/roommateGroup/id/:id")
  .get(roommateGroup.get)
  .put(roommateGroup.update)
  .delete(roommateGroup.remove);

expressRouter
  .route("/roommateGroup/search/")
  .post(roommateGroup.search);

expressRouter
  .route("/roommateGroup/profile/:id")
  .get(roommateGroup.getForRoomate);

expressRouter.route("/roommateSearch")
  .get(roommateSearch.search);

// RoommateRequest
// Search & Create Operation
expressRouter.route("/roommateRequest")
  .post(roommateRequest.create);

// Retrieve update & delete command
expressRouter
  .route("/roommateRequest/id/:id")
  .get(roommateRequest.get)
  .put(roommateRequest.update)
  .delete(roommateRequest.remove);

expressRouter
  .route("/roommateRequest/search/")
  .post(roommateRequest.search);

expressRouter
  .route("/roommateRequest/accept/:id")
  .post(roommateRequest.acceptRequest);

expressRouter
  .route("/roommateRequest/deny/:id")
  .post(roommateRequest.denyRequest);

  expressRouter
  .route("/roommateRequest/getActiveForProfile/:id")
  .get(roommateRequest.getActiveForProfile);

export default expressRouter;
