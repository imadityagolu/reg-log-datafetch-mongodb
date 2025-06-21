import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editAddress, setEditAddress] = useState('');

  useEffect(() => {
    // Redirect to login if not logged in
    if (!localStorage.getItem('userLoggedIn')) {
      navigate('/Login');
      return;
    }
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/users');
      const data = await res.json();
      setClients(data);
    } catch (err) {
      setError('Failed to fetch clients');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    navigate('/Login');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return;
    try {
      await fetch(`http://localhost:8080/api/users/${id}`, { method: 'DELETE' });
      setClients(clients.filter(client => client._id !== id));
    } catch (err) {
      setError('Failed to delete client');
    }
  };

  const handleEdit = (client) => {
    setEditId(client._id);
    setEditAddress(client.address);
  };

  const handleCancel = () => {
    setEditId(null);
    setEditAddress('');
  };

  const handleSave = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: editAddress })
      });
      const updated = await res.json();
      setClients(clients.map(client => client._id === id ? { ...client, address: updated.address } : client));
      setEditId(null);
      setEditAddress('');
    } catch (err) {
      setError('Failed to update address');
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome! You are logged in.</p>
      <button onClick={handleLogout}>Logout</button>
      <h2>All Clients</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client._id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.dob ? new Date(client.dob).toLocaleDateString() : ''}</td>
                <td>
                  {editId === client._id ? (
                    <input
                      type="text"
                      value={editAddress}
                      onChange={e => setEditAddress(e.target.value)}
                    />
                  ) : (
                    client.address
                  )}
                </td>
                <td>{client.gender}</td>
                <td>
                  {editId === client._id ? (
                    <>
                      <button onClick={() => handleSave(client._id)}>Save</button>
                      <button onClick={handleCancel} style={{ marginLeft: 8 }}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(client)}>Edit</button>
                      <button onClick={() => handleDelete(client._id)} style={{ marginLeft: 8 }}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard; 