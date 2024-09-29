
import React, { useEffect, useState } from 'react';
import SearchForm from '../components/SearchForm/SearchForm'
import MovieGrid from '../components/MovieGrid/MovieGrid';
import LoadingCircle from '../components/LoadingCircle/LoadingCircle';
import NoResultsFound from '../components/NoResultsFound/NoResultsFound';

function HomePage() {

  const [movieData, setMovieData]= useState([]);
  const[isLoading,setIsLoading] = useState(false)
  const[oneLoaded,setOneLoaded]=useState(false)
  async function handleSubmit(evt,movieName){

    evt.preventDefault()
    setMovieData(()=>{return []})
    setIsLoading(()=>{return true})
    const url=`http://localhost:5000/?movie=${movieName}`
    let data=[]
    try{
      const res=await fetch(url,{method: 'GET',
        credentials: 'include'
      });
      data= await res.json();
      console.log("data",!data,data)
    }
    catch(e){}
    setMovieData(()=>{return [...data]})
    setIsLoading(()=>{return false})
    setOneLoaded(()=>{return true})
    
  }

  
  return (
    <>
    <SearchForm handleSubmit={handleSubmit} />

    {isLoading? (<LoadingCircle/>):
     (movieData.length || !oneLoaded)?(<MovieGrid movies={movieData}/>):(<NoResultsFound message={"No results found...:("}/>)
    }
    </>
  )
}

export default HomePage
