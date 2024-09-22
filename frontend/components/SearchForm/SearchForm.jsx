import React, { useEffect, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import './SearchForm.css'
import { useNavigate } from 'react-router-dom';

function SearchInput({handleSubmit}) {


  const navigate= useNavigate();

  const handleChange=(evt)=>{
    setMovieName(evt.target.value);
  }

  const handleFocus=()=>{
    setClicked(()=>{return true});
  }

  const [movieName,setMovieName]= useState("");
  const [clicked,setClicked]= useState(false);

  useEffect(()=>{
    if(clicked){
      const elementsToHide = document.querySelectorAll(".box");
      for (let element of elementsToHide){
        element.classList.add("fade-out");
      }

      setTimeout(() => {
        for(let element of elementsToHide){

        element.classList.add("box-hidden");
      }
      }, 200); 
    }

  },[clicked])
  

  return (
    <div className='container-fluid'>
    <div className='d-flex flex-column'>
    <div className={`align-self-center box `} >
      <h1><span className="colored">Find</span> Movies <span className="colored">That You'll ❤️  From</span></h1>
      <h1>&emsp;&emsp;&emsp;&emsp;&emsp;<span className='colored'>cineMa</span>tch!</h1>
    </div>
    <form  onSubmit={(evt)=>{handleSubmit(evt,movieName)}} onFocus={handleFocus}>
      <div className="input-group search-box mb-5">
        <input value={movieName} onChange={handleChange} type="text" className="form-control" placeholder="Search a movie..." aria-label="Recipient's username" aria-describedby="basic-addon2"/>
            <button className="input-group-text btn btn-primary" id="basic-addon2" type="submit"><SearchIcon/></button>
        </div>
    </form>
    <button id="randomButton" onClick={()=>{navigate('/random')}} type="button" class="btn btn-outline-primary mx-5 mt-5 w-50 align-self-center box" >Or Give me a Random Movie</button>

    </div>
    </div>
  );
}

export default SearchInput;
