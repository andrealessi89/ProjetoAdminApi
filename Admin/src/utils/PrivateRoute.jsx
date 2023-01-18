import React, { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';


const PrivateRoute = ({ children }) => {
    const { loggedIn } = useContext(AuthContext);

    console.log(loggedIn);
    useEffect(() => {
        if (!loggedIn) {
          console.log('nao ta logado');
        }
      }, [loggedIn]);

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;