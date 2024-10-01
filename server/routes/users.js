import express from "express";
import users from "../controllers/user.js";

// Express Framework
const expressRouter = express.Router();

// Search & Create Operation
expressRouter.route("/users")
.get(users.index)
.post(users.create);

// Retrieve update & delete command
expressRouter
  .route("/users/:id")
  .get(users.get)
  .put(users.update)
  .delete(users.remove);

expressRouter.route("/register")
.post(users.register);


expressRouter
  .route("/register/:id")
  .get(users.get)
  .put(users.update)
  .delete(users.remove);

  expressRouter.route("/profile")
 

expressRouter
  .route("/profile/:id")
  .get(users.get)
  .put(users.update)
  .delete(users.remove);
  // expressRouter
  // .route("/forgotPassword/:id")
  // .put(users.updatePassword)
  expressRouter
  .route("/login")
.post(users.login)
.get(users.get)

export default expressRouter;
