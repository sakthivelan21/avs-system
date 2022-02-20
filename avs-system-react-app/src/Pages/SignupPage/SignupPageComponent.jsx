import React,{useCallback,useEffect,useRef,useReducer} from 'react';
import { Link} from 'react-router-dom';

import './SignupPageComponent.css';
import InputComponent from '../../Components/Input/InputComponent';
import ButtonComponent from '../../Components/Button/ButtonComponent';


const initialValue={
	name:'',
	organisationName:'',
	username:'',
	password:''
}

const reducerFunction=(state,action)=>{
	return{...state,[action.name]:action.value}
}


export default function SignupPageComponent()
{

	const [state,dispatchFunction]=useReducer(reducerFunction,initialValue);
	
	const {name,organisationName,username,password}=state
		
	const inputRef=useRef(null);
	
	useEffect(()=>{
		inputRef.current.focus();
	},[]);
	
	const updateUserDetails=useCallback((event)=>{
		dispatchFunction({'name':event.target.name,'value':event.target.value});
	},[])
	

	const submitHandler=(event)=>{
		event.preventDefault();
		console.log(state);
	}
	console.log('rendering Signup PageComponent');
	return(
		<div id="signup-page">
			<img src="./page-side-image.jpg" id="signup-page-image" alt="signup-page-side-img"/>
			<div id="signup-page-form-container">
				<p className="title"> <span><i className="fas fa-video"></i></span> AVS - SYSTEM</p>
				<img src="./login-user.png" id="signup-user-image" alt="signup-user-img"/>
				<div id="signup-form-holder">
					<form id="signup-form" onSubmit={submitHandler}>
						<InputComponent 
							iconClass="fa fa-user"
							name="name" 
							onChange={updateUserDetails} 
							type="text"
							extraConditions={{}}
							inputRef={inputRef}
							placeholder="Enter your Name"
							value={name}/>
						<InputComponent 
							iconClass="fa fa-user"
							name="organisationName" 
							onChange={updateUserDetails} 
							type="text"
							extraConditions={{}}
							inputRef={null}
							placeholder="Enter your Organisation Name"
							value={organisationName}/>
						<InputComponent 
							iconClass="fa fa-user"
							name="username" 
							onChange={updateUserDetails} 
							type="text"
							extraConditions={{}}
							inputRef={null}
							placeholder="Username"
							value={username}/>
						<InputComponent 
							iconClass="fa fa-key"
							name="password" 
							onChange={updateUserDetails} 
							type="password"
							extraConditions={{}}
							inputRef={null}
							placeholder="Password"
							value={password}/>
						
						<ButtonComponent type="submit" classProp="button">
							Signup <i className="fas fa-sign-in-alt"></i>
						</ButtonComponent>
					</form>
					
					<div id="signup-new-user">
						Already Existing User?  <Link to="/" className="login-link">Click here</Link> 
					</div>
				</div>
			</div>
		</div>
	)
}
