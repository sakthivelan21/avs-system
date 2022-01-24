import React from 'react';
import './AccountDetailsComponent.css';
import {Link} from 'react-router-dom';
function AccountDetailsComponent()
{
	return(
			<div id="account-details-component">
				<p className="title"> <span><i className="fas fa-user-circle"></i></span> Account Details</p>
				<div className="edit-button">
					<Link to="/settings/edit-profile"><button>Edit <i className="fas fa-user-edit"></i></button></Link>
				</div>
				<img src="./login-user.png" className="user-image" alt="user-img"/>
				
				<div className="account-details">
					<table>
						<tbody>
							<tr>
								<td className="account-details-common-td">Your Name</td>
								<td className="account-details-common-td">:</td>
								<td className="account-details-td">sakthi</td>
							</tr>
							<tr>
								<td className="account-details-common-td">Your Organisation Name</td>
								<td className="account-details-common-td">:</td>
								<td className="account-details-td">LCD Technologies</td>
							</tr>
							<tr>
								<td className="account-details-common-td">You User Name</td>
								<td className="account-details-common-td">:</td>
								<td className="account-details-td">sakthi</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
	);
}

export default React.memo(AccountDetailsComponent);
