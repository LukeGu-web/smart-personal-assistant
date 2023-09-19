import jwt_decode from 'jwt-decode';
import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from '../utils/token';

type decodedToken = {
  email: string;
  firstname: string;
  lastname: string;
  exp: number;
  iat: number;
};

const PrivateRoute = () => {
  const token = getToken();
  let decoded = null;
  let isAuth = false;
  if (token) {
    decoded = jwt_decode(token) as decodedToken;
    isAuth = !!token && decoded.exp * 1000 > Date.now();
  }
  if (!isAuth) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
