/**
 * Layer: Model
 * Description : Here schema is defined that will be saved in the Database.
 * @author : Shruti Srivastava
 */
 import Mongoose from 'mongoose';

 const schemaHousing = new Mongoose.Schema({
  /*  userId: {
        type: String
    },*/
    housingId: {
        type: String
    },
    
     houseName: {
         type: String
     },
     houseAddress: {
         type: String
     },
     utilityIncluded: {
         type: String
     },
     availability: {
         type: String
     },
     liked: {
         type: Boolean,
         default: false
     }
     ,
     createdDate: {
         type: Date,
         default: Date.now
     },
 
     lastModifiedDate: {
         type: Date,
         default: Date.now
     },
     accomodationType: {
        type: String
        
    },
    price: {
        type: Number
    },
    room: {
        type: Number
    },
    bath: {
        type: Number
    }
    ,  member: {
        type: Number
    },  country: {
        type: String
        
    },
    State: {
        type: String
        
    },
    zip: {
        type: String
        
    },
    email:{
        type: String
    }
    


 }, {
     versionKey: false
 });
 
 schemaHousing.virtual('id').get(function () {
     //Convert id to HexaDecimal
     return this._id.toHexString();
 });
 // Set the the values to JSON
 schemaHousing.set('toJSON', { virtuals: true });
 
 const model = Mongoose.model('saveHousing', schemaHousing);
 
 export default model;