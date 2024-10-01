// Action is just same as JS Event Listner - matching name
// created four different action types to handle different operations
export const RoommateActionTypes = {
  SET_USERNAME: 'Roommate set username',
  SET_PROFILE: 'Roommate set profile'
};

// actions created for adding,deleting and updating  a todo.
// action fpor creating a todo

export const setUsername = (payload) => ({type: RoommateActionTypes.SET_USERNAME, payload});
export const setProfile = (payload) => ({type: RoommateActionTypes.SET_PROFILE, payload});