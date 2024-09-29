import RecommendedMovieCard from "../RecommendedMovieCard/RecommendedMovieCard"

export default function RecommendedMovieGrid({movies,watchlistClick=()=>{},watchlistButton=false}){


    return (
        <div className="container-fluid">
            <div className="row">
            
                    {movies.map((movie)=>(
                        <div className="col-12 g-0" key={movie._id}>
                        <RecommendedMovieCard movie={movie} watchlistClick={watchlistClick} watchlistButton={watchlistButton}/>
                        </div>
                        
                    ))}
            </div>
       </div>
    )


}