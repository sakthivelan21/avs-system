import React,{useEffect,useReducer} from 'react';
import './AccountDetailsComponent.css';
import {Link} from 'react-router-dom';
import { getProfileDetails} from "../../utils/Request.js";


const initialValue={
	name:'',
	organisationName:'',
	username:''
}

const reducerFunction=(previousObject,currentObject)=>{
	return currentObject;
}

function AccountDetailsComponent()
{
	const [userProfileDetails,updateUserProfileDetailsFunction]=useReducer(reducerFunction,initialValue);
	
	const {name,organisationName,username}=userProfileDetails
	
	
	// fetching the data from the server while component mount
	useEffect(()=>{
		getProfileDetails().then(
			(responseData) =>{
				console.log(responseData);
				updateUserProfileDetailsFunction(responseData);
			}
		).catch(
			(error) =>{
				console.log(error);
				console.log('error occured at fetching user details');
			}
		);	
	},[updateUserProfileDetailsFunction]);
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
								<td className="account-details-td">{ name}</td>
							</tr>
							<tr>
								<td className="account-details-common-td">Your Organisation Name</td>
								<td className="account-details-common-td">:</td>
								<td className="account-details-td">{organisationName}</td>
							</tr>
							<tr>
								<td className="account-details-common-td">You User Name</td>
								<td className="account-details-common-td">:</td>
								<td className="account-details-td">{username}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
	);
}

export default React.memo(AccountDetailsComponent);
