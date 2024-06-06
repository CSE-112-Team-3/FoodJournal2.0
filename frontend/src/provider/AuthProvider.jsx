import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from  'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const base_url = "https://foodjournal20-production.up.railway.app";
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('accessToken');
        setIsAuthenticated(!!token);
        setAccessToken(token);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if(isAuthenticated && accessToken) {
            getUser(accessToken);
        }
    }, [isAuthenticated, accessToken]);

    const signin = async(username, password, {setError, setLoading}) => {
        try {
            const response = await fetch(`${base_url}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: username,
                password: password
            }).toString(),
            });
    
            if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
            }
    
            const data = await response.json();
    
            Cookies.set('accessToken', data.access_token, { expires: 1, secure: true, sameSite: 'Strict' });
            await getUser(data.access_token);
            setAccessToken(data.access_token);
            setIsAuthenticated(true);
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
            setIsAuthenticated(false);
            setError(`Failed to sign in: ${error.message}`);
        } finally {
            setLoading(false);
            setIsLoading(false);
        }
    }

    const getUser = async(token) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${base_url}/api/v1/auth/get_user?accessToken=${token}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userData = await response.json();
            setUser(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async() => {
        try {
            setIsLoading(true);
            const response = await fetch(`${base_url}/api/v1/auth/logout?accessToken=${accessToken}`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to logout');
            }

            Cookies.remove('accessToken');
            setAccessToken(null);
            setIsAuthenticated(false);
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, signin, accessToken, user, getUser, isLoading, setIsLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

