import React,{useReducer} from 'react';
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
import EditExistingUserComponent from './Components/EditExistingUser/EditExistingUserComponent';
import ExistingUserComponent from './Components/ExistingCameras/ExistingCamerasComponent';
import EditExistingCameraComponent from './Components/EditExistingCamera/EditExistingCameraComponent';
import ExistingCamerasComponent from './Components/ExistingCameras/ExistingCamerasComponent';
import AddNewCameraComponent from './Components/AddNewCamera/AddNewCameraComponent';
import AlertBoxComponent from './Components/AlertBox/AlertBoxComponent';


export const AlertBoxContext =	React.createContext();

const initialAlertBoxObject={
	'alertBoxDetails':{},
	'alertBoxDisplayState':false
}

const alertBoxReducerFunction=(previousAlertBoxObject,currentAlertBoxObject) =>
{
	console.log('changing the alertbox state');
	return currentAlertBoxObject;
}


function App() {
  
  const [alertBoxObject,alertBoxDetailsFunction]= useReducer(alertBoxReducerFunction,initialAlertBoxObject);
  
  //const alertBoxUpdateHandler=(newAlertBoxDetails)=> (alertBoxDetailsFunction(newAlertBoxDetails) );
  
  return (
    	<>
    		<AlertBoxComponent {...alertBoxObject} alertBoxHandler={alertBoxDetailsFunction}/>
    		<AlertBoxContext.Provider 
    			value ={ {alertBoxObject : alertBoxObject,
    				alertBoxDetailsFunction:alertBoxDetailsFunction}}>
				<Routes>
					<Route path="/" element={<LoginPageComponent/>}/>
					<Route path="/home" element={<HomePageComponent/>}/>
					<Route path="/signup" element={<SignupPageComponent/>}/>
					<Route path="/add-user" element={<AddUserPageComponent/>} />
					<Route path="/settings" element={<SettingsPageComponent/>}>
						<Route path='' element={<AccountDetailsComponent/>}/>
						<Route path='edit-profile' element={<EditProfileComponent/>}/>
						<Route path='existing-users' element={<ExistingUsersComponent/>}/>
						<Route path="edit-existing-user" element={<EditExistingUserComponent/>}/>
						<Route path='existing-cameras' element={<ExistingCamerasComponent/>}/>
						<Route path="edit-existing-camera" element={<EditExistingCameraComponent/>}/>
						<Route path="add-new-camera" element={<AddNewCameraComponent/>}/>
					</Route>
					<Route path="*" element={<LoginPageComponent/>}/>
				</Routes>
			</AlertBoxContext.Provider>
    	</>
  );
}
export default App;
