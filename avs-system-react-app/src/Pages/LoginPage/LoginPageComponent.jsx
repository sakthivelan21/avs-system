import React,{useState,useCallback,useEffect,useRef} from 'react';
import { Link,useNavigate,useLocation} from 'react-router-dom';

import './LoginPageComponent.css';
import InputComponent from '../../Components/Input/InputComponent';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import {useAuth} from '../../Components/Auth/AuthProvider';


export default function LoginPageComponent()
{
	const [username,setUsername]=useState('');
	const [password,setPassword]=useState('');
	
	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const inputRef=useRef(null);
	const redirectPath = location.state?.path || '/home'
	
	useEffect(()=>{
		inputRef.current.focus();
	},[]);
	
	const updateUsername=useCallback((event)=>{
		setUsername(event.target.value)
	},[])
	
	const updatePassword=useCallback((event)=>{
		setPassword(event.target.value)
	},[])

	const submitHandler=(event)=>{
		event.preventDefault();
		console.log(username,password);
		auth.login(username);
		navigate(redirectPath,{replace:true});
		
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
							onChange={updateUsername} 
							type="text"
							extraConditions={{}}
							inputRef={inputRef}
							placeholder="Username"
							value={username}/>
						<InputComponent 
							iconClass="fa fa-key"
							name="password" 
							onChange={updatePassword} 
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
