import { Outlet, Navigate } from 'react-router-dom';
import { getIsAuth } from '../utils/token';

const PrivateRoute = () => {
  const isAuth = getIsAuth();

  if (!isAuth) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
