import './Home.css'
import NavBar from '../../components/navbar'

export default function Home() {
    return(
        <div className="container">
            <NavBar/>
            <button className="circle-btn">+</button>
        </div>
        
    );
}