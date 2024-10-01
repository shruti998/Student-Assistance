

 import { response } from 'express';

 import housingService from '../services/housing-services.js';
 
 // Error Handling 
 const errorHandler = (response) => {
     return (error) => {
         response.status(500);
         response.json({
             message: error.message
         })
     };
 }
 
 // API Request : To get data from DB for scpecific ID
 const get =  (request, response) => {
     const id = request.params.id;
     housingService.get(id)
         .then((todo) => {
             response.status(200);
             response.json(todo);
         })
         .catch(errorHandler(response));
 };
 
 // API Request : To Save data in DB
 const create =  (request, response) => {
     const newHousing = Object.assign({}, request.body);
     housingService.create(newHousing)
         .then((housing) => {
             response.status(200);
             response.json(housing);
         })
         .catch(errorHandler(response));
 };
 
 // API Request : To get all data from DB
 const index =  (request, response) => {
    housingService.search({})
         .then((housing) => {
             response.status(200);
             response.json(housing);
         })
         .catch(errorHandler(response));
 };
 
 
 // API Request : To Update an exisitng ID in DB
 const update =  (request, response) => {
     const id = request.params.id;
     const updateHousing = Object.assign({}, request.body);
     housingService.update(id, updateHousing)
         .then((housing) => {
             response.status(200);
             response.json(housing);
         })
         .catch(errorHandler(response));
 };
 
 
 
 // API Request : To Remove an exisitng ID from DB
 const remove =  (request, response) => {
     const id = request.params.id;
     housingService.remove(id)
         .then((housing) => {
             response.status(200);
             response.json({
                 message: `Housing ${id} deleted successfully!`
             });
         })
         .catch(errorHandler(response));
 };
  //get all housings based on search criteria
  const search= (request, response)=>{
    console.log("console1",request.query)
    housingService.getAll(request.query).then((housing) => {
        console.log("console",request.query)
        response.status(200);
        response.json({
            message: `Search is not there!`
        });
    })
    .catch(errorHandler(response));
 }
 
 export default {
     create: create,
     index: index,
     get: get,
     update: update,
     remove: remove,
     search: search
 }