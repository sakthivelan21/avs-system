import React from 'react';
import './ButtonComponent.css';
function ButtonComponent(props)
{
	const {type,children,clickHandler}=props;
	console.log(`rendering button ${props.children}`);
	return(
		(type==='submit') ? 
			<button type={type} className="button">{children}</button> :
			<button className="button"onClick={clickHandler}>{children}</button>
			
	)
	
}

export default React.memo(ButtonComponent);
