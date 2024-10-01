import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from './Reducers/loginreducer';
//import DashboardReducer from './Reducers/DashboardReducer';
//import ActivityReducer from './Reducers/ActivityReducer';
//import EventsReducer from './Reducers/EventsReducer';
//import LoaderReducer from './Reducers/LoaderReducer';
import HousingReducer from '../Store/Reducers/housingReduser.js';
import RoommateReducer from './Reducers/roommateReducer';
import EventReducer from './Reducers/eventReducer.js'

const store = configureStore({
  reducer: {
    Login: LoginReducer,
  //  Dashboard: DashboardReducer,
    //Activity: ActivityReducer,
    //Events: EventsReducer,
    //Loader: LoaderReducer,
    Housing: HousingReducer,
    Roommate: RoommateReducer,
    Event:EventReducer 
  }
})

export default store;