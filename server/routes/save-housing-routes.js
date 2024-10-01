import express from 'express';

 import housingController from '../controllers/save-housing-controller.js';

 // Express Framework
const expressRouter = express.Router();


// Search & Create Operation
console.log("routes")
expressRouter.route('/saveHousing')
    .get(housingController.index)
    .post(housingController.create);
    
   

// Retrieve update & delete command
expressRouter.route('/saveHousing/:id')
    .get(housingController.get)
    .put(housingController.update)
    .delete(housingController.remove);

//expressRouter.route('/housings/search')
  //  .get(housingController.search);
  expressRouter.get('/saveHousing', housingController.search)

export default expressRouter;