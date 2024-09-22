export default function RecommendedMovieCard({movie,isMain=false}){
    const {title,posterUrl,overview,voteAverage,voteCount}=movie;
    return(
        
        <div>
        <div className={`card text-bg-${(isMain)?'dark mb-3':'light'}  d-flex`} style={{maxWidth:"100%",height:"100%"}}> 
            <div className="row g-0">
                <div className="col-1">
                    <img src={posterUrl} style={{height:"100%"}} className="img-fluid rounded-start" alt={title}/>
                </div>
                <div className={`col-11 `}>
                    <div className="card-body d-flex flex-column justify-content-between">

                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{overview}</p>
        
                        {!isMain && <p className="card-text mb-0"><small className="text-body-secondary">⭐{Math.round(voteAverage*10)/10} ({voteCount})</small></p>}

                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}