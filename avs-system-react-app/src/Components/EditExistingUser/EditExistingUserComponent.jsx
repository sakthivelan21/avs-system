import React,{useCallback,useEffect,useRef,useReducer,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import { getUserById,updateUserDetailsRequest} from "../../utils/Request.js";
import './EditExistingUserComponent.css';
import InputComponent from '../Input/InputComponent';
import ButtonComponent from '../Button/ButtonComponent';
import SelectComponent from '../Select/SelectComponent';
import {AlertBox} from "../../App";
const initialValue={
	id:'',
	name:'',
	workerType:'',
	designation:'',
	userImageUrl:'',
	file:null
}

const reducerFunction=(state,action)=>{
	return{...state,[action.name]:action.value}
}

function EditExistingUserComponent()
{
	const alertBox = AlertBox();
	
	const [fileUrl,setFileUrl] = useState('');
	
	console.log('rendering EditExistingUserComponent');
	
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
	
	const {userId}=useParams();
	
	
	const [userDetails,dispatchFunction]=useReducer(reducerFunction,initialValue);
	
	const {name,workerType,designation,userImageUrl}=userDetails;
	
	const inputRef=useRef(null);
	
	useEffect(()=>{
		inputRef.current.focus();
		getUserById(userId).then(
			(responseData) =>{
				console.log(responseData);
				dispatchFunction({'name':'name','value':responseData.name});
				dispatchFunction({'name':'designation','value':responseData.designation});
				dispatchFunction({'name':'workerType','value':responseData.workerType});	
				dispatchFunction({'name':'id','value':responseData.id});
				dispatchFunction({'name':'userImageUrl','value':responseData.userImageUrl});
				
				setFileUrl(responseData.userImageUrl);
			}
		).catch(
			(error) =>{
				console.log(error);
				console.log('error occured at fetching camera details');
			}
		);
	},[userId ]);
	
	const updateUserDetails=useCallback((event)=>{
		dispatchFunction({'name':event.target.name,'value':event.target.value});
	},[])
	
	const updatefile=useCallback((event)=>{
		dispatchFunction({'name':event.target.name,'value':event.target.files[0]});
		setFileUrl(URL.createObjectURL(event.target.files[0]));
	},[])
	
	console.log(userImageUrl);
	
	const submitHandler=(event)=>{
		event.preventDefault();
		console.log(userDetails);
		let formData = new FormData();
		formData.append('id',userDetails.id);
		formData.append('file',userDetails.file);
		formData.append('name',name);
		formData.append('designation',designation);
		formData.append('workerType',workerType);
		// updating the camera details to flask server
		updateUserDetailsRequest(formData).then(
			(responseData) =>{
				console.log(responseData);
				if(responseData.success)
				{
					alertMessageHandler(responseData.message,"User Details updated Successfully !!!");
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
			<div id="edit-existing-user-component">
				<p className="title"> <span><i className="fas fa-user-edit"></i></span> Edit Existing User Details</p>

				<div className="back-button">
					<Link to="/settings/existing-users"><button><i className="fas fa-arrow-circle-left"></i> back</button></Link>
				</div>
				<div className="edit-existing-user-img-container">
					<img src={fileUrl} className="edit-existing-user-image" alt="user-img"/>				
				</div>
				<div className="form-holder">
					<form onSubmit={submitHandler}>
						<label htmlFor="name" className="edit-existing-user-form-label">Enter the User Name</label>
						<InputComponent 
							iconClass="fa fa-user"
							name="name" 
							onChange={updateUserDetails} 
							type="text"
							extraConditions={{}}
							inputRef={inputRef}
							placeholder="Enter the User Name"
							value={name}/>
						<label htmlFor="workerType" className="edit-existing-user-form-label">Enter the User Type</label>
						<SelectComponent
							name="workerType"
							options={
									[
										['defaultPriorityUser','Normal User'],
										['midPriorityUser','Mid Priority User'],
										['highPriorityUser','Hight Priority User']
									]
								}
							onChange={updateUserDetails}
							value={workerType}
						/>
						<label htmlFor="designation" className="edit-existing-user-form-label">Enter the User Designation</label>
						<InputComponent 
							iconClass="fa fa-user"
							name="designation" 
							onChange={updateUserDetails} 
							type="text"
							extraConditions={{}}
							inputRef={null}
							placeholder="User Designation"
							value={designation}/>
						<label htmlFor="designation" className="edit-existing-user-form-label">Choose the File to update User Image</label>
						<div className="input-file-holder">
							
							<input type="file"  onChange={updatefile} className="input-file" name="file" />
						</div>
						{/*
						<label htmlFor="phoneNo" className="edit-existing-user-form-label">Enter the User Phone No (exact 10 digits)</label>
						<InputComponent 
							iconClass="fas fa-phone-alt"
							name="phoneNo" 
							onChange={updateUserDetails} 
							type="tel"
							extraConditions={{'pattern':"[0-9]{10}"}}
							inputRef={null}
							placeholder="Enter User Phone Number"
							value={phoneNo}/>
							
						<label htmlFor="mailId" className="edit-existing-user-form-label">Enter the User Mail Id</label>
						<InputComponent 
							iconClass="fas fa-envelope"
							name="mailId" 
							onChange={updateUserDetails} 
							type="email"
							extraConditions={{}}
							inputRef={null}
							placeholder="Enter the User Mail Id"
							value={mailId}/>
							*/}
						
						<ButtonComponent type="submit" classProp="button">
							Update <i className="fas fa-edit"></i>
						</ButtonComponent>
					</form>
				</div>
			</div>
	);
}
export default React.memo(EditExistingUserComponent);
