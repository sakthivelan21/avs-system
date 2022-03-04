import React,{useEffect} from 'react';
import './AlertBoxComponent.css';
import ButtonComponent from '../Button/ButtonComponent';

function AlertBoxComponent(props)
{
	
	
	const {alertBoxDetails,onSubmit,onClose} = props;

	
	useEffect(()=>{
		
			if(alertBoxDetails.duration && alertBoxDetails.duration!==0 && 
					alertBoxDetails.alertBox.type!=='choice')
				setInterval(onClose,alertBoxDetails.duration);
		
	},[alertBoxDetails,onClose]);
	
	
	
	return(
		<div id="alert-box-component" className={(alertBoxDetails.alertBoxDisplayState)?"show-alert-box":"hide-alert-box"}>
			{
			(alertBoxDetails.alertBoxDisplayState) &&
			(
				<div className="alert-dialog-box">
					<p className="alert-title">{alertBoxDetails.alertTitle}</p>
					<p className="alert-text">{alertBoxDetails.alertText}</p>
					
					
					<div className="alert-button-div">
						{
						
						 (alertBoxDetails.alertBox.type==='choice')?
						 	(
							 	<>
									<ButtonComponent 
										type="normal" 
										classProp="alert-button"
										clickHandler={onClose}>
										{alertBoxDetails.alertBox.cancelButtonText}
									</ButtonComponent>
									
								
									<ButtonComponent 
										type="normal" 
										clickHandler={onSubmit}
										classProp="alert-button">
										{alertBoxDetails.alertBox.okButtonText}
									</ButtonComponent>
								</>
							):
							(
								<ButtonComponent 
									type="normal" 
									classProp="alert-button"
									clickHandler={onClose}>
									{alertBoxDetails.alertBox.okButtonText}
								</ButtonComponent>
							)
							
						}
					</div>
				</div>
			)
			}
		</div>
	);
}

export default React.memo(AlertBoxComponent);
