import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { api, createSession, verifyToken } from "../services/api"
import jwtDecode from "jwt-decode";

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
                    email: decodeToken.email
                }

                localStorage.setItem('user', JSON.stringify(loggedUser));
                localStorage.setItem('token', token);

                setUser({ loggedUser })
                setToken(token)
                navigate("/")
            })
            .catch(error => {
                if (error.response.status === 401) {
                    console.error(error.response);
                } else {
                    console.error('Erro desconhecido:', error);
                }
            });
    };

    const logout = () => {
        console.log('logout');
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, loading, user, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    )
}