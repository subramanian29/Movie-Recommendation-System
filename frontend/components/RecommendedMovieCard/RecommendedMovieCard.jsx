import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecommendedMovieCard.css';
import UserRating from '../UserRating/UserRating';

export default function RecommendedMovieCard({ movie,watchlistClick,isMain = false, watchlistButton = false }) {
    
    const { title, posterUrl, overview, voteAverage, voteCount, _id,rating } = movie;
    
    const [hover, setHover] = useState(false);

    const[inWatchlist,setInWatchlist]=useState(false);
    const[clickButton, setClickButton]=useState(false);
    const navigate=useNavigate();
  
    watchlistButton && useEffect(()=>{ async function gt(){

        const response= await fetch("http://localhost:5000/inwatchlist",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials:'include',
            body:JSON.stringify({id:_id})
        })
        if(response){
            const data= await response.json();
            setInWatchlist(()=>data.success)
        }

    }; gt();},[clickButton])

 
    
    async function handleClick(_id) {
        const response = await fetch("http://localhost:5000/watchlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({ id: _id, remove: inWatchlist }), 
        });
        const data= await response.json();
        if(data.success)
        {
            setClickButton(prev=>!prev)
            watchlistClick()
   
        }
        else{
            navigate("/login")
        }
    }

    return (
        <div>
            <div className={`card text-bg-${isMain ? 'dark mb-3' : 'light'} d-flex`} style={{ maxWidth: "100%", height: "100%" }}>
                <div className="row g-0">
                    <div className="col-1">
                        <img src={posterUrl} style={{ height: "100%" }} className="img-fluid rounded-start" alt={title} />
                    </div>
                    <div className={`col-11`}>
                        <div className="card-body d-flex flex-column justify-content-between">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <h5 className="card-title">{title}</h5>
                                    <p className="card-text">{overview}</p>
                                   
                                    <p className="card-text mb-0">
                                        <small className="">⭐{Math.round(voteAverage * 10) / 10} ({voteCount})</small>
                                    </p>
                               
                                    <UserRating movieID={_id} stars={rating}/>
                                </div>
                                {watchlistButton && (
                                    <div className="position-relative">
                                        <button
                                            className="button btn ms-3 mt-5"
                                            style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                                            onMouseEnter={() => setHover(true)}
                                            onMouseLeave={() => setHover(false)}
                                            onClick={() => { handleClick(_id) }}
                                        >
                                            <FontAwesomeIcon 
                                                className='align-self-center'
                                                icon={inWatchlist ? faMinusCircle : faPlusCircle} 
                                                style={{ color: inWatchlist ? 'red' : 'green' }}
                                            />
                                        </button>
                                        {hover && (
                                            <span className="watchlist-tooltip position-absolute top-100 start-50 translate-middle-x mt-1">
                                                {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'} 
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
