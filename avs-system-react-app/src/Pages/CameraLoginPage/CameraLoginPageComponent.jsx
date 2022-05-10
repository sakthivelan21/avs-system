import React,{useReducer,useCallback,useEffect,useRef} from 'react';
import { Link,useNavigate,useLocation} from 'react-router-dom';

import {AlertBox} from "../../App";
import {  cameraLoginRequest } from "../../utils/Request.js";
import './CameraLoginPageComponent.css';
import InputComponent from '../../Components/Input/InputComponent';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import {useAuth} from '../../Components/Auth/AuthProvider';

const initialValue={
	name:'',
	password:''
}

const reducerFunction=(state,action)=>{
	return{...state,[action.name]:action.value}
}

export default function CameraLoginPageComponent()
{
	const alertBox = AlertBox();
	
	const [loginDetails,dispatchFunction]=useReducer(reducerFunction,initialValue);

	const {name,password}=loginDetails;
	
	const updateLoginDetails=useCallback((event)=>{
		dispatchFunction({'name':event.target.name,'value':event.target.value});
	},[])

	
	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const inputRef=useRef(null);
	const redirectPath = location.state?.path || '/camera-home'
	
	useEffect(()=>{
		inputRef.current.focus();
	},[]);
	
	

	const submitHandler=(event)=>{
		event.preventDefault();
		console.log(loginDetails);
		
		// sending the camera login request to flask server
		cameraLoginRequest (loginDetails).then(
			(responseData) =>{
				// setting the auth token
				auth.login(responseData.token);
				console.log(responseData);
				// navigating to home
				navigate(redirectPath,{replace:true});
			}
		).catch(
			(error) =>{
				console.log(error.response.data.message);
				let alertDetailsObject=
				   {
					'alertTitle':error.response.data.message,
					'alertText':'Please enter correct Camera name and password to login...',
					'alertBox':{
							'type':'alert',
							'cancelButtonText':'',
							'okButtonText':'Ok',
							'buttonState':false
						},
					'duration':2000,
					'alertBoxDisplayState':true
					};
			 		
			 	alertBox(alertDetailsObject)
			 		.then(()=>console.log('alertbox is closed'))
			 		.catch(()=>console.log('closing the alert box'));
			}
		);		
		
	}
	console.log('rendering Login PageComponent');
	return(
		<div id="camera-login-page">
			<img src="./page-side-image.jpg" id="camera-login-page-image" alt="login-page-side-img"/>
			<div id="camera-login-page-form-container">
				<p className="title"> <span><i className="fas fa-video"></i></span> AVS - SYSTEM</p>
				<img src="./camera.jpg" id="camera-login-user-image" alt="login-user-img"/>
				<div id="camera-form-holder">
					<form id="camera-login-form" onSubmit={submitHandler}>
						<InputComponent 
							iconClass="fa fa-user"
							name="name" 
							onChange={updateLoginDetails} 
							type="text"
							extraConditions={{}}
							inputRef={inputRef}
							placeholder="Camera name"
							value={name}/>
						<InputComponent 
							iconClass="fa fa-key"
							name="password" 
							onChange={updateLoginDetails} 
							type="password"
							inputRef={null}
							extraConditions={{}}
							placeholder="Password"
							value={password}/>
						<ButtonComponent type="submit" classProp="button">
							Login <i className="fas fa-sign-in-alt"></i>
						</ButtonComponent>
					</form>
					<div className="login-page-links">
						Admin Login ?  <Link to="/" className="signup-link">Click here</Link> 
					</div>
				</div>
			</div>
		</div>
	)
}
