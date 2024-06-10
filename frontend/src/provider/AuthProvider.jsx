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

    const signup = async(userData, {setPopupVisibility, setShowSuccessMessage}) => {
        fetch('https://foodjournal20-production.up.railway.app/api/v1/auth/create_user', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(async (response) => {
            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.detail.includes('User')) {
                setUserNameErrorMessage(errorData.detail);
                } else if (errorData.detail.includes('Email') || errorData.detail.includes('Invalid email')) {
                setEmailErrorMessage(errorData.detail);
                }
                throw new Error(errorData.detail || 'Network response was not ok');
            }
            setShowSuccessMessage(true);
            setPopupVisibility(true);
            setTimeout(() => {
                setPopupVisibility(false);
                setShowSuccessMessage(false);
                navigate('/signin');
            }, 3000);
            })
            .catch((error) => {
            console.error('Error creating user:', error);
            });
    };

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
            
            Cookies.set('userId', data.user_id, { expires: 1, secure: true, sameSite: 'Strict' });
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
        <AuthContext.Provider value={{ isAuthenticated, signin, signup, accessToken, user, getUser, isLoading, setIsLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

