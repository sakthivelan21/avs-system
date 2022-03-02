import React,{useReducer} from 'react';
import './HomePageComponent.css';
import NavBarComponent from '../../Components/NavBar/NavBarComponent';
import VideoPlayerComponent from '../../Components/VideoPlayer/VideoPlayerComponent';
import FloatingVideoPlayerComponent from '../../Components/FloatingVideoPlayer/FloatingVideoPlayerComponent';


const initialFloatingVideoPlayerObject={
	'cameraDetails':{},
	'cameraDisplayState':false
}

const floatingVideoPlayerReducerFunction=
(previousFloatingVideoPlayerObject,currentFloatingVideoPlayerObject) =>
{
	console.log('changing the alertbox state');
	return currentFloatingVideoPlayerObject;
}

function HomePageComponent()
{
	const [floatingVideoPlayerObject,floatingVideoPlayerDetailsFunction]= useReducer(floatingVideoPlayerReducerFunction,initialFloatingVideoPlayerObject);
	
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
	const showFloatingVideoPlayer=(cameraDetail)=>
	{
		const floatingVideoPlayerDetails={
			'cameraDetails':cameraDetail,
			'cameraDisplayState':true
		};
		console.log('showing camera');
		floatingVideoPlayerDetailsFunction(floatingVideoPlayerDetails);
	}
	return(
		<>
			<FloatingVideoPlayerComponent
			cameraDetails={floatingVideoPlayerObject.cameraDetails}
			floatingVideoPlayerDisplayState={floatingVideoPlayerObject.cameraDisplayState}
			floatingVideoHandler={floatingVideoPlayerDetailsFunction}
			/>
			<NavBarComponent/>
			<div id="home-page">
				{
					cameraDetails.map((cameraDetail,index)=>{
						return(
							<VideoPlayerComponent
								key={index}
								cameraName={cameraDetail.cameraName}
								videoLink={cameraDetail.videoLink}
								clickHandler={()=>showFloatingVideoPlayer(cameraDetail)}
							/>
						);
					})
				}
			</div>
		</>)
}
export default React.memo(HomePageComponent);
