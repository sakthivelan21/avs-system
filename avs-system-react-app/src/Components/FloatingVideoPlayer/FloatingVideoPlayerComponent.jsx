import React,{useCallback} from 'react';
import './FloatingVideoPlayerComponent.css';
import ButtonComponent from '../Button/ButtonComponent';
function FloatingVideoPlayerComponent(props)
{
	
	
	const {cameraDetails,floatingVideoPlayerDisplayState,floatingVideoHandler} = props;
	
	console.log('inside floating video player');
	const closeFloatingVideoPlayer =useCallback(() =>{
		const initialFloatingVideoPlayerObject={
			'cameraDetails':{},
			'cameraDisplayState':false
		};
		console.log('closing video player');
		floatingVideoHandler(initialFloatingVideoPlayerObject);
		},[floatingVideoHandler]);
	
	
	return(
		<div id="floating-video-player-component" className={(floatingVideoPlayerDisplayState)?"show-floating-video-holder":"hide-floating-video-holder"}>
		{
			(cameraDetails && Object.keys(cameraDetails).length!==0) &&
			(
			<div className="floating-video-holder">
				<div className="floating-video-camera-details">
					<p className="video-camera-name"><i className="fas fa-video"></i> {cameraDetails.cameraName}</p>
					<ButtonComponent
						type="video-closer"
						clickHandler={closeFloatingVideoPlayer}
						classProp="close-video-button">
						<i className="fas fa-window-close"></i>
				</ButtonComponent>
				</div>
				
				<video className="floating-video-player"  controls autoPlay loop>
				  <source src={/*cameraDetails.videoLink*/ "./video.mp4"} type="video/mp4" />
				  Your browser does not support the video tag.
				</video>
			</div>
		     )
		}
		</div>
		
		
	)
}

export default React.memo(FloatingVideoPlayerComponent);
