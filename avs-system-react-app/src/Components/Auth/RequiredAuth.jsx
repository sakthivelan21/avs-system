import {Navigate,useLocation} from 'react-router-dom';


export const RequiredAuth = ({children}) =>
{
	const location = useLocation();
	
	if(!sessionStorage.getItem("authToken"))
	{
		console.log('redirecting to login');
		return <Navigate to='/' state={{ path: location.pathname }} />
	}
	return children;
}
