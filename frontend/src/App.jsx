import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import First from './components/First.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import ClientRegister from './components/ClientRegister.jsx';
import ClientLogin from './components/ClientLogin.jsx';
import ClientDashboard from './components/ClientDashboard.jsx';

import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <First/>,

    children: [
      {
        index: true,
        element: <ClientLogin/>
      },
      {
        path: "/Login",
        element: <Login/>
      },
      {
        path: "/Register",
        element: <Register/>
      },
      {
        path: "/dashboard",
        element: <Dashboard/>
      },
      {
        path: "/ClientRegister",
        element: <ClientRegister/>
      },
      {
        path: "/ClientLogin",
        element: <ClientLogin/>
      },
      {
        path: "/client-dashboard",
        element: <ClientDashboard/>
      }
    ],
  }
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
