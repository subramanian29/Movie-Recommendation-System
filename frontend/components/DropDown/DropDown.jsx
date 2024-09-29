import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function DropDown() {
    const navigate= useNavigate()
    const {isLoggedIn, setIsLoggedIn}= useAuth();
    async function handleClick(){
        const loggedout= await fetch("http://localhost:5000/logout",{
          method:"GET",
          headers:{
                  "Content-Type": "application/json",
          },
          credentials:'include',
          });
    
          setIsLoggedIn(false);
          navigate("/");
          window.location.reload()
      }
    return (
        <div className="dropdown me-5">
        <button
            style={{ border: "none", background: "transparent" }}
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            <FontAwesomeIcon icon={faUserCircle} size="2x" className="profile-icon" />
        </button>
        <ul className="dropdown-menu dropdown-menu-start " aria-labelledby="dropdownMenuButton" style={{ marginLeft: '-90%' }}>
            <h6 className="dropdown-header">{isLoggedIn?(isLoggedIn):"none"}</h6>
            <li><button className="btn dropdown-item" onClick={()=>{navigate("/watchlist")}}>Watchlist</button></li>
            <li><button id="logout" className="btn dropdown-item" onClick={handleClick} >Logout</button></li>
        </ul>
        </div>
    );
}
