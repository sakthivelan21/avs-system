import React from 'react';
import './SettingsPageComponent.css';
import NavBarComponent from '../../Components/NavBar/NavBarComponent';
import {Outlet} from 'react-router-dom';
import { NavLink,Link} from 'react-router-dom';
export default function SettingsPageComponent()
{
	return (
		<>
			<NavBarComponent/>
			<div id="settings-page-container">
				<div id="settings-nav-bar">
					<p className="setting-nav-heading"><i className="fas fa-cog"></i> Settings</p>
					<Link to="/settings" className="setting-nav-link">Account Profile</Link>
					<Link to="existing-users" className="setting-nav-link">Existing Users</Link>
					<Link to="existing-cameras" className="setting-nav-link">Existing Camera Details</Link>
				</div>
				<div id="settings-inner-components">
					<Outlet/>
				</div>
			</div>
		</>)
}
