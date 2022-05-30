import React,{useRef,useEffect,useState,useCallback} from 'react';
import './HomePageComponent.css';
import NavBarComponent from '../../Components/NavBar/NavBarComponent';
import { getAllCameras} from "../../utils/Request.js";
import Peer from 'peerjs';
import * as faceapi from 'face-api.js';
import {getAllUserNameAndUrl} from '../../utils/Request';
import { AlertBox } from '../../App';

function HomePageComponent()
{
	const intervalContainer  = useRef([]);
	const webcamRefContainer= useRef({});
	const canvasRefContainer= useRef({});
	const currentCameraIndex=useRef(0);
	const [peer,setPeer]=useState(null);
	const [cameraDetails,setCameraDetails] = useState([{name:'',location:''}]);
	const [userDetails,setUserDetails] = useState([]);
	const alertBox = AlertBox();

	const startDetection= async (currentIndex)=>{
        console.log('in start detection');
        canvasRefContainer.current[currentIndex].innerHtml =  faceapi.createCanvasFromMedia(webcamRefContainer.current[currentIndex]);
        const displaySize = {width : webcamRefContainer.current[currentIndex].clientWidth ,
			height : webcamRefContainer.current[currentIndex].clientHeight};
        const labeledFaceDescriptors = await loadedLabeledImages();
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors,0.6); 
        faceapi.matchDimensions(canvasRefContainer.current[currentIndex],displaySize);
        intervalContainer.current.push( setInterval(async ()=>{
            const detections = await  faceapi.detectAllFaces(webcamRefContainer.current[currentIndex]).withFaceLandmarks().withFaceDescriptors();
            console.log(detections);
            const resizedDetections = faceapi.resizeResults(detections,displaySize);
            const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));
            if(canvasRefContainer.current[currentIndex]!=null)
            {
                canvasRefContainer.current[currentIndex].getContext('2d').clearRect(0,0,canvasRefContainer.current[currentIndex].width,
					canvasRefContainer.current[currentIndex].height);
                console.log(results);
                results.forEach((result,i)=>{
					console.log(result.toString());
                    if(result.toString().slice(0,7) === "unknown")
                    {
						console.log(result.toString());
						console.log('unknown detected trying to alert');
                        let alertDetailsObject=
                    {
                        'alertTitle': "Intruder Alert",
                        'alertText':'Some intruder is present in ' + cameraDetails[currentIndex].name,
                        'alertBox':{
                                'type':'alert',
                                'cancelButtonText':'',
                                'okButtonText':'Ok',
                                'buttonState':false
                            },
                        'duration':2000,
                        'alertBoxDisplayState':true
                        };
                        
                    alertBox(alertDetailsObject)
                        .then(()=>console.log('alertbox is closed'))
                        .catch(()=>console.log('closing the alert box'));
                    }
                    const box = resizedDetections[i].detection.box;
                    const drawBox = new faceapi.draw.DrawBox(box,{label:result.toString()});
                    drawBox.draw(canvasRefContainer.current[currentIndex]);
                    
                });
            }
        },300));
     }
	  //second
	  const loadedLabeledImages = ()=>{
		return Promise.all(
			userDetails.allUserNameAndUrl.map( async (data)=>{
				const img = await faceapi.fetchImage(data.userImageUrl);
				const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
				return new faceapi.LabeledFaceDescriptors(data.name,[detections.descriptor]);
			})
		)
	}

   
   //second
   const getImageDetails = useCallback(() => {
	   getAllUserNameAndUrl().then( (responseData)=>{
		   console.log('in getting image Details');
		   console.log(responseData);
		   setUserDetails(responseData);
	   }
		   ).catch(
			   (error)=>console.log(error)
		   );
   },[]);

	//second
	useEffect(()=>{
			
		Promise.all(
			[
				faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
				faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
				faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
				faceapi.nets.ssdMobilenetv1.loadFromUri('./models')
			]
		)
			.then(()=>{
				const peer = new Peer('home-peer');
				peer.on('open', function (id) {
				// Workaround for peer.reconnect deleting previous id
				if (peer.id === null) {
					console.log('Received null id from peer open');
				}
				setPeer(peer); 
				console.log('ID: ' + peer.id);
				});

				peer.on('call', function(call) {
					// Answer the call, providing our mediaStream
					call.answer();
					call.on('stream', function(remoteMediaStream) {
						console.log(webcamRefContainer.current);
						console.log(canvasRefContainer.current);
						webcamRefContainer.current[currentCameraIndex.current].srcObject = remoteMediaStream;
						webcamRefContainer.current[currentCameraIndex.current].play();
						currentCameraIndex.current+=1;
						console.log('call answered');
					});
				});
				getImageDetails();
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
			})
			.catch((e) => console.log(e));
		
		console.log('module loaded successfully')
		return ()=>{
			console.log('clearing all intervals');

			for(let i=0;i<intervalContainer.current.length;i++)
				clearInterval(intervalContainer.current[i]);
			console.log('cleared all the intervals');
			if (peer) {
				peer.disconnect();
				peer.destroy();
			}
			setPeer(null);
		}
	},[getImageDetails]);
	return(
		<>
			<NavBarComponent/>
			<div id="home-page">
				{
					cameraDetails.map((cameraDetail,index)=>{
						return(
							<div key={index}>
								<h3 className='camera-home-page-heading'>
									{cameraDetail.name + " - " +cameraDetail.location}
								</h3>	
								
									<div className='camera-video-feed-container'>
										
										<video 
											className='camera-video-feed' 
											ref={ref=> webcamRefContainer.current[index] = ref} 
											onPlaying={()=>startDetection(index)}
											autoPlay muted></video>
										<canvas className='canvas' ref={ref=> canvasRefContainer.current[index] = ref}/>
									</div>
							</div>
						)
					})
				}
				
			</div>
		</>)
}
export default React.memo(HomePageComponent);
