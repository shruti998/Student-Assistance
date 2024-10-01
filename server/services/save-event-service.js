import Model from './../models/save-event-model.js';

//Searching for the data
const search =  (param) => {
    const promise = Model.find(param).exec();
    return promise;
};

// Get : Get ID from DB
export const get = (id) => {
    const getTodo = Model.findById(id).exec();
    return getTodo;
}

// Create : Create Data in DB
export const create =  (event) => {
    const newEvent = new Model(event);
    return newEvent.save();
}

// Update : Update existing Data in DB
const update =  (id, updatedEvent) => {
    const promise = Model.findByIdAndUpdate({ _id: id },
        updatedEvent, { new: true }
    ).exec();
    return promise;
}

// Remove : Remove Data from DB
const remove =  (id) => {
    const todos = Model.deleteOne({ _id: id }).exec();
    return todos;
}

//Export Default
export default {
    search: search,
    get: get,
    create: create,
    update: update,
    remove: remove
}