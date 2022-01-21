import React from 'react';
import './ButtonComponent.css';
function ButtonComponent(props)
{
	const {type,children,clickHandler,classProp}=props;
	console.log(`rendering button ${props.children}`);
	return(
		(type==='submit') ? 
			<button type={type} className={classProp}>{children}</button> :
			<button className={classProp} onClick={clickHandler}>{children}</button>
			
	)
	
}

export default React.memo(ButtonComponent);
