import MovieCard from "../MovieCard/MovieCard";


export default function MovieGrid({movies}){
    return (
        <div className="container-fluid">
            <div className="row">
            
                    {movies.map((movie)=>(
                        <div className={`col-2 mb-5 ` } key={movie._id}>
                        <MovieCard movie={movie}/>
                        </div>
                        
                    ))}
            </div>
       </div>
    )


}