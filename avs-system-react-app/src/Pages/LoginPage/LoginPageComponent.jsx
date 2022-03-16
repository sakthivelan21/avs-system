import React,{useReducer,useCallback,useEffect,useRef} from 'react';
import { Link,useNavigate,useLocation} from 'react-router-dom';

import {AlertBox} from "../../App";
import { loginRequest} from "../../utils/Request.js";
import './LoginPageComponent.css';
import InputComponent from '../../Components/Input/InputComponent';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import {useAuth} from '../../Components/Auth/AuthProvider';

const initialValue={
	username:'',
	password:''
}

const reducerFunction=(state,action)=>{
	return{...state,[action.name]:action.value}
}

export default function LoginPageComponent()
{
	const alertBox = AlertBox();
	
	const [loginDetails,dispatchFunction]=useReducer(reducerFunction,initialValue);

	const {username,password}=loginDetails;
	
	const updateLoginDetails=useCallback((event)=>{
		dispatchFunction({'name':event.target.name,'value':event.target.value});
	},[])

	
	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const inputRef=useRef(null);
	const redirectPath = location.state?.path || '/home'
	
	useEffect(()=>{
		inputRef.current.focus();
	},[]);
	
	

	const submitHandler=(event)=>{
		event.preventDefault();
		console.log(loginDetails);
		
		// sending the login request to flask server
		loginRequest(loginDetails).then(
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
					'alertText':'Please enter correct username and password to login...',
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
		<div id="login-page">
			<img src="./page-side-image.jpg" id="login-page-image" alt="login-page-side-img"/>
			<div id="login-page-form-container">
				<p className="title"> <span><i className="fas fa-video"></i></span> AVS - SYSTEM</p>
				<img src="./login-user.png" id="login-user-image" alt="login-user-img"/>
				<div id="form-holder">
					<form id="login-form" onSubmit={submitHandler}>
						<InputComponent 
							iconClass="fa fa-user"
							name="username" 
							onChange={updateLoginDetails} 
							type="text"
							extraConditions={{}}
							inputRef={inputRef}
							placeholder="Username"
							value={username}/>
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
					
					<div id="login-new-user">
						New User?  <Link to="/signup" className="signup-link">Click here</Link> 
					</div>
				</div>
			</div>
		</div>
	)
}
