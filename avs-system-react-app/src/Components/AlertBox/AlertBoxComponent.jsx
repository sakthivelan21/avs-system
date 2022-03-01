import React,{useEffect,useCallback} from 'react';
import './AlertBoxComponent.css';
import ButtonComponent from '../Button/ButtonComponent';

function AlertBoxComponent(props)
{
	
	
	const {alertBoxDetails,alertBoxDisplayState,alertBoxHandler} = props;
	
	const closeAlertBox = useCallback(
		()=>{
		const initialAlertBoxValue={
			'alertBoxDetails':{},
			'alertBoxDisplayState':false
		};
		alertBoxHandler(initialAlertBoxValue);
		},
	[alertBoxHandler]);
	
	const updateAlertBox=()=>
	{	
		alertBoxDetails.alertBox.buttonState=true;
		alertBoxHandler(alertBoxDetails);
	}	
	useEffect(()=>{
		if(alertBoxDetails && Object.keys(alertBoxDetails).length!==0)
		{
			//setDisplayState(alertBoxDisplayState);
			
			if(alertBoxDetails.duration && alertBoxDetails.duration!==0)
				setInterval(closeAlertBox,alertBoxDetails.duration);
		}
		
	},[alertBoxDetails,alertBoxDisplayState,closeAlertBox]);
	
	
	
	return(
		<div id="alert-box-component" className={(alertBoxDisplayState)?"show-alert-box":"hide-alert-box"}>
			{
			(alertBoxDetails && Object.keys(alertBoxDetails).length!==0) &&
			(
				<div className="alert-dialog-box">
					<p className="alert-title">{alertBoxDetails.alertTitle}</p>
					<p className="alert-text">{alertBoxDetails.alertText}</p>
					{
					(alertBoxDetails.alertBox.type==="normal")?

					<div className="alert-button-div">
						<ButtonComponent 
							type="normal" 
							classProp="alert-button" 
							clickHandler={closeAlertBox}>
							{alertBoxDetails.alertBox.buttonText}
						</ButtonComponent>
					</div> :
					
					<div className="alert-button-div">
						<ButtonComponent 
							type="normal" 
							classProp="alert-button"
							clickHandler={closeAlertBox}>
							{alertBoxDetails.alertBox.cancelButtonText}
						</ButtonComponent>
						<ButtonComponent 
							type="normal" 
							clickHandler={updateAlertBox}
							classProp="alert-button">
							{alertBoxDetails.alertBox.confirmButtonText}
						</ButtonComponent>
					</div>
					}
				</div>
			)
			}
		</div>
	);
}

export default React.memo(AlertBoxComponent);
