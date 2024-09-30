
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SimilarMoviesPage from '../pages/SimilarMoviesPage';
import HomePage from '../pages/HomePage';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from '../components/NavBar/NavBar';
import RandomPage from '../pages/RandomPage'
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';

import { useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import WatchListPage from '../pages/WatchListPage';
import RatingsPage from '../pages/RatingsPage';

function App() {
  const {setIsLoggedIn}= useAuth();

  useEffect(()=>{ async function effect(){
    let data={};
  
    const res= await fetch(`http://localhost:5000/status`, {method: 'GET',
            credentials: 'include',
          })
    data=await res.json();
    if(data)
    {
      setIsLoggedIn(data.user)
    }
    else setIsLoggedIn(false);

}; effect();},[])

  return (
    
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/:movieId" element={<SimilarMoviesPage />} />
        <Route path='' element={<HomePage/>}/>
        <Route path='/random' element={<RandomPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/watchlist" element={<WatchListPage/>}/>
        <Route path="/ratings" element={<RatingsPage/>}/>
      </Routes>
    </Router>
  
  )
}

export default App
