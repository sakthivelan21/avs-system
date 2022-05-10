import React,{useRef,useEffect,useState} from 'react';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import CameraNavBarComponent from '../../Components/CameraNavBar/CameraNavBarComponent';
import './CameraHomePageComponent.css';
import Peer from 'peerjs';

function CameraHomePageComponent()
{
    const webcamRef = useRef(null);
    const [mediaStream, setMediaStream] = useState(null);
    const [peer,setPeer]=useState(null);
    const stopCamera= ()=>{
        if(mediaStream!=null)
            mediaStream.getTracks().forEach(track => {
                track.stop();
            });
        else
        {
           console.log( 'media stream is null');
        }
        console.log('cleared camera');
        
    }

    useEffect(()=>{
        console.log('redering camera home page');
        const peer = new Peer('camera-peer');
        peer.on('open', function (id) {
          // Workaround for peer.reconnect deleting previous id
          if (peer.id === null) {
              console.log('Received null id from peer open');
          }
          setPeer(peer); 
          console.log('ID: ' + peer.id);
        });
        navigator.mediaDevices
        .getUserMedia({ video: { audio:false,facingMode:'environment' } })
        .then(stream => {
            setMediaStream(stream);
            let video = webcamRef.current;
            video.srcObject = stream;
            video.play();
            const call = peer.call('home-peer',stream);
        })
        .catch(err => {
            console.error("error:", err);
        });

        return ()=> {
            stopCamera();   
        };
    },[]);
    return(
        <>
            <CameraNavBarComponent/>
            <div className='camera-home-page'>
                <h3 className='camera-home-page-heading'>Camera Home Page</h3>
                 <div className='camera-video-feed-container'>
                     <video 
                        className='camera-video-feed' 
                        ref={webcamRef} 
                        autoPlay muted></video>
                 </div>
                <ButtonComponent
                    classProp="button"
                    type="button"
                    clickHandler={()=>stopCamera()}            
                 >
                    Stop Camera
                </ButtonComponent>
            </div>
        </>
    );
}

export default React.memo(CameraHomePageComponent);