import React from 'react'
import { AuthContext, AuthProvider } from './store/AuthContext'
import Layout from './components/Layout/Layout'
import DescriptionGenView from './components/DescriptionGen/DescriptionGenView'
import LoginPage from './components/Layout/LoginPage'
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';
import EsqueciSenha from './components/Layout/EsqueciSenha';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/esqueci-senha" element={<EsqueciSenha />} />
                    <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
                        <Route path="/teste-1" element={<DescriptionGenView />} />
                        <Route path="/teste-2" />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
export default AppRoutes