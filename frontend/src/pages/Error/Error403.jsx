import { Link } from 'react-router-dom';
import './Error.css'

export default function Error403() {
    return(
        <div className='center-container'>
            <div className='jockey-one-regular error-container'>
                <h1 className='error-page-message'>Error 403: You are not authorized to access this page.</h1>
                <Link className='link' to='/'>Back to Home</Link>
            </div>            
        </div>

    );
}