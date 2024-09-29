import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './WatchListPage.css'
import RecommendedMovieGrid from "../components/RecommendedMovieGrid/RecommendedMovieGrid";
import NoResultsFound from "../components/NoResultsFound/NoResultsFound";

export default function WatchListPage(){

    const [watchlist, setWatchlist]= useState([])
    const navigate=useNavigate()
  
    useEffect(()=>{ async function gt(){

        const response= await fetch("http://localhost:5000/watchlist",{
            method:"GET",
            credentials:'include',
        })
        const data= await response.json()
        if(data!==false){
            console.log(data)
            setWatchlist(()=>[...data])
        }
        else{
            return navigate("/login")
        }
    }; gt();},[])

    function watchlistClick(){
        window.location.reload();

    }


    return(
        <>
        <h1 className="mt-5 mb-5">Your Watchlist</h1>
        {watchlist.length?(<RecommendedMovieGrid movies={watchlist} watchlistButton={true} watchlistClick={watchlistClick}/>):(
            <NoResultsFound message={"Your Watchlist is empty"}/>
        )}
        </>
    )

}