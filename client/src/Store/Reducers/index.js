import { combineReducers } from 'redux';
import user from './user_reducer';
import housingReducer from './housingReduser.js';

const rootReducer = combineReducers({
    User:user,
    housing:housingReducer
});

export default rootReducer;