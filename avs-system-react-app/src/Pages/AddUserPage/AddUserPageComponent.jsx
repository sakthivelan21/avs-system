import React,{useCallback,useEffect,useRef,useReducer} from 'react';
import NavBarComponent from '../../Components/NavBar/NavBarComponent';
import InputComponent from '../../Components/Input/InputComponent';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import SelectComponent from '../../Components/Select/SelectComponent';
import './AddUserPageComponent.css';

const initialValue={
	name:'',
	designation:'',
	workerType:''
}

const reducerFunction=(state,action)=>{
	return{...state,[action.name]:action.value}
}

export default function AddUserPageComponent()
{
	const [state,dispatchFunction]=useReducer(reducerFunction,initialValue);
	
	
	
	const {name,designation,workerType}=state
		
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
	
	return (
	<>
		<NavBarComponent/>
		<div id="add-user-page">
				<p className="title"> <span><i className="fa fa-user-plus"></i></span> Add New user</p>
				<img src="./login-user.png" id="add-user-image" alt="add-user-img"/>
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
							<input type="file"  className="input-file" name="filename"/>
						</div>
						<ButtonComponent type="submit" classProp="button">
							Add User <i className="fa fa-user-plus"></i>
						</ButtonComponent>
					</form>
				</div>
		</div>
	</>)
}
