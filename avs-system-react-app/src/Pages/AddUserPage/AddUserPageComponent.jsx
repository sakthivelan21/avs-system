import React,{useCallback,useEffect,useRef,useReducer,useState} from 'react';
import NavBarComponent from '../../Components/NavBar/NavBarComponent';
import InputComponent from '../../Components/Input/InputComponent';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import SelectComponent from '../../Components/Select/SelectComponent';
import './AddUserPageComponent.css';
import {addUserDetails} from "../../utils/Request";
import {AlertBox} from "../../App";
const initialValue={
	name:'',
	designation:'',
	workerType:'Normal User',
	file:null
}

const reducerFunction=(state,action)=>{
	return{...state,[action.name]:action.value}
}

export default function AddUserPageComponent()
{
	const [state,dispatchFunction]=useReducer(reducerFunction,initialValue);
	
	const [fileUrl,setFileUrl] = useState('');
	
	const alertBox = AlertBox();
	
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
	
	const {name,designation,workerType}=state
		
	const inputRef=useRef(null);
	
	useEffect(()=>{
		inputRef.current.focus();
	},[]);
	
	const updateUserDetails=useCallback((event)=>{
		dispatchFunction({'name':event.target.name,'value':event.target.value});
	},[])
	
	const updatefile=useCallback((event)=>{
		dispatchFunction({'name':event.target.name,'value':event.target.files[0]});
		setFileUrl(URL.createObjectURL(event.target.files[0]));
	},[])

	const submitHandler=(event)=>{
		event.preventDefault();
		console.log(state);
		let formData = new FormData();
		formData.append('file',state.file);
		formData.append('name',name);
		formData.append('designation',designation);
		formData.append('workerType',workerType);
		addUserDetails(formData).then(
			(responseData) =>{
				if(responseData.success)
				{
					alertMessageHandler(responseData.message,"please login to use your account");
				}
				else
				{
					alertMessageHandler(responseData.message,"please follow this instruction to create an account");			
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
	
	return (
	<>
		<NavBarComponent/>
		<div id="add-user-page">
				<p className="title"> <span><i className="fa fa-user-plus"></i></span> Add New user</p>
				 
				<img src={(fileUrl==='' )?"./login-user.png":fileUrl} id="add-user-image" alt="add-user-img"/>
				<div id="add-user-form-holder">
					<form id="add-user-form" onSubmit={submitHandler}>
						<label htmlFor="name" className="form-label">Enter Name of the user</label>
						<InputComponent 
							iconClass="fa fa-user"
							name="name" 
							onChange={updateUserDetails} 
							type="text"
							extraConditions={{}}
							inputRef={inputRef}
							placeholder="Enter User Name"
							value={name}/>
						<label htmlFor="designation" className="form-label">Enter Designation of the user</label>
						<InputComponent 
							iconClass="fa fa-user"
							name="designation" 
							onChange={updateUserDetails} 
							type="text"
							inputRef={null}
							extraConditions={{}}
							placeholder="Enter User Designation"
							value={designation}/>
						<label htmlFor="workerType" className="form-label">Enter Type of the worker</label>
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
						<label htmlFor="image" className="form-label">Select the user image</label>
						<div className="input-file-holder">
							<input type="file"  onChange={updatefile} className="input-file" name="file" />
						</div>
						<ButtonComponent type="submit" classProp="button">
							Add User <i className="fa fa-user-plus"></i>
						</ButtonComponent>
					</form>
				</div>
		</div>
	</>)
}
