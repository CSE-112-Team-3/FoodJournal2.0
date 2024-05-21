import './Home.css'
import NavBar from '../../components/navbar'
import { Link } from 'react-router-dom'

export default function Home() {
    return(
        <div className="container">
            <NavBar/>
            <Link to="/new-review">
              <button className="circle-btn">+</button>
            </Link>
        </div>
        
    );
}