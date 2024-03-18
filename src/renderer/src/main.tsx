import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App'
import Calendar from './components/Calendar';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/calendar" element={<Calendar />} />
        </Routes>
    </Router>
   
  </React.StrictMode>
)
