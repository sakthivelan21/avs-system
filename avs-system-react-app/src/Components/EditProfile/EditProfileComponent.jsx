import React,{useCallback,useEffect,useRef,useReducer} from 'react';
import {Link} from 'react-router-dom';
import {AlertBox} from "../../App";
import './EditProfileComponent.css';
import { getProfileDetails,updateProfileDetails} from "../../utils/Request.js";
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
	const alertBox = AlertBox();
	
	console.log('rendering EditProfileComponent');
	
	const [userDetails,dispatchFunction]=useReducer(reducerFunction,initialValue);
	
	const {name,organisationName,username,password}=userDetails
		
	const inputRef=useRef(null);
	
	const alertMessageHandler=(title,message)=>
	{
		let alertDetailsObject=
		   {
			'alertTitle':title,
			'alertText':message,
			'alertBox':{
					'type':'alert',
					'cancelButtonText':'',
					'okButtonText':'Ok',
					'buttonState':false
				},
			'duration':3000,
			'alertBoxDisplayState':true
			};
	 		
	 	alertBox(alertDetailsObject)
	 		.then(()=>console.log('alertbox is closed'))
	 		.catch(()=>console.log('closing the alert box'));
	}
	
	const updateUserDetails=useCallback((event)=>{
		dispatchFunction({'name':event.target.name,'value':event.target.value});
	},[])
	
	const submitHandler=(event)=>{
	event.preventDefault();
	console.log(userDetails);
	
	// updating the profile details to flask server
	updateProfileDetails(userDetails).then(
		(responseData) =>{
			console.log(responseData);
			if(responseData.success)
			{
				alertMessageHandler(responseData.message,"Profile Details updated Successfully !!!");
			}
			else
			{
				alertMessageHandler(responseData.message,"please follow this instruction to update the user details");			
			}
		}
	).catch(
		(error) =>{
			console.log(error.response.data.message);
				alertMessageHandler(error.response.data.message,"please try after some time");
		}
	);
	
	}
		
	useEffect(()=>{
		inputRef.current.focus();
		getProfileDetails().then(
			(responseData) =>{
				console.log(responseData);
				dispatchFunction({'name':'name','value':responseData.name});
				dispatchFunction({'name':'organisationName','value':responseData.organisationName});
				dispatchFunction({'name':'username','value':responseData.username});
			}
		).catch(
			(error) =>{
				console.log(error);
				console.log('error occured at fetching user details');
			}
		);	
	},[dispatchFunction]);
	return(
			<div id="edit-profile-component">
				<p className="title"> <span><i className="fas fa-user-edit"></i></span> Edit Account Profile</p>

				<div className="back-button">
					<Link to="/settings"><button><i className="fas fa-arrow-circle-left"></i> back</button></Link>
				</div>
				<img src="../login-user.png" className="edit-user-image" alt="user-img"/>				
				
				<div className="form-holder">
					<form  onSubmit={submitHandler}>
						<label htmlFor="name" className="edit-form-label">Enter your Name</label>
						<InputComponent 
							iconClass="fa fa-user"
							name="name" 
							onChange={updateUserDetails} 
							type="text"
							extraConditions={{}}
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
							extraConditions={{}}
							placeholder="Enter your Organisation Name"
							value={organisationName}/>
						<label htmlFor="username" className="edit-form-label">Enter your User Name</label>
						<InputComponent 
							iconClass="fa fa-user"
							name="username" 
							onChange={updateUserDetails} 
							type="text"
							inputRef={null}
							extraConditions={{}}
							placeholder="Username"
							value={username}/>
						<label htmlFor="password" className="edit-form-label">Enter your Password</label>
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
							Update <i className="fas fa-edit"></i>
						</ButtonComponent>
					</form>
				</div>
			</div>
	);
}
export default React.memo(EditProfileComponent)
