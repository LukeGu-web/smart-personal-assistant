import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import TodoList from './pages/TodoList';
import Calendar from './pages/Calendar';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/',
    element: <PrivateRoute />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/todo-list',
        element: <TodoList />,
      },
    ],
  },
]);

export default router;
