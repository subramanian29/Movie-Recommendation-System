import { useState, useEffect, useRef } from "react";
import Rating from '@mui/material/Rating';

import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";

export default function UserRating({movieID,stars=0}) {
  const [rating, setRating] = useState(stars);
  const [showDropdown, setShowDropdown] = useState(false); 
  const dropdownRef = useRef(null);  
  const navigate= useNavigate();
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    setShowDropdown(false); 
  };

  const handleClear = () => {
    setRating(0);
    setShowDropdown(false); 
  };

  const toggleDropdown = (event) => {
    event.preventDefault();
    setShowDropdown(!showDropdown);  
  };

  useEffect(()=>{
    setRating(stars)
  },[])


  const previousRatingRef = useRef(rating);
   useEffect(()=>{async function upd(){
    
    const response=await fetch("http://localhost:5000/rating",{
        method:"POST",
        headers: {
             "Content-Type": "application/json",
         },
         credentials:"include",
         body:JSON.stringify({_id:movieID,stars:rating})
    })
     const data= await response.json();
   
     if(!data.success){
         navigate("/login")
    }}
    if(previousRatingRef.current!=rating)
    {
        upd();
        previousRatingRef.current=rating;
    }

  },[rating])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="card-text">
      <button
        style={{ border: "none", background: "transparent", padding: "0" }}
        id="dropdownMenuButton"
        onClick={toggleDropdown}
      >
        <small className="star-icon" style={{ color: "blue", fontSize: "125%" }}>
          ★ 
        </small>
      </button>
      {rating?rating:""}
      

      {showDropdown && (
        <div ref={dropdownRef} className="dropdown-menu p-3" style={{ display: 'block' }}>
          <Rating
            sx={{ color: "blue" }}
            name="rating"
            value={rating}
            onChange={handleRatingChange}
            precision={1}
            max={10}
          />
          <button
            className="btn"
            onClick={handleClear}
          >
            <ClearIcon/>
          </button>
        </div>
      )}

    </div>
  );
}
