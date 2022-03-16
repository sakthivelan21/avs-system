import React from 'react';
import './SettingsPageComponent.css';
import NavBarComponent from '../../Components/NavBar/NavBarComponent';
import {Outlet} from 'react-router-dom';
import { NavLink,useLocation} from 'react-router-dom';

export default function SettingsPageComponent()
{
	
	const location=useLocation();
	
	const navLinkList=[
		{
			'link':'/settings',
			'completeLink':'/settings',
			'content':'Account Profile'
		},
		{
			'link':'existing-users',
			'completeLink':'/settings/existing-users',
			'content':'Existing Users'
		},
		{
			'link':'existing-cameras',
			'completeLink':'/settings/existing-cameras',
			'content':'Existing Camera Details'
		},
		{
			'link':'add-new-camera',
			'completeLink':'/settings/add-new-camera',
			'content':'Add a New Camera'
		}
	];
	
	return (
		<>
			<NavBarComponent/>
			<div id="settings-page-container">
				<div id="settings-nav-bar">
					<p className="setting-nav-heading"><i className="fas fa-cog"></i> Settings</p>
					<div id="settings-nav-links">
						{
						navLinkList.map((navLink,index)=>{
						return(
						(navLink.completeLink===location.pathname)?
						<NavLink 
							key={index}
							to={navLink.link} 
							className="setting-nav-link setting-active-nav-link">
							{navLink.content}
						</NavLink>
						:
						<NavLink 
							key={index}
							to={navLink.link} 
							className="setting-nav-link">
							{navLink.content}
						</NavLink>
						);
						}
						)
						}
					</div>
				</div>
				<div id="settings-inner-components">
					<Outlet/>
				</div>
			</div>
		</>)
}
