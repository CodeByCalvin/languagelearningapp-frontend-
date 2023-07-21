import { Navigate, Outlet } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const ProtectedRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <Outlet /> : <Navigate to="/landing" />;
};

export default ProtectedRoutes;