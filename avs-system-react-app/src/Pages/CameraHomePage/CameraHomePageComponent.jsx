import React,{useRef} from 'react';
import Webcam from "react-webcam";
import CameraNavBarComponent from '../../Components/CameraNavBar/CameraNavBarComponent';
import './CameraHomePageComponent.css';

function CameraHomePageComponent()
{
    const webcamRef = React.useRef(null);
    // const capture = React.useCallback(
    //     () => {
    //     const imageSrc = webcamRef.current.getScreenshot();
    //     },
    //     [webcamRef]
    // );
    return(
        <>
            <CameraNavBarComponent/>
            <div className='camera-home-page'>
                <h3 className='camera-home-page-heading'>Camera Home Page</h3>
               
                 {/* <video className='camera-video-feed' ref={videoRef}></video> */}
                 <div className='camera-video-feed-container'>
                    <Webcam className='camera-video-feed' 
                    audio={false}
                    screenshotFormat="image/jpeg"
                    ref={webcamRef}
                    />
                 </div>
                 
            </div>
        </>
    );
}

export default React.memo(CameraHomePageComponent);