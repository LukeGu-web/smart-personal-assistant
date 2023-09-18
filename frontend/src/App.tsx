import { RouterProvider } from 'react-router-dom';
import router from './router';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
