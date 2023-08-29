import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import TodoList from './pages/TodoList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
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
    path: '/todo-list',
    element: <TodoList />,
  },
]);

export default router;
