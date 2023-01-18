import React, { Component, useState, useContext } from 'react'
import Layout from './components/Layout/Layout'
import DescriptionGenView from './components/DescriptionGen/DescriptionGenView'
import LoginPage from './components/Layout/LoginPage'
import { AuthProvider, AuthContext } from './store/AuthContext'
import {
    BrowserRouter,
    Route,
    Routes,
    Navigate
} from "react-router-dom";
import jwtDecode from "jwt-decode";

const AppRoutes = () => {

    const Private = ({ children }) => {
        const { authenticated, loading, token } = useContext(AuthContext);
        if (loading) {
            return <div className="loading">Carregando...</div>
        }
        if (!authenticated) {
            return <Navigate to="/login" />
        }

        const recoveredToken = localStorage.getItem("token");
        const recoveredUser = localStorage.getItem("user");
        if(!recoveredToken || !recoveredUser){
            return <Navigate to="/login" />
        }
        // Decodifica o token
        const decoded = jwtDecode(token);
    
        // Verifica se o token expirou
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            return <Navigate to="/login" />
        }
    
        return children;
    }

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route path="/" element={<Private><Layout /></Private>}>
                        <Route path="/teste-21" element={<DescriptionGenView />} />
                        <Route path="/teste-2" />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default AppRoutes