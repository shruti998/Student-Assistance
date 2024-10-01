import Services from './../services/save-event-service.js';

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
    Services.get(id)
        .then((event) => {
            response.status(200);
            response.json(event);
        })
        .catch(errorHandler(response));
};

// API Request : To Save data in DB
const create =  (request, response) => {
    const newEvent = Object.assign({}, request.body);
    Services.create(newEvent)
        .then((event) => {
            response.status(200);
            response.json(event);
        })
        .catch(errorHandler(response));
};

// API Request : To get all data from DB
const index =  (request, response) => {
    Services.search({})
        .then((event) => {
            response.status(200);
            response.json(event);
        })
        .catch(errorHandler(response));
};


// API Request : To Update an exisitng ID in DB
const update =  (request, response) => {
    const id = request.params.id;
    const updateEvent = Object.assign({}, request.body);
    Services.update(id, updateEvent)
        .then((event) => {
            response.status(200);
            response.json(event);
        })
        .catch(errorHandler(response));
};



// API Request : To Remove an exisitng ID from DB
const remove =  (request, response) => {
    const id = request.params.id;
    Services.remove(id)
        .then((event) => {
            response.status(200);
            response.json({
                message: `Event ${id} deleted successfully!`
            });
        })
        .catch(errorHandler(response));
};


export default {
    create: create,
    index: index,
    get: get,
    update: update,
    remove: remove
}