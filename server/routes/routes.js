import express from 'express';
 import Controller from '../controllers/controller.js';

 // Express Framework
const expressRouter = express.Router();


// Search & Create Operation
expressRouter.route('/eventList')
    .get(Controller.index)
    .post(Controller.create);

// Retrieve update & delete command
expressRouter.route('/eventList/:id')
    .get(Controller.get)
    .put(Controller.update)
    .delete(Controller.remove);

export default expressRouter;