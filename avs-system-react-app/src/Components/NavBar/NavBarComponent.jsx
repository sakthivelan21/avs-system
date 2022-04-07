import React,{useState} from 'react';
import './NavBarComponent.css';
import { NavLink,Link,useNavigate} from 'react-router-dom';
import ButtonComponent from '../Button/ButtonComponent';
import {useAuth} from '../Auth/AuthProvider';
function NavBarComponent()
{
	const [navMidSectionState,setNavMidSectionState]=useState(false);
	
	const setNavMidSection=(state)=>
	{
		setNavMidSectionState(state);
	}
	
	const auth = useAuth();
	const navigate = useNavigate();
	
	const logOutHandler=()=>{
		
		console.log('logout');
		auth.logout();
		navigate("/")
	}
	
	console.log("Rendering nav bar component");
	return(
		<div className="nav-bar-component">
			<div className="nav-body">
				<div className="nav-header">
					<Link to="/home" className="title-link">
						<p className="nav-bar-title"><i className="fas fa-video"></i> AVS-SYSTEM</p>
					</Link>
					<button className="nav-button-ham" onClick={()=>setNavMidSection(!navMidSectionState)}><i className="fas fa-bars"></i></button>
					
				</div>
				<div className={(navMidSectionState)?"nav-mid-section show-nav-mid-section" :"nav-mid-section" }>
					<nav className="nav-bar-links">
						<NavLink className="nav-item" to="/home">  <i className="fa fa-home" aria-hidden="true"></i> Home</NavLink>
						<NavLink className="nav-item" to="/add-user">  <i className="fa fa-user-plus" aria-hidden="true"></i> Add New User</NavLink>
						<NavLink className="nav-item" to="/settings">  <i className="fas fa-cog"></i> Settings</NavLink>
					</nav>
					<ButtonComponent classProp="nav-button" clickHandler={logOutHandler}>Log out <i className="fa fa-sign-out-alt pr-1"></i></ButtonComponent>
				</div>
			</div>
		</div>
	)
}

export default React.memo(NavBarComponent);
