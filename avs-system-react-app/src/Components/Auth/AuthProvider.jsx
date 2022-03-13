import React,{useContext} from 'react';

const AuthContext = React.createContext(null);

export const AuthProvider = ({children})=>
{
	
	
	const login =  (authToken) => {
		sessionStorage.setItem("authToken",authToken);
	}
	
	const logout = () => {
		sessionStorage.clear();
	}
	
	return (
		<AuthContext.Provider value={{login,logout}}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () =>  useContext(AuthContext);

