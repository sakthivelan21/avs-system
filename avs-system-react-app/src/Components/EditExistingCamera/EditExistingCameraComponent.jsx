import './EditExistingCameraComponent.css';
import React,{useCallback,useEffect,useRef,useReducer} from 'react';
import {Link,useParams} from 'react-router-dom';
import InputComponent from '../Input/InputComponent';
import ButtonComponent from '../Button/ButtonComponent';
import {AlertBox} from "../../App";
import {getCameraById,updateCameraDetails} from "../../utils/Request";
const initialValue={
	id:'',
	name:'',
	location:'',
	password:''
}

const reducerFunction=(state,action)=>{
	return{...state,[action.name]:action.value}
}

function EditExistingCameraComponent()
{
	const alertBox = AlertBox();
	
	console.log('rendering EditExistingCameraComponent');
	
	const {cameraId}=useParams();
	
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
		getCameraById(cameraId).then(
			(responseData) =>{
				console.log(responseData);
				dispatchFunction({'name':'name','value':responseData.name});
				dispatchFunction({'name':'location','value':responseData.location});	
				dispatchFunction({'name':'id','value':responseData.id});
			}
		).catch(
			(error) =>{
				console.log(error);
				console.log('error occured at fetching camera details');
			}
		);
	},[cameraId]);
	
	const updateUserDetails=useCallback((event)=>{
		dispatchFunction({'name':event.target.name,'value':event.target.value});
	},[])
	
	const submitHandler=(event)=>{
		event.preventDefault();
		console.log(cameraDetails);
		
		// updating the camera details to flask server
		updateCameraDetails(cameraDetails).then(
			(responseData) =>{
				console.log(responseData);
				if(responseData.success)
				{
					alertMessageHandler(responseData.message,"Camera Details updated Successfully !!!");
				}
				else
				{
					alertMessageHandler(responseData.message,"please follow this instruction to update the camera details");			
				}
			}
		).catch(
			(error) =>{
				console.log(error.response.data.message);
					alertMessageHandler(error.response.data.message,"please try after some time");
			}
		);
	}
		
	return(
			<div id="edit-existing-camera-component">
				<p className="title"> <span><i className="fas fa-video"></i></span> Edit Existing Camera Details</p>

				<div className="back-button">
					<Link to="/settings/existing-cameras"><button><i className="fas fa-arrow-circle-left"></i> back</button></Link>
				</div>
				<div className="form-holder">
					<form onSubmit={submitHandler}>
						<label htmlFor="name" className="edit-existing-camera-form-label">Enter the Camera Name</label>
						<InputComponent 
							iconClass="fa fa-video"
							name="name" 
							onChange={updateUserDetails} 
							type="text"
							extraConditions={{}}
							inputRef={inputRef}
							placeholder="Enter the Camera Name"
							value={name}/>
						<label htmlFor="location" className="edit-existing-camera-form-label">Enter the Location of Camera</label>
						<InputComponent 
							iconClass="fas fa-map-marker-alt"
							name="location" 
							onChange={updateUserDetails} 
							type="text"
							extraConditions={{}}
							inputRef={inputRef}
							placeholder="Enter the Location of Camera"
							value={location}/>
						<label htmlFor="password" className="edit-existing-camera-form-label">Enter the Password </label>
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
							Update <i className="fas fa-edit"></i>
						</ButtonComponent>
					</form>
				</div>
			</div>
	);
}

export default React.memo(EditExistingCameraComponent);
