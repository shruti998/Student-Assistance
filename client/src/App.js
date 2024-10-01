import './App.scss';
import './main.scss';
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom"

import UserProfile from './Components/Profile/profile.js';
import Navbar from './Components/Navbar/Navbar.js';
import Housing from './Pages/Housing/Housing';
import Events from './Pages/Events/Events';
import ForgotPassword from './Pages/Forgot Password/ForgotPassword.js';
import LandingPage from './views/LandingPage/LandingPage';
import Roommate from './Components/Rommate/Roommate';
import { NavigationContainer } from '@react-navigation/native';
import { RoommateGroup } from './Components/RoommateGroup/RoommateGroup';
import RoommateSearch from './Components/RoommateSearch/RoommateSearch';
import { RoommateRequests } from './Components/RoommateRequests/RoommateRequests';
import ManageHousings from './Pages/ManageHousings/ManageHousings';
import ManageEvents from './Pages/Manage Events/ManageEvents.js';
import AdminPage from './Pages/AdminPage/AdminPage.js';
import UserInteraction from './Pages/Sign Up/UserInteraction';
import Login from './Pages/Login/Login';
import User from './Pages/User/User';
import ArchiveEvents from './Pages/Archive Events/ArchiveEvents';
import ArchiveHousing from './Pages/Archive Housing/ArchiveHousing';
import { PrivateRoute } from './Components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <NavigationContainer>
        <Navbar />
        <div className='container'>
          <Routes >
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<UserInteraction />}></Route>
            <Route path="/Login" element={<Login />}></Route>

            <Route path="/housings" element={<PrivateRoute />}>
              <Route path="/housings" element={<Housing />}></Route>
            </Route>
            <Route path="/Events" element={<PrivateRoute />}>
              <Route path="/Events" element={<Events />}></Route>
            </Route>
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<UserProfile />}></Route>
            </Route>
            <Route path="/roommate/:username" element={<PrivateRoute />}>
              <Route path="/roommate/:username" element={<Roommate />}></Route>
            </Route>
            <Route path="/roommate" element={<PrivateRoute />}>
              <Route path="/roommate" element={<Roommate />}></Route>
            </Route>
            <Route path="/roommateGroup" element={<PrivateRoute />}>
              <Route path="/roommateGroup" element={<RoommateGroup />}></Route>
            </Route>
            <Route path="/roommateFind" element={<PrivateRoute />}>
              <Route path="/roommateFind" element={<RoommateSearch />}></Route>
            </Route>
            <Route path="/roommateRequests" element={<PrivateRoute />}>
              <Route path="/roommateRequests" element={<RoommateRequests />}></Route>
            </Route>
            <Route path="/Forgotpassword" element={<PrivateRoute />}>
              <Route path="/Forgotpassword" element={<ForgotPassword />}></Route>
            </Route>
            <Route path="/Admin" element={<PrivateRoute />}>
              <Route path="/Admin" element={<AdminPage />}></Route>
            </Route>
            <Route path="/ManageEvents" element={<PrivateRoute />}>
              <Route path="/ManageEvents" element={<ManageEvents />}></Route>
            </Route>
            <Route path="/ManageHousings" element={<PrivateRoute />}>
              <Route path="/ManageHousings" element={<ManageHousings />}></Route>
            </Route>
            <Route path="/User" element={<PrivateRoute />}>
              <Route path="/User" element={<User />}></Route>
            </Route>
            <Route path="/ArchiveEvents" element={<PrivateRoute />}>
              <Route path="/ArchiveEvents" element={<ArchiveEvents />}></Route>
            </Route>
            <Route path="/ArchiveHousing" element={<PrivateRoute />}>
              <Route path="/ArchiveHousing" element={<ArchiveHousing />}></Route>
            </Route>
          </Routes>
        </div>

    </NavigationContainer>
  );
}

export default App;