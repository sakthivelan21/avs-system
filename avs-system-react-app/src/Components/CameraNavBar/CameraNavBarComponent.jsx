import React from 'react';
import ButtonComponent from '../Button/ButtonComponent';
import {useAuth} from '../Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import './CameraNavBarComponent.css';
function CameraNavBarComponent(){
    const auth = useAuth();
	const navigate = useNavigate();
	
	const logOutHandler=()=>{
		
		console.log('logout');
		auth.logout();
		navigate("/camera-login");
	}
    return (
        <div className="nav-bar-component">
			<div className="nav-body">
				<div className="camera-nav-header">
						<p className="camera-nav-bar-title"><i className="fas fa-video"></i> AVS-SYSTEM</p>	
					    <ButtonComponent 
                            classProp="nav-button" 
                            clickHandler={logOutHandler}>
                                Log out <i className="fa fa-sign-out-alt pr-1"></i>
                        </ButtonComponent>
				</div>
			</div>
		</div>
    )
}

export default React.memo(CameraNavBarComponent);