import {EventActionTypes} from '../Actions/eventAction.js'
// a reducer will accept state and action.
// on the basis of the input state and the action, the state of the store will be updated.

const reducer = (state=[], action) => {

    const type = action.type;
    let data;
    switch(type) {
        case EventActionTypes.ADD_MANY_EVENT:
            // The new payload will be assigned to the data. 
            data = [...action.payload];
            break;
        case EventActionTypes.REMOVE_EVENT:
            data=[state.filter(item => item !== action.payload),]

    }
    // assigned the data to the store's state.
    return  Object.assign({}, state, {data});
};

export default reducer;