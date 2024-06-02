import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true);
            setAccessToken(token);
            // console.log('token: ', token);
        }
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, accessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

