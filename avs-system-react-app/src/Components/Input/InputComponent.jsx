import React from 'react';
import './InputComponent.css';

function InputComponent(props)
{
	
	const {name,placeholder,value,type,onChange,iconClass,inputRef,extraConditions}=props
	console.log(`rendering InputComponent ${name}`)
	return(
		<div className="form-input">
			 { (iconClass!=='')&& <span><i className={iconClass}></i></span>}
			<input {...extraConditions} name={name} placeholder={placeholder} onChange={onChange}  value={value} type={type} ref={inputRef}  required />
			
		</div>
	);
}

export default React.memo(InputComponent)
