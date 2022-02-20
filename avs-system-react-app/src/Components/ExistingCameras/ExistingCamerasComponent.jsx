import React from 'react';
import './ExistingCamerasComponent.css';
import TableComponent from '../Table/TableComponent';

function ExistingCamerasComponent()
{
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
	const tableRowDetails=[
		{
			"id":1,
			"name":"Camera 1",
			"location":"main hall",
			"password":"camera"
			
		}
	]
	return(
		<div id="existing-cameras-component">
			<p className="title"> <span><i className="fas fa-user-edit"></i></span> Existing Cameras</p>
			<TableComponent tableDetails={tableDetails} tableRowDetails={tableRowDetails}/>
		</div>
	);
}

export default React.memo(ExistingCamerasComponent);
