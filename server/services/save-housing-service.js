
import Housing from '../models/save-housing-model.js'


//Searching for the data
const search =  (param) => {
    const promise =Housing.find(param).exec();
    return promise;
};

// Get : Get ID from DB
export const get = (id) => {
    const getHousing = Housing.findById(id).exec();
    return getHousing;
}

// Create : Create Data in DB
export const create =  (housing) => {
    const newHousings = new Housing(housing);
    return newHousings.save();
}

// Update : Update existing Data in DB
const update =  (id, updatedHousing) => {
    const promise = Housing.findByIdAndUpdate({ _id: id },
        updatedHousing, { new: true }
    ).exec();
    return promise;
}

// Remove : Remove Data from DB
const remove =  (id) => {
    const housings = Housing.deleteOne({ _id: id }).exec();
    return housings;
}
// search on based on criteria
const getAll=(query)=> {
    //const {min,max}=query
    const min=query.min
    const max=query.max

   // const min= parseInt(query.min);
   console.log("min",min)
  
    let housings =  Housing.find({price:{$gt:min,$lt:max}})
    console.log("housing",housings)
    return housings;
}

//Export Default
export default {
    search: search,
    get: get,
    create: create,
    update: update,
    remove: remove,
    getAll:getAll
}