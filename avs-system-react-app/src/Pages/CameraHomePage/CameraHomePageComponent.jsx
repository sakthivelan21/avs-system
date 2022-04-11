import React,{useRef,useEffect,useState,useCallback} from 'react';
import CameraNavBarComponent from '../../Components/CameraNavBar/CameraNavBarComponent';
import './CameraHomePageComponent.css';
import * as faceapi from 'face-api.js';
import {getAllUserNameAndUrl} from '../../utils/Request';

function CameraHomePageComponent()
{
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    let interval;
    const [cameraDetails,setCameraDetails] = useState([]);
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
    //first
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

    // second
    // const startDetection= async ()=>{
    //     console.log('in start detection');
    //     canvasRef.current.innerHtml =  faceapi.createCanvasFromMedia(webcamRef.current);
    //     const displaySize = {width : webcamRef.current.clientWidth ,height : webcamRef.current.clientHeight};
    //     const labeledFaceDescriptors = await loadedLabeledImages();
    //     const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors,0.6); 
    //     faceapi.matchDimensions(canvasRef.current,displaySize);
    //     interval = setInterval(async ()=>{
    //         const detections = await  faceapi.detectAllFaces(webcamRef.current,new faceapi.TinyFaceDetectorOptions());
    //         console.log(detections);
    //         const resizedDetections = faceapi.resizeResults(detections,displaySize);
    //         const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));
    //         canvasRef.current.getContext('2d').clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
    //         results.forEach((result,i)=>{
    //             const box = resizedDetections[i].box;
    //             const drawBox = new faceapi.draw.DrawBox(box,{label:result.toString()});
    //             drawBox.draw(canvasRef.current);
                
    //         });
    //     },100);
    //  }
     //second
    //  const loadedLabeledImages = ()=>{
    //      return Promise.all(
    //          cameraDetails.allUserNameAndUrl.map( async (data)=>{
    //              const img = await faceapi.fetchImage(data.userImageUrl);
    //              const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
    //              return new faceapi.LabeledFaceDescriptors(data.name,[detections.descriptor]);
    //          })
    //      )
    //  }

    
    //second
    // const getImageDetails = useCallback(() => {
    //     getAllUserNameAndUrl().then( (responseData)=>{
    //         console.log('in getting image Details');
    //         console.log(responseData);
    //         setCameraDetails(responseData);
    //     }
    //         ).catch(
    //             (error)=>console.log(error)
    //         );
    // },[]);

    //first
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

    //second
    // useEffect(()=>{
        
    //     Promise.all(
    //         [
    //             faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    //             faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    //             faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    //             faceapi.nets.ssdMobilenetv1.loadFromUri('./models')
    //         ]
    //     )
    //         .then(()=>{
    //             getImageDetails();
    //             getWebcam();
    //         })
    //         .catch((e) => console.log(e));
        
    //     console.log('module loaded successfully')
    //     return ()=> clearInterval(interval);
    // },[interval,getImageDetails]);
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