import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ClientDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to client login if not logged in as client
    if (!localStorage.getItem('clientLoggedIn')) {
      navigate('/ClientLogin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('clientLoggedIn');
    navigate('/ClientLogin');
  };

  return (
    <div>
      <h1>Client Dashboard</h1>
      <p>Welcome, client user! You are logged in as a client.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default ClientDashboard; 