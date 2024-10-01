

/**
 * Layer : Routes
 * File : Index.js
 * Description : Index file for Route Layer.
 * @author : Romil Tiwari
 */

 import Router from './routes.js';
 import userRouter from './users.js';
 import roommateRouter from './rommate.js';
 import HousingRoutes from '../routes/housing-routes.js';
 import SaveEventRouter from './save-event-routes.js';
 import SaveHousingRouter from './save-housing-routes.js';
 import AuthTokenRouter from './authToken.js';
 
 import admin from '../routes/admin.js'

 /* Todo routes  */
 export default (app) => {
     app.use('/', Router);
     app.use('/', userRouter);
     app.use('/', roommateRouter);
     app.use('/', HousingRoutes);
     app.use('/', SaveEventRouter);
     app.use('/', SaveHousingRouter);
     app.use('/', AuthTokenRouter);
    
     app.use('/',admin);
    
 }


