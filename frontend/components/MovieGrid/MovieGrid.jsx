import MovieCard from "../MovieCard/MovieCard";


export default function MovieGrid({movies}){
    return (
        <div className="container-fluid">
            <div className="row">
            
                    {movies.map((movie)=>(
                        <div className={`col-2 mb-5 `}>
                        <MovieCard movie={movie} key={movie._id}/>
                        </div>
                        
                    ))}
            </div>
       </div>
    )


}