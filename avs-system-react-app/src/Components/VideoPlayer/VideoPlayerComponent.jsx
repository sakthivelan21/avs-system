import React from 'react';
import './VideoPlayerComponent.css';
import ButtonComponent from '../Button/ButtonComponent';

function VideoPlayerComponent(props)
{
	const {cameraName,videoLink,clickHandler}=props
	
	console.log(`redering video player ${cameraName}`)
	return(
		<div className="camera-container" onClick={clickHandler}>
			<div className="camera-details">
				<p className="camera-name"><i className="fas fa-video"></i> {cameraName}</p>
				<ButtonComponent 
					classProp={"expand-video-button"}
					clickHandler={clickHandler}>
					<i className="fas fa-expand"></i>
				</ButtonComponent>
			</div>
			
			<video className="camera-video"  controls autoPlay loop>
			  <source src={videoLink} type="video/mp4" />
			  Your browser does not support the video tag.
			</video>
		</div>);
}

export default React.memo(VideoPlayerComponent);
