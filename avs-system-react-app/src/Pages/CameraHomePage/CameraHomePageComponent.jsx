import React,{useRef,useEffect} from 'react';
import CameraNavBarComponent from '../../Components/CameraNavBar/CameraNavBarComponent';
import './CameraHomePageComponent.css';
import * as faceapi from 'face-api.js';
import {getAllUserNameAndUrl} from '../../utils/Request';

function CameraHomePageComponent()
{
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    let interval;
    const getWebcam=()=>{
        navigator.mediaDevices
            .getUserMedia({ video: { audio:false,facingMode:'environment' } })
            .then(stream => {
                let video = webcamRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error("error:", err);
            });
    };
    const startDetection= ()=>{
       canvasRef.current.innerHtml =  faceapi.createCanvasFromMedia(webcamRef.current);
       const displaySize = {width : webcamRef.current.clientWidth ,height : webcamRef.current.clientHeight};
        faceapi.matchDimensions(canvasRef.current,displaySize);
       interval = setInterval(async ()=>{
           const detections = await  faceapi.detectAllFaces(webcamRef.current,new faceapi.TinyFaceDetectorOptions());
           console.log(detections);
           const resizedDetections = faceapi.resizeResults(detections,displaySize);
           canvasRef.current.getContext('2d').clearRect(0,0,canvasRef.current.width,canvasRef.current.height);

           faceapi.draw.drawDetections(canvasRef.current,resizedDetections);
       },100);
    }

    // const getImageDetails = async () => {
    //     getAllUserNameAndUrl()
    //         .then(
    //             (responseData) => {
    //                 console.log(responseData.allUserNameAndUrl);
    //                 return Promise.all(
    //                     responseData.allUserNameAndUrl.map( async (data)=>{
    
    //                         const img = await faceapi.fetchImage(data.userImageUrl);
    //                         const detections = await  faceapi.detectSingleFace(img)
    //                             .withFaceLandmarks().withFaceDescriptor();
    //                         console.log(detections);
    //                         return new faceapi.LabeledFaceDescriptors(data.name, [detections.descriptor]);

    //                     })
    //                 )
    //             }
    //         )
    //     .catch(
    //         (error) =>console.log(error.response.data.message)
    //     )
    // }

    useEffect(()=>{
        
        Promise.all(
            [
                faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
                faceapi.nets.faceRecognitionNet.loadFromUri('./models')
                //faceapi.nets.ssdMobilenetv1.loadFromUri('./models')
            ]
        )
            .then(getWebcam)
            .catch((e) => console.log(e));
        
        console.log('module loaded successfully')
        return ()=> clearInterval(interval);
    },[interval]);
    return(
        <>
            <CameraNavBarComponent/>
            <div className='camera-home-page'>
                <h3 className='camera-home-page-heading'>Camera Home Page</h3>
                 <div className='camera-video-feed-container'>
                     <video 
                        className='camera-video-feed' 
                        ref={webcamRef} 
                        onPlaying = {startDetection}
                        autoPlay muted></video>
                     <canvas className='canvas' ref={canvasRef}/>
                 </div>
                 
            </div>
        </>
    );
}

export default React.memo(CameraHomePageComponent);