import Box  from "@mui/material/Box";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import RecommendedMovieCard from "../components/RecommendedMovieCard/RecommendedMovieCard";
import RecommendedMovieGrid from "../components/RecommendedMovieGrid/RecommendedMovieGrid";
import LoadingCircle from "../components/LoadingCircle/LoadingCircle";


export default function SimilarMoviesPage(){

    const {movieId}= useParams();
    const[isLoading,setIsLoading] = useState(true)

    const [movieList, setMovieList]= useState([]);
    const [movie,setMovie] = useState({});

    useEffect(()=>{ async function effect(){
        setIsLoading(()=>{return true})
        const res= await fetch(`http://localhost:5000/${movieId}`,{method: 'GET',
            credentials: 'include'
          })
        const data=await res.json();
        
        setMovie(()=>{return {...data}})
                                    

        const res2=await fetch(`http://localhost:5000/similar/${movieId}`,{method: 'GET',
            credentials: 'include'
          })
        const data2=await res2.json()
        setMovieList(()=>{return [...data2]})
        
        setIsLoading(()=>{return false})

    }; effect();},[movieId])



    
    return(
            <div>
            
            {isLoading?(<LoadingCircle/>):(
              <>
              <RecommendedMovieCard movie={movie} isMain={true}/>
              <RecommendedMovieGrid movies={movieList} watchlistButton={true}/>
              </>
            )}
            </div>
    );


}