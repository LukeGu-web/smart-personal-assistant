import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import TodoList from './pages/TodoList';
import Calendar from './pages/Calendar';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
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
]);

export default router;
