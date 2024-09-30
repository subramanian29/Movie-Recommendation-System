import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecommendedMovieGrid from "../components/RecommendedMovieGrid/RecommendedMovieGrid";
import NoResultsFound from "../components/NoResultsFound/NoResultsFound";
import LoadingCircle from "../components/LoadingCircle/LoadingCircle";

export default function RatingsPage(){

    const [ratings, setRatings]= useState([])
    const[isLoading, setIsLoading]= useState([])

    const navigate=useNavigate()
  
    useEffect(()=>{ async function gt(){
        setIsLoading(()=>true)

        const response= await fetch("http://localhost:5000/rating",{
            method:"GET",
            credentials:'include',
        })
        const data= await response.json()
        if(data!==false){
            let movies=[]
            for(let movieId in data){
                const r= await fetch(`http://localhost:5000/${movieId}`,{
                    method:"GET",
                    credentials:'include'
                })
                const d= await r.json();
                console.log(d)
                movies.push(d);
                
            }
            setRatings(()=>[...movies])
            setIsLoading(false);
        }
        else{
            return navigate("/login")
        }
        
    }; gt();},[])

  

    return(
        <>
        <h1 className="mt-5 mb-5">Your Ratings</h1>
        {isLoading?(<LoadingCircle/>):
        (ratings.length?(<RecommendedMovieGrid movies={ratings} watchlistButton={false}/>):
        <NoResultsFound message={"You haven't rated any movie"}/>)
         }
   
        </>
    )

}