import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { api, createSession, verifyToken } from "../services/api"
import jwtDecode from "jwt-decode";
import { Snackbar } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

const verifyTimeToken = (token) => {
  const decoded = jwtDecode(token);
  const exp = decoded.exp;
  const currentTime = Date.now() / 1000;

  if (exp < currentTime) {
    // Token expirado
    return false
} else {
    return true
}
}

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const recoveredUser = localStorage.getItem("user");
            const recoveredToken = localStorage.getItem("token");
            if (recoveredUser && recoveredToken) {
                const params = { token: recoveredToken };
                const expirado = verifyTimeToken(recoveredToken);
                if(!expirado){
                    logout();
                }
                setUser(JSON.parse(recoveredUser));
                setToken(recoveredToken);
            } else {
                logout();
            }
            setLoading(false);
        } catch (error) {
            logout();
        }
    }, []);

    const login = (email, password) => {
        const params = {
            email: email,
            senha: password
        }

        createSession(params)
            .then(response => {
                const decodeToken = jwtDecode(response.data.token)
                const token = response.data.token;
                //Passar tambem data de expiração do token
                const loggedUser = {
                    id: decodeToken.id,
                    email: decodeToken.email,
                    nome_completo: decodeToken.nome_completo, 
                    create_time: decodeToken.create_time
                }
                

                localStorage.setItem('user', JSON.stringify(loggedUser));
                localStorage.setItem('token', token);

                setUser({ loggedUser })
                setToken(token)
                navigate("/")
                toast.success(response.data.message, {position: toast.POSITION.TOP_CENTER});
            })
            .catch(error => {
                if (error.response.status === 401) {
                    //EMAIL OU SENHA INVALIDOS
                    toast.error(error.response.data.message, {position: toast.POSITION.TOP_CENTER});
                    console.error(error.response);

                } else {
                    console.error('Erro desconhecido:', error);
                    toast.error(error.response.data.message, {position: toast.POSITION.TOP_CENTER});
                }
            });
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.error('Você deslogou do sistema', {position: toast.POSITION.TOP_CENTER});
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, loading, user, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    )
}