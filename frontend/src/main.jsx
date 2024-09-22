import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <App/>
  </StrictMode>,
)
