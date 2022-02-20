import React from 'react';
import './TableComponent.css';
import ButtonComponent from '../Button/ButtonComponent';
import {useNavigate} from 'react-router-dom';
function TableComponent(props)
{
	const {tableDetails,tableRowDetails}=props;
	const navigate=useNavigate();
	// passing data to another route through react router
	const editHandler=(userDetail,path)=>
	{
		navigate(path,{state:userDetail});
	}
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
						tableRowDetails.map((userDetail)=>{
							return(
							<tr key={userDetail.id}>
								<td>{userDetail.id}</td>
								<td>{userDetail.name}</td>
								<td>{userDetail.userType}</td>
								<td>{userDetail.designation}</td>
								<td>{userDetail.phoneNo}</td>
								<td>{userDetail.mailId}</td>
								<td>
									
										<ButtonComponent type="table-button" classProp="table-button" clickHandler={()=>editHandler(userDetail,tableDetails.actionEditLink)}>
											Edit <i className="fas fa-edit"></i>
										</ButtonComponent>
										<ButtonComponent type="table-button" classProp="table-button">
											Delete <i className="fas fa-solid fa-trash"></i>
										</ButtonComponent>
									
								</td>
							</tr>
							)
						})
						:
						tableRowDetails.map((cameraDetails)=>{
							return(
								<tr key={cameraDetails.id}>
									<td>{cameraDetails.id}</td>
									<td>{cameraDetails.name}</td>
									<td>{cameraDetails.location}</td>
									<td>
									
										<ButtonComponent type="table-button" classProp="table-button" clickHandler={()=>editHandler(cameraDetails,tableDetails.actionEditLink)}>
											Edit <i className="fas fa-edit"></i>
										</ButtonComponent>
										<ButtonComponent type="table-button" classProp="table-button">
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
