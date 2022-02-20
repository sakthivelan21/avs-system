import './EditExistingCameraComponent.css';
import React,{useCallback,useEffect,useRef,useReducer} from 'react';
import {Link,useLocation} from 'react-router-dom';
import InputComponent from '../Input/InputComponent';
import ButtonComponent from '../Button/ButtonComponent';


const reducerFunction=(state,action)=>{
	return{...state,[action.name]:action.value}
}

function EditExistingCameraComponent()
{
	
	console.log('rendering EditExistingCameraComponent');
	
	const locationHook=useLocation();
	
	console.log('got the data through react router');
	console.log(locationHook.state);
	
	const [state,dispatchFunction]=useReducer(reducerFunction,locationHook.state);
	
	const {name,location,password}=state
		
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
