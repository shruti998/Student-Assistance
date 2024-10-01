// Action is just same as JS Event Listner - matching name
// created four different action types to handle different operations
export const EventActionTypes = {
    ADD_EVENT: 'Add a event',
    ADD_MANY_EVENT: 'Add many events',
    REMOVE_EVENT:'delete event',
  
};

// actions created for adding,deleting and updating  a todo.
// action fpor creating a todo

export const addManyEvents = (payload) => ({type: EventActionTypes.ADD_MANY_EVENT, payload});
export const addOneEvent = (payload) => ({type: EventActionTypes.ADD_EVENT, payload});
export const deleteEvent = (payload) => ({type: EventActionTypes.REMOVE_EVENT, payload});

