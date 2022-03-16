import React,{useReducer,useEffect,useState} from 'react';
import './HomePageComponent.css';
import NavBarComponent from '../../Components/NavBar/NavBarComponent';
import VideoPlayerComponent from '../../Components/VideoPlayer/VideoPlayerComponent';
import FloatingVideoPlayerComponent from '../../Components/FloatingVideoPlayer/FloatingVideoPlayerComponent';
import { getAllCameras} from "../../utils/Request.js";

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
	
	const [cameraDetails,setCameraDetails] = useState([]);
	/*
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
	*/
	const showFloatingVideoPlayer=(cameraDetail)=>
	{
		const floatingVideoPlayerDetails={
			'cameraDetails':cameraDetail,
			'cameraDisplayState':true
		};
		console.log('showing camera');
		floatingVideoPlayerDetailsFunction(floatingVideoPlayerDetails);
	}
	
	// fetching the data from the server while component mount
	useEffect(()=>{
		getAllCameras().then(
			(responseData) =>{
				console.log(responseData);
				setCameraDetails(responseData.allCameras );
			}
		).catch(
			(error) =>{
				console.log(error);
				console.log('error occured at fetching camera details');
			}
		);		

	},[]);
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
					(cameraDetails.length>0)?
					cameraDetails.map((cameraDetail,index)=>{
						return(
							<VideoPlayerComponent
								key={index}
								cameraName={cameraDetail.name}
								videoLink={'./video.mp4'}
								clickHandler={()=>showFloatingVideoPlayer(cameraDetail)}
							/>
						);
					}):
					<p className="home-info">Add New Camers in Settings Option to view them</p>
				}
			</div>
		</>)
}
export default React.memo(HomePageComponent);
