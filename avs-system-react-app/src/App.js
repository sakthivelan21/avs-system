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

function App() {
  return (
    	<>
			<Routes>
				<Route path="/" element={<LoginPageComponent/>}/>
				<Route path="/signup" element={<SignupPageComponent/>}/>
    			<Route path="/add-user" component={<AddUserPageComponent/>} />
    			<Route path="/settings" component={<SettingsPageComponent/>} />
    			<Route path="*" element={<LoginPageComponent/>}/>
			</Routes>
    	</>
  );
}

export default App;
