import React from 'react';
import './ExistingUsersComponent.css';

import TableComponent from '../Table/TableComponent';

function ExistingUsersComponent()
{
	const tableDetails={
		"tableHeadings":[
		"Id",
		"Name",
		"User Type",
		"Designation",
		"Phone No",
		"Mail Id",
		"Actions"],
		"actionEditLink":"/settings/edit-existing-user"
	};
	const tableRowDetails=[
		{
			"id":1,
			"name":"Sakthi velan",
			"userType":"Normal User",
			"designation":"Software Engineer",
			"phoneNo":1234567890,
			"mailId":"sakthi@gmail.com",
			
		}
	]
	return(
		<div id="existing-users-component">
			<p className="title"> <span><i className="fas fa-user-edit"></i></span> Existing users</p>
			<TableComponent tableDetails={tableDetails} tableRowDetails={tableRowDetails}/>
		</div>
	);
	
}

export default React.memo(ExistingUsersComponent);
