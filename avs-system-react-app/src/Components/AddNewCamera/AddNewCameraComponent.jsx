import React,{useCallback,useEffect,useRef,useReducer} from 'react';
import './AddNewCameraComponent.css';
import InputComponent from '../Input/InputComponent';
import ButtonComponent from '../Button/ButtonComponent';

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
	
	console.log('rendering AddNewCameraComponent');
	
	
	console.log('got the data through react router');
	
	const [state,dispatchFunction]=useReducer(reducerFunction,initialValue);
	
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
