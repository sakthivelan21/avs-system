import React from 'react';
import './SettingsPageComponent.css';
import NavBarComponent from '../../Components/NavBar/NavBarComponent';
import {Outlet} from 'react-router-dom';
export default function SettingsPageComponent()
{
	return (
		<>
			<NavBarComponent/>
			<div id="settings-page-container">
				<div id="settings-nav-bar">
					<p>Settings</p>
					<p>Account Profile</p>
					<p>Existing Users</p>
					<p>Existing Camera Details</p>
				</div>
				<div id="settings-inner-components">
					<Outlet/>
				</div>
			</div>
		</>)
}
