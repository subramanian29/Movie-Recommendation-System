
import { useEffect } from "react";
import { useState } from "react";
import LoadingCircle from "../components/LoadingCircle/LoadingCircle";
import { useNavigate } from "react-router-dom";




export default function SimilarMoviesPage(){

    const[isLoading,setIsLoading] = useState(true)

    const [randomMovie,setRandomMovie] = useState({});

    const navigate=useNavigate()

    useEffect(()=>{ async function effect(){
        setRandomMovie(()=>{return {}})
        setIsLoading(()=>{return true})
        let data={};
        try{
            const res= await fetch(`http://localhost:5000/random`)
            data=await res.json();
        }
        catch(e){}
        
        setRandomMovie(()=>{return {...data}})
        
        setIsLoading(()=>{return false})

    }; effect();},[])


    const{posterUrl,title,overview,voteCount,voteAverage,_id}=randomMovie
    if(isLoading){
        return <LoadingCircle/>
    }
    
    return(

        <div>
        <div className={`card d-flex mt-5 mb-5`} style={{maxWidth:"100%",height:"100%"}}> 
            <div className="row g-0">
                <div className="col-4">
                    <img src={posterUrl} style={{height:"80%"}} className="img-fluid rounded-start" alt={title}/>
                </div>
                <div className={`col-8 `}>
                    <div className="card-body ">

                        <h1 className="card-title mx-auto mb-5">{title}</h1>
                        <h3 style={{fontWeight:200}} className="card-text mt-5">{overview}</h3>
        
                        {<h4 className="card-text mt-5 mb-2"><small className="text-body-secondary">⭐{Math.round(voteAverage*10)/10} ({voteCount})</small></h4>}
                        <div className="mt-5">
                        <button type="button" onClick={()=>{window.location.reload()}} className="btn btn-outline-primary ml-0 mr-5 w-25 mb-0" >Get Another Movie</button>
                        <button type="button" onClick={()=>{return navigate(`/${_id}`)}} className="btn btn-outline-primary mx-5 w-25 mb-0" >View Similar Movies</button>
                        </div>



                    </div>
                </div>
            </div>
        </div>
        </div>

    )


}