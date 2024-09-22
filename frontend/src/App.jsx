
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SimilarMoviesPage from '../pages/SimilarMoviesPage';
import HomePage from '../pages/HomePage';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from '../components/NavBar/NavBar';
import RandomPage from '../pages/RandomPage'

function App() {


  return (
    
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/:movieId" element={<SimilarMoviesPage />} />
        <Route path='' element={<HomePage/>}/>
        <Route path='/random' element={<RandomPage/>}/>
      </Routes>
    </Router>
  
  )
}

export default App
