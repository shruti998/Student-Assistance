/**
 * Layer: Model
 * File: Todo.js 
 * Description : Here schema is defined that will be saved in the Database.
 * @author : Romil Tiwari
 */

 import Mongoose from 'mongoose';


 const schema = new Mongoose.Schema({
     eventName: {
         type: String
     },
     description: {
         type: String
     },
     eventDate: {
         type: Date
     },
     time: {
         type: String
     },

     eventLocation: {
        type: String
    }
 }, {
     versionKey: false
 });
 
 schema.virtual('id').get(function () {
     //Convert id to HexaDecimal
     return this._id.toHexString();
 });

 // Set the the values to JSON
 schema.set('toJSON', { virtuals: true });
 
 const model = Mongoose.model('event', schema);
 
 export default model;