import { useState } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import AppRoutes from './AppRoutes'

function App() {
  return (
    <div className="app">
      <AppRoutes />
    </div>
  )
}

export default App
