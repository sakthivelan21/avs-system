import React,{useEffect,useState,useCallback} from 'react';
import './ExistingCamerasComponent.css';
import TableComponent from '../Table/TableComponent';
import { getAllCameras} from "../../utils/Request.js";
function ExistingCamerasComponent()
{
	const [cameraDetails,setCameraDetails] = useState([]);
	
	const tableDetails={
		"tableHeadings":[
		"Id",
		"Name",
		"location",
		"Action"
		],
		"actionEditLink":"/settings/edit-existing-camera",
		"tableType":"camera"
	};
	
	const fetchCameraDetails=useCallback( ()=>
	{
		getAllCameras().then(
			(responseData) =>{
				console.log(responseData);
				setCameraDetails(responseData.allCameras);
			}
		).catch(
			(error) =>{
				console.log(error);
				console.log('error occured at fetching camera details');
			}
		);		
	},[]);
	
	// fetching the data from the server while component mount
	useEffect(()=>{
		fetchCameraDetails();
	},[fetchCameraDetails]);
	
	return(
		<div id="existing-cameras-component">
			<p className="title"> <span><i className="fas fa-user-edit"></i></span> Existing Cameras</p>
			{
				(cameraDetails.length>0)?
				<TableComponent tableDetails={tableDetails} tableRowDetails={cameraDetails} updateTableDetails={()=>fetchCameraDetails()}/>:
				<p className="detailed-info">  Add New Camera To see the Camera Details </p>
			}
		</div>
	);
}

export default React.memo(ExistingCamerasComponent);
