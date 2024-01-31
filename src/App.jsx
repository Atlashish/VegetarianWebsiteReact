import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Results from './pages/Results'
import './App.css'

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
  )
}

