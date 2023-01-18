import React from 'react'
import Layout from './components/Layout/Layout'
import DescriptionGenView from './components/DescriptionGen/DescriptionGenView'
import LoginPage from './components/Layout/LoginPage'
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";



const AppRoutes = () => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route path="/" element={<Layout />}>
                        <Route path="/teste-1" element={<DescriptionGenView />} />
                        <Route path="/teste-2" />
                    </Route>
                </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes