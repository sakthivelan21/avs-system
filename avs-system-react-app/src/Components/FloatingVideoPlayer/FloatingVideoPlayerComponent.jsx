import React from 'react';
import './FloatingVideoPlayerComponent.css';
import ButtonComponent from '../Button/ButtonComponent';
function FloatingVideoPlayerComponent()
{
	let cameraName="camera1";
	let videoLink="/video.mp4";
	return(
		<div id="floating-video-player-component">
			<div className="floating-video-holder">
				<div className="floating-video-camera-details">
					<p className="video-camera-name"><i className="fas fa-video"></i> {cameraName}</p>
					<ButtonComponent
						type="video-closer"
						classProp="close-video-button"><i className="fas fa-window-close"></i></ButtonComponent>
				</div>
				
				<video className="floating-video-player"  controls autoPlay loop>
				  <source src={videoLink} type="video/mp4" />
				  Your browser does not support the video tag.
				</video>
			</div>
		</div>
	)
}

export default React.memo(FloatingVideoPlayerComponent);
