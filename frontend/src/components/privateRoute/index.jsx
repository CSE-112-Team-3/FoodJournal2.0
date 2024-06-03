import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../provider/AuthProvider.jsx';
import 'ldrs/tailspin'


export default function PrivateRoute() {
    const { isAuthenticated, isLoading } = useAuth();
    if(isLoading) {
        return <l-tailspin
            size="50"
            stroke="6"
            speed="0.9"
            color="black" 
        />
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}

