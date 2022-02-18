import React from 'react';
import './TableComponent.css';
import ButtonComponent from '../Button/ButtonComponent';
import {Link} from 'react-router-dom';
function TableComponent(props)
{
	const {tableDetails,tableRowDetails}=props;
	return(
		<div className="info-table-container">
				<table className="info-table">
					<thead>
						<tr>
							{
								tableDetails.tableHeadings.map((tableName,index)=>(
									<th key={index}>tableName</th>
								))
							}
						</tr>
					</thead>
					<tbody>
						{
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
									
										<Link to={tableDetails.actionEditLink} className="table-link-button">
										<ButtonComponent type="table-button" classProp="table-button">
											Edit <i className="fas fa-edit"></i>
										</ButtonComponent>
										</Link>
										<ButtonComponent type="table-button" classProp="table-button">
											Delete <i className="fas fa-solid fa-trash"></i>
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
