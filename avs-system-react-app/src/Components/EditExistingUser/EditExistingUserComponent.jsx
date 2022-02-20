import React,{useCallback,useEffect,useRef,useReducer} from 'react';
import {Link,useLocation} from 'react-router-dom';

import './EditExistingUserComponent.css';
import InputComponent from '../Input/InputComponent';
import ButtonComponent from '../Button/ButtonComponent';
import SelectComponent from '../Select/SelectComponent';
/*const initialValue={
	id:'',
	name:'',
	workerType:'',
	designation:'',
	phoneNo:'',
	mailId:''
}*/

const reducerFunction=(state,action)=>{
	return{...state,[action.name]:action.value}
}

function EditExistingUserComponent()
{
	
	console.log('rendering EditExistingUserComponent');
	
	const location=useLocation();
	
	console.log('got the data through react router');
	console.log(location.state);
	
	const [state,dispatchFunction]=useReducer(reducerFunction,location.state);
	
	const {name,workerType,designation,phoneNo,mailId}=state
	
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
			<div id="edit-existing-user-component">
				<p className="title"> <span><i className="fas fa-user-edit"></i></span> Edit Existing User Details</p>

				<div className="back-button">
					<Link to="/settings/existing-users"><button><i className="fas fa-arrow-circle-left"></i> back</button></Link>
				</div>
				<div className="edit-existing-user-img-container">
					<img src="../login-user.png" className="edit-existing-user-image" alt="user-img"/>				
					<button className="changeImageButton" title="change Picture"><span><i className="fas fa-user-edit"></i></span></button>
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
						
						<ButtonComponent type="submit" classProp="button">
							Update <i className="fas fa-edit"></i>
						</ButtonComponent>
					</form>
				</div>
			</div>
	);
}
export default React.memo(EditExistingUserComponent);
