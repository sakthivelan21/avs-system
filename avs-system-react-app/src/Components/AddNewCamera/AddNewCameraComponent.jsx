import React,{useCallback,useEffect,useRef,useReducer} from 'react';
import './AddNewCameraComponent.css';
import { addCamera } from '../../utils/Request.js';
import InputComponent from '../Input/InputComponent';
import ButtonComponent from '../Button/ButtonComponent';
import {AlertBox} from "../../App";
const initialValue={
	name:'',
	location:'',
	password:''
}

const reducerFunction=(state,action)=>{
	return{...state,[action.name]:action.value}
}

function AddNewCameraComponent()
{
	const alertBox = AlertBox();
	
	console.log('rendering AddNewCameraComponent');
	
	
	console.log('got the data through react router');
	
	const [cameraDetails,dispatchFunction]=useReducer(reducerFunction,initialValue);
	
	const {name,location,password}=cameraDetails
		
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
	
	useEffect(()=>{
		inputRef.current.focus();
		
	},[]);
	
	const updateUserDetails=useCallback((event)=>{
		dispatchFunction({'name':event.target.name,'value':event.target.value});
	},[])
	
	const submitHandler=(event)=>{
		event.preventDefault();
		console.log(cameraDetails);
		
		// sending the signup request to flask server
		addCamera(cameraDetails).then(
			(responseData) =>{
				if(responseData.success)
				{
					alertMessageHandler(responseData.message,"new camera details added");
					dispatchFunction({'name':'name','value':''});
					dispatchFunction({'name':'location','value':''});
					dispatchFunction({'name':'password','value':''});
					console.log('clearing camera details');
					console.log(cameraDetails);
				}
				else
				{
					alertMessageHandler(responseData.message,"please follow this instruction to add the camera details");			
				}
				console.log(responseData);
				
			}
		).catch(
			(error) =>{
				console.log(error.response.data.message);
				alertMessageHandler(error.response.data.message,"please try after some time");
			}
		);
	
	}
		
	return(
			<div id="add-new-camera-component">
				<p className="title"> <span><i className="fas fa-video"></i></span> Add New Camera</p>

				<div className="form-holder">
					<form onSubmit={submitHandler}>
						<label htmlFor="name" className="add-new-camera-form-label">Enter the Camera Name</label>
						<InputComponent 
							iconClass="fa fa-video"
							name="name" 
							onChange={updateUserDetails} 
							type="text"
							extraConditions={{}}
							inputRef={inputRef}
							placeholder="Enter the Camera Name"
							value={name}/>
						<label htmlFor="location" className="add-new-camera-form-label">Enter the Location of Camera</label>
						<InputComponent 
							iconClass="fas fa-map-marker-alt"
							name="location" 
							onChange={updateUserDetails} 
							type="text"
							extraConditions={{}}
							inputRef={null}
							placeholder="Enter the Location of Camera"
							value={location}/>
						<label htmlFor="password" className="add-new-camera-form-label">Enter the Password </label>
						<InputComponent 
							iconClass="fas fa-key"
							name="password" 
							onChange={updateUserDetails} 
							type="password"
							extraConditions={{}}
							inputRef={null}
							placeholder="Enter the Password"
							value={password}/>
						
						
						<ButtonComponent type="submit" classProp="button">
							Add Camera <i className="fas fa-video"></i>
						</ButtonComponent>
					</form>
				</div>
			</div>
	);
}


export default React.memo(AddNewCameraComponent);
