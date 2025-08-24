import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Expenses from './pages/Expenses'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
