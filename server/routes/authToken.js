import express from "express";
import authToken from "../controllers/authToken.js";

// Express Framework
const expressRouter = express.Router();

// Roommate
// Search & Create Operation
expressRouter.route("/authToken")
  .post(authToken.create);

// Retrieve update & delete command
expressRouter
  .route("/authToken/id/:id")
  .get(authToken.get)
  .put(authToken.update)
  .delete(authToken.remove);

expressRouter
  .route("/authToken/token/:token")
  .get(authToken.getToken);

expressRouter
  .route("/authToken/search/")
  .post(authToken.search);

export default expressRouter;
