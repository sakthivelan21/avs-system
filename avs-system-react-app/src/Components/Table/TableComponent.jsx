import React from 'react';
import './TableComponent.css';
import ButtonComponent from '../Button/ButtonComponent';
import {useNavigate} from 'react-router-dom';
import {AlertBox} from '../../App';
import { deleteCameraById ,deleteUserById} from '../../utils/Request.js';
function TableComponent(props)
{
	const {tableDetails,tableRowDetails,updateTableDetails}=props;
	const navigate=useNavigate();
	
	const alertBox = AlertBox();
	
	const alertMessageHandler=(title,message)=>
	{
		let alertDetailsObject=
		   {
			'alertTitle':title,
			'alertText':message,
			'alertBox':{
					'type':'alert',
					'cancelButtonText':'',
					'okButtonText':'Ok',
					'buttonState':false
				},
			'duration':3000,
			'alertBoxDisplayState':true
			};
	 		
	 	alertBox(alertDetailsObject)
	 		.then(()=>console.log('alertbox is closed'))
	 		.catch(()=>console.log('closing the alert box'));
	}
	
	const deleteUser = (userId)=> {
	 	
	 	let alertDetailsObject=
			{
			'alertTitle':'Do you want to remove the User ?',
			'alertText':'user will be removed from the database...',
			'alertBox':{
					'type':'choice',
					'cancelButtonText':'Cancel',
					'okButtonText':'Remove',
					'buttonState':false
				},
			'duration':0,
			'alertBoxDisplayState':true
			};
	 		
	 	alertBox(alertDetailsObject)
			.then(()=>{
				console.log('alertbox delete user triggered');
				deleteUserById(userId).then(
					(responseData) =>{
						console.log(responseData);
						alertMessageHandler(responseData.message,"please check the exisiting user table removed");
						updateTableDetails();
					}
				).catch(
					(error) =>{
						console.log(error);
						alertMessageHandler(error.response.message,"please try again after some time");
					}
				);	
				
			})
			.catch(()=>console.log('alertbox cancel delete user triggered'));
	 };
	
	const deleteCamera = (cameraId) => { 
		
		let alertDetailsObject=
			{
				'alertTitle':'Do you want to remove the Camera ?',
				'alertText':'user will be removed from the database...',
				'alertBox':{
						'type':'choice',
						'cancelButtonText':'Cancel',
						'okButtonText':'Remove',

					},
				'duration':0,
				'alertBoxDisplayState':true
			};
		
		alertBox(alertDetailsObject)
			.then(()=>{
				console.log('alertbox delete camera triggered');
				deleteCameraById(cameraId).then(
					(responseData) =>{
						console.log(responseData);
						alertMessageHandler(responseData.message,"please check the table camera removed");
						updateTableDetails();
					}
				).catch(
					(error) =>{
						console.log(error);
						alertMessageHandler(error.response.message,"please try again after some time");
					}
				);	
				
			})
			.catch(()=>console.log('alertbox cancel delete camera triggered'));
	
	};
	
	
	// passing data to another route through react router
	const editHandler=(path)=>navigate(path);
	return(
		<div className="info-table-container">
				<table className="info-table">
					<thead>
						<tr>
							{
								tableDetails.tableHeadings.map((tableName,index)=>(
									<th key={index}>{tableName}</th>
								))
							}
						</tr>
					</thead>
					<tbody>
						{
						(tableDetails.tableType==="userDetails")?
						tableRowDetails.map((userDetail,index)=>{
							return(
							<tr key={userDetail.id}>
								<td>{index+1}</td>
								<td>{userDetail.name}</td>
								<td>{userDetail.designation}</td>
								<td>{userDetail.workerType}</td>
								<td>
									
										<ButtonComponent 
										type="table-button" 
										classProp="table-button"
										clickHandler={()=>
										editHandler(tableDetails.actionEditLink+"/"+userDetail.id)}>
											Edit <i className="fas fa-edit"></i>
										</ButtonComponent>
										<ButtonComponent 
										type="table-button" 
										classProp="table-button"
										clickHandler={()=>deleteUser(userDetail.id)}>
											Delete <i className="fas fa-solid fa-trash"></i>
										</ButtonComponent>
									
								</td>
							</tr>
							)
						})
						:
						tableRowDetails.map((cameraDetails,index)=>{
							return(
								<tr key={cameraDetails.id}>
									<td>{index+1}</td>
									<td>{cameraDetails.name}</td>
									<td>{cameraDetails.location}</td>
									<td>
									
										<ButtonComponent 
											type="table-button" 
											classProp="table-button" 	
											clickHandler={()=>
											editHandler(tableDetails.actionEditLink+"/"+cameraDetails.id)}>
											Edit <i className="fas fa-edit"></i>
										</ButtonComponent>
										<ButtonComponent 
											type="table-button" 
											classProp="table-button"
											clickHandler={()=>deleteCamera(cameraDetails.id)}>
											Remove <i className="fas fa-solid fa-trash"></i>
										</ButtonComponent>
									
								</td>
								</tr>
							)
						})
						}
					</tbody>
				</table>	
			</div>
	);
}

export default React.memo(TableComponent);
