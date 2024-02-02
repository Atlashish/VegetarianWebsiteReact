import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Results from './pages/Results'
import Description from './pages/Description'
import './App.css'

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results/:search" element={<Results />} />
        <Route path="/description/:id" element={<Description />}></Route>
      </Routes>
  )
}

