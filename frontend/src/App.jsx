import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './assets/pages/HomePage'
import AddCar from './assets/pages/AddCar'
import SingleCar from './assets/pages/SingleCar'
import NotFound from './assets/pages/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<SingleCar />} />
        <Route path="/add-car" element={<AddCar />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App