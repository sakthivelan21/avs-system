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
	const webcamRef = useRef(null);
    const canvasRef = useRef(null);
	const intervalRef  = useRef();
	const [peer,setPeer]=useState(null);
	const [cameraDetails,setCameraDetails] = useState([{name:'',location:''}]);
	const [userDetails,setUserDetails] = useState([]);
	const alertBox = AlertBox();

	const startDetection= async ()=>{
        console.log('in start detection');
        canvasRef.current.innerHtml =  faceapi.createCanvasFromMedia(webcamRef.current);
        const displaySize = {width : webcamRef.current.clientWidth ,height : webcamRef.current.clientHeight};
        const labeledFaceDescriptors = await loadedLabeledImages();
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors,0.6); 
        faceapi.matchDimensions(canvasRef.current,displaySize);
        intervalRef.current = setInterval(async ()=>{
            const detections = await  faceapi.detectAllFaces(webcamRef.current).withFaceLandmarks().withFaceDescriptors();
            console.log(detections);
            const resizedDetections = faceapi.resizeResults(detections,displaySize);
            const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));
            if(canvasRef.current!=null)
            {
                canvasRef.current.getContext('2d').clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
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
                        'alertText':'Some intruder is present in ' + cameraDetails[0].name,
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
                    drawBox.draw(canvasRef.current);
                    
                });
            }
        },300);
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
						webcamRef.current.srcObject = remoteMediaStream;
						webcamRef.current.play();
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
			clearInterval(intervalRef.current);
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
				
				<h3 className='camera-home-page-heading'>
					{cameraDetails[0].name + " - " +cameraDetails[0].location}
				</h3>
				<div className='camera-video-feed-container'>
					<video 
						className='camera-video-feed' 
						ref={webcamRef} 
						onPlaying={startDetection}
						autoPlay muted></video>
					<canvas className='canvas' ref={canvasRef}/>
				</div>
			</div>
		</>)
}
export default React.memo(HomePageComponent);
