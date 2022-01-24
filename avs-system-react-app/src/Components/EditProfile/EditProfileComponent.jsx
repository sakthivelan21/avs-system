import React,{useCallback,useEffect,useRef,useReducer} from 'react';
import {Link} from 'react-router-dom';

import './EditProfileComponent.css';
import InputComponent from '../Input/InputComponent';
import ButtonComponent from '../Button/ButtonComponent';

const initialValue={
	name:'',
	organisationName:'',
	username:'',
	password:''
}

const reducerFunction=(state,action)=>{
	return{...state,[action.name]:action.value}
}

function EditProfileComponent()
{
	
	console.log('rendering EditProfileComponent');
	
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
		
	return(
			<div id="edit-profile-component">
				<p className="title"> <span><i className="fas fa-user-edit"></i></span> Edit Account Profile</p>

				<div className="back-button">
					<Link to="/settings"><button><i className="fas fa-arrow-circle-left"></i> back</button></Link>
				</div>
				<img src="../login-user.png" className="edit-user-image" alt="user-img"/>				
				
				<div id="signup-form-holder">
					<form id="signup-form" onSubmit={submitHandler}>
						<label htmlFor="name" className="edit-form-label">Enter your Name</label>
						<InputComponent 
							iconClass="fa fa-user"
							name="name" 
							onChange={updateUserDetails} 
							type="text"
							inputRef={inputRef}
							placeholder="Enter your Name"
							value={name}/>
						<label htmlFor="organistationName" className="edit-form-label">Enter your Organisation Name</label>
						<InputComponent 
							iconClass="fa fa-user"
							name="organisationName" 
							onChange={updateUserDetails} 
							type="text"
							inputRef={null}
							placeholder="Enter your Organisation Name"
							value={organisationName}/>
						<label htmlFor="username" className="edit-form-label">Enter your User Name</label>
						<InputComponent 
							iconClass="fa fa-user"
							name="username" 
							onChange={updateUserDetails} 
							type="text"
							inputRef={null}
							placeholder="Username"
							value={username}/>
						<label htmlFor="password" className="edit-form-label">Enter your Password</label>
						<InputComponent 
							iconClass="fa fa-key"
							name="password" 
							onChange={updateUserDetails} 
							type="password"
							inputRef={null}
							placeholder="Password"
							value={password}/>
						
						<ButtonComponent type="submit" classProp="button">
							Update <i className="fas fa-edit"></i>
						</ButtonComponent>
					</form>
				</div>
			</div>
	);
}
export default React.memo(EditProfileComponent)
