import React from 'react';
import './InputComponent.css';

function InputComponent(props)
{
	
	const {name,placeholder,value,type,onChange,iconClass,inputRef}=props
	console.log(`rendering InputComponent ${name}`)
	return(
		<div className="form-input">
			 <span><i className={iconClass}></i></span>
			<input name={name} placeholder={placeholder} onChange={onChange}  value={value} type={type}ref={inputRef}required />
		</div>
	);
}

export default React.memo(InputComponent)
