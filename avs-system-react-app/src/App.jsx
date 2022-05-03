import React,{useReducer,useRef} from 'react';
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
import EditExistingCameraComponent from './Components/EditExistingCamera/EditExistingCameraComponent';
import ExistingCamerasComponent from './Components/ExistingCameras/ExistingCamerasComponent';
import AddNewCameraComponent from './Components/AddNewCamera/AddNewCameraComponent';
import CameraLoginPageComponent from './Pages/CameraLoginPage/CameraLoginPageComponent';
import AlertBoxComponent from './Components/AlertBox/AlertBoxComponent';
import {AuthProvider} from './Components/Auth/AuthProvider';
import {RequiredAuth} from './Components/Auth/RequiredAuth';
import CameraHomePageComponent from './Pages/CameraHomePage/CameraHomePageComponent';

// creating the context for alertbox with promises
const AlertBoxContext =	React.createContext(Promise.reject);

// exporting the alertbox context
export const AlertBox = ()=>React.useContext(AlertBoxContext);




const initialAlertBoxValue={
	
	'alertTitle':'',
	'alertText':'',
	'alertBox':{
				'type':'',
				'cancelButtonText':'',
				'okButtonText':''
			},
	'duration':0,
	'alertBoxDisplayState':false
}


const alertBoxReducerFunction=(previousAlertBoxObject,currentAlertBoxObject) =>
{
	console.log('changing the alertbox state');
	return currentAlertBoxObject;
}



function App() {
  
  	const [alertBoxObject,setAlertBoxDetailsFunction] =  useReducer(alertBoxReducerFunction,initialAlertBoxValue);
  
  	const awaitingPromiseRef = useRef();
  
  	const openConfirmation = (alertBoxDetails) => {
  	
		setAlertBoxDetailsFunction(alertBoxDetails);
	
		return new Promise((resolve, reject) => {
		    awaitingPromiseRef.current = { resolve, reject };
		});
	
	};
	
	const handleClose = () => {
		if (awaitingPromiseRef.current) {
		    awaitingPromiseRef.current.reject();
		}
		setAlertBoxDetailsFunction(initialAlertBoxValue);
	};
	
	const handleSubmit = () => {
		if (awaitingPromiseRef.current) {
		    awaitingPromiseRef.current.resolve();
		}
		setAlertBoxDetailsFunction(initialAlertBoxValue);
	};

  return (
    	<>
    		<AuthProvider>
				<AlertBoxComponent 
				alertBoxDetails={alertBoxObject} 
				onSubmit={handleSubmit}
				onClose={handleClose}/>
				<AlertBoxContext.Provider 
					value ={openConfirmation}>
					<Routes>
						<Route path="/" element={<LoginPageComponent/>}/>
						<Route 
							path="/home" 
							element={
							<RequiredAuth>
								<HomePageComponent/>
							</RequiredAuth>
							}
						/>
						<Route 
							path="/camera-home" 
							element={
							<RequiredAuth>
								<CameraHomePageComponent/>
							</RequiredAuth>
							}
						/>
						<Route path="/camera-home-2" element={<CameraHomePageComponent/>}/>
						<Route path="/camera-login" element={<CameraLoginPageComponent/>}/>
						<Route path="/signup" element={<SignupPageComponent/>}/>
						<Route 
							path="/add-user" 
							element={
							<RequiredAuth>
								<AddUserPageComponent/>
							</RequiredAuth>
							} 
						/>
						<Route 
						path="/settings" 
						element={
						<RequiredAuth>
							<SettingsPageComponent/>
						</RequiredAuth>
						}
						>
							<Route path='' element={<AccountDetailsComponent/>}/>
							<Route path='edit-profile' element={<EditProfileComponent/>}/>
							<Route path='existing-users' element={<ExistingUsersComponent/>}/>
							<Route path="edit-existing-user/:userId" element={<EditExistingUserComponent/>}/>
							<Route path='existing-cameras' element={<ExistingCamerasComponent/>}/>
							<Route path="edit-existing-camera/:cameraId" element={<EditExistingCameraComponent/>}/>
							<Route path="add-new-camera" element={<AddNewCameraComponent/>}/>
							
						</Route>
						<Route path="*" element={<LoginPageComponent/>}/>
					</Routes>
				</AlertBoxContext.Provider>
			</AuthProvider>
    	</>
  );
}
export default App;
