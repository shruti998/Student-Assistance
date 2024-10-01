import express from 'express';
 import Controller from '../controllers/save-event-controller.js';

 // Express Framework
const expressRouter = express.Router();

expressRouter.route('/savedEventList')
.get(Controller.index)
.post(Controller.create);

// Retrieve update & delete command
expressRouter.route('/savedEventList/:id')
    .get(Controller.get)
    .put(Controller.update)
    .delete(Controller.remove);

export default expressRouter;