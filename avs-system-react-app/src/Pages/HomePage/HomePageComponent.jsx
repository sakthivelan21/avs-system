import React from 'react';
import './HomePageComponent.css';
import NavBarComponent from '../../Components/NavBar/NavBarComponent';
import VideoPlayerComponent from '../../Components/VideoPlayer/VideoPlayerComponent';
export default function HomePageComponent()
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
	return(<>
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
