import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  let auth = false;
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;