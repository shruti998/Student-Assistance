// Action is just same as JS Event Listner - matching name
// created four different action types to handle different operations
export const HousingActionTypes = {
    ADD_HOUSING: 'Add a housing',
    ADD_MANY_HOUSING: 'Add many housings',
    REMOVE_HOUSING:'delete housing',
  
};

// actions created for adding,deleting and updating  a todo.
// action fpor creating a todo

export const addManyHousing = (payload) => ({type: HousingActionTypes.ADD_MANY_HOUSING, payload});
export const addOneHousing = (payload) => ({type: HousingActionTypes.ADD_HOUSING, payload});
export const deleteHousing = (payload) => ({type: HousingActionTypes.REMOVE_HOUSING, payload});

