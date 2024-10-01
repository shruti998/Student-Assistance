import express from "express";
import admin from "../controllers/admin.js";


// Express Framework
const expressRouter = express.Router();

// Search & Create Operation
expressRouter.route("/admin")
.post(admin.create);
expressRouter.route("/admin/login")
.get(admin.index)
.post(admin.login);

// Retrieve update & delete command
expressRouter
  .route("/admin/login/:id")
  .get(admin.get)
  .put(admin.update)
  .delete(admin.remove);

export default expressRouter;
