import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import LoginPageComponent from './Pages/LoginPage/LoginPageComponent';
import SignupPageComponent from './Pages/SignupPage/SignupPageComponent';
import AddUserPageComponent from './Pages/AddUserPage/AddUserPageComponent';
import SettingsPageComponent from './Pages/SettingsPage/SettingsPageComponent';
import HomePageComponent from './Pages/HomePage/HomePageComponent';
import AccountDetailsComponent from './Components/AccountDetails/AccountDetailsComponent';
import EditProfileComponent from './Components/EditProfile/EditProfileComponent';
import ExistingUsersComponent from './Components/ExistingUsers/ExistingUsersComponent';

function App() {
  return (
    	<>
			<Routes>
				<Route path="/" element={<LoginPageComponent/>}/>
				<Route path="/home" element={<HomePageComponent/>}/>
				<Route path="/signup" element={<SignupPageComponent/>}/>
    			<Route path="/add-user" element={<AddUserPageComponent/>} />
    			<Route path="/settings" element={<SettingsPageComponent/>}>
    				<Route path='' element={<AccountDetailsComponent/>}/>
    				<Route path='edit-profile' element={<EditProfileComponent/>}/>
    				<Route path='existing-users' element={<ExistingUsersComponent/>}/>
    					<Route path="edit-existing-user" element={<EditProfileComponent/>}/>
    			</Route>
    			<Route path="*" element={<LoginPageComponent/>}/>
			</Routes>
    	</>
  );
}

export default App;
