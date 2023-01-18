import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  loggedIn: false,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (email, password) => {
    const params = {
      email: email,
      senha: password
    }
    createSession(params)
      .then(response => {
        const decodeToken = jwtDecode(response.data.token)
        const token = response.data.token;
        const loggedUser = {
          id: decodeToken.id,
          email: decodeToken.email,
          nome_completo: decodeToken.nome_completo,
          create_time: decodeToken.create_time
        }
        localStorage.setItem('user', JSON.stringify(loggedUser));
        localStorage.setItem('token', token);
        toast.success(response.data.message, { position: toast.POSITION.TOP_CENTER });
        setLoggedIn(true);
      })
      .catch(error => {
        if (error.response.status === 401) {
          //EMAIL OU SENHA INVALIDOS
          toast.error(error.response.data.message, { position: toast.POSITION.TOP_CENTER });
          console.error(error.response);
  
        } else {
          console.error('Erro desconhecido:', error);
          toast.error(error.response.data.message, { position: toast.POSITION.TOP_CENTER });
        }
      });
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};