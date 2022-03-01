import React from 'react';
import './HomePageComponent.css';
import NavBarComponent from '../../Components/NavBar/NavBarComponent';
import VideoPlayerComponent from '../../Components/VideoPlayer/VideoPlayerComponent';
import FloatingVideoPlayerComponent from '../../Components/FloatingVideoPlayer/FloatingVideoPlayerComponent';
function HomePageComponent()
{
	const cameraDetails=[
		{
			cameraName:'Camera 1',
			videoLink:'./video.mp4'
		},
		{
			cameraName:'Camera 2',
			videoLink:'./video.mp4'
		},
		{
			cameraName:'Camera 3',
			videoLink:'./video.mp4'
		},
		{
			cameraName:'Camera 4',
			videoLink:'./video.mp4'
		}
		
	];
	return(
		<>
			<FloatingVideoPlayerComponent/>
			<NavBarComponent/>
			<div id="home-page">
				{
					cameraDetails.map((cameraDetail,index)=>{
						return(
							<VideoPlayerComponent
								key={index}
								cameraName={cameraDetail.cameraName}
								videoLink={cameraDetail.videoLink}
							/>
						);
					})
				}
			</div>
		</>)
}
export default React.memo(HomePageComponent);
