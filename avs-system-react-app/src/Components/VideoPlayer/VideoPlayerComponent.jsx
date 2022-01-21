import React from 'react';
import './VideoPlayerComponent.css';

function VideoPlayerComponent(props)
{
	const {cameraName,videoLink}=props
	
	console.log(`redering video player ${cameraName}`)
	return(
		<div className="camera-container">
			<div className="camera-details">
				<p className="camera-name"><i className="fas fa-video"></i> {cameraName}</p>
			</div>
			
			<video className="camera-video"  controls autoPlay loop>
			  <source src={videoLink} type="video/mp4" />
			  Your browser does not support the video tag.
			</video>
		</div>);
}

export default React.memo(VideoPlayerComponent);
