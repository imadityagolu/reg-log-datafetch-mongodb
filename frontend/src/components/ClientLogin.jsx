import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ClientLogin() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await fetch('http://localhost:8080/api/client/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      setSuccess(data.message);
      setForm({
        email: '',
        password: ''
      });
      localStorage.setItem('clientLoggedIn', 'true');
      navigate('/client-dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Client Login</h1>
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
        <br />
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      <Link to="/ClientRegister">Don't have an account? Register as client</Link>
      <br />
      <Link to="/Login">Login as Admin</Link>
      <br />
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </div>
  );
}

export default ClientLogin; 