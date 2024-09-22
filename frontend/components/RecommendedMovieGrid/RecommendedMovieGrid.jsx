import RecommendedMovieCard from "../RecommendedMovieCard/RecommendedMovieCard"

export default function RecommendedMovieGrid({movies}){
    return (
        <div className="container-fluid">
            <div className="row">
            
                    {movies.map((movie)=>(
                        <div className="col-12 g-0">
                        <RecommendedMovieCard movie={movie} key={movie._id}/>
                        </div>
                        
                    ))}
            </div>
       </div>
    )


}