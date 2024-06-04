import { Link } from 'react-router-dom';
import './Error.css'

export default function Error404() {
    return(
        <div className='center-container'>
            <div className='jockey-one-regular error-container'>
                <h1 className='error-message'>Error 404: Page not found.</h1>
                <Link className='link' to='/'>Back to Home</Link>
            </div>            
        </div>

    );
}