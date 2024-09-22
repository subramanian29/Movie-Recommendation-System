import './MovieCard.css'
import { useNavigate } from 'react-router-dom';

export default function MediaCard({movie}) {

  const navigate=useNavigate();

  const {title,posterUrl,_id}=movie;
  return (
    <div onClick={()=>{navigate(`/${_id}`)}} >
      <div className="card text-bg-dark hover-effect">
        <img src={posterUrl} class="card-img" alt={title}/>
        <div className="card-img-overlay">
        <h5 className="card-title">{title}</h5>
      </div>
</div>
    </div>
  );
}

