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

function App() {
  return (
    	<>
			<Routes>
				<Route path="/" element={<LoginPageComponent/>}/>
				<Route path="/home" element={<HomePageComponent/>}/>
				<Route path="/signup" element={<SignupPageComponent/>}/>
    			<Route path="/add-user" element={<AddUserPageComponent/>} />
    			<Route path="/settings" element={<SettingsPageComponent/>} />
    			<Route path="*" element={<LoginPageComponent/>}/>
			</Routes>
    	</>
  );
}

export default App;
