import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import First from './components/First.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <First/>,

    children: [
      {
        index: true,
        element: <Register/>
      },
      {
        path: "/Login",
        element: <Login/>
      },
      {
        path: "/Register",
        element: <Register/>
      }
    ],
  }
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
