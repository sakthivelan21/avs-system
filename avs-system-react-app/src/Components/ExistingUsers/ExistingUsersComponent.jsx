import React,{useState,useEffect,useCallback} from 'react';
import './ExistingUsersComponent.css';
import { getAllUsers} from "../../utils/Request.js";
import TableComponent from '../Table/TableComponent';

function ExistingUsersComponent()
{
	const [userDetails,setUserDetails] = useState([]);
	const tableDetails={
		"tableHeadings":[
		"Id",
		"Name",
		"Worker Type",
		"Designation",
		"Actions"],
		"actionEditLink":"/settings/edit-existing-user",
		"tableType":"userDetails"
	};
	
	const fetchUserDetails=useCallback( ()=>
	{
		getAllUsers().then(
			(responseData) =>{
				console.log(responseData);
				setUserDetails(responseData.allUsers );
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
		fetchUserDetails();	
	},[fetchUserDetails]);
	
	return(
		<div id="existing-users-component">
			<p className="title"> <span><i className="fas fa-user-edit"></i></span> Existing users</p>
			{
				(userDetails.length>0)?
				<TableComponent tableDetails={tableDetails} tableRowDetails={userDetails} updateTableDetails={()=>fetchUserDetails()}/>:
				<p className="detailed-info">  Add New User To see the User Details </p>
			}
		</div>
	);
	
}

export default React.memo(ExistingUsersComponent);
