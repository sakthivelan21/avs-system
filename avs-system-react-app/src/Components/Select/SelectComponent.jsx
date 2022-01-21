import React from 'react';
import './SelectComponent.css';
function SelectComponent(props)
{
	const {options,name,onChange}=props
	console.log('rendering select component');
	return(
			<div className="select-container">
				<select name={name}  onChange={onChange} required className="select-tag"> 
					{
						options.map((option,index)=>(
							<option key={index} value={option[0]}>{option[1]}</option>
						))
					}
				</select>
			</div>
	)
}

export default React.memo(SelectComponent);
