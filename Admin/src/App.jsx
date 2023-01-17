import { useState } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app">
      <ToastContainer />
      <AppRoutes />
    </div>
  )
}

export default App
