import { RoommateActionTypes } from "../Actions/rommateAction";
// a reducer will accept state and action.
// on the basis of the input state and the action, the state of the store will be updated.

const reducer = (state={username: ''}, action) => {

    const type = action.type;
    let data;
    switch(type) {
        case RoommateActionTypes.SET_USERNAME:
          // The new payload will be assigned to the data. 
          data = { username: action.payload };
          break;
        case RoommateActionTypes.SET_PROFILE:
          data = { profile: action.profile };
          break;
    }
    // assigned the data to the store's state.
    const ret = Object.assign({}, state, data)
    return ret;
};

export default reducer;