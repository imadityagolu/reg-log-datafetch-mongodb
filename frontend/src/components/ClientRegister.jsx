import { useState } from 'react';
import { Link } from 'react-router-dom';

function ClientRegister() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    address: '',
    gender: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      const response = await fetch('http://localhost:8080/api/client/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      setSuccess(data.message);
      setForm({
        name: '',
        email: '',
        password: '',
        dob: '',
        address: '',
        gender: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Client Registration</h1>
        <label>Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />
        <br />
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
        <br />
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
        <br />
        <label>Date of Birth</label>
        <input type="date" name="dob" value={form.dob} onChange={handleChange} required />
        <br />
        <label>Address</label>
        <input type="text" name="address" value={form.address} onChange={handleChange} required />
        <br />
        <label>Gender</label>
        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <br />
        <button type="submit">Register</button>
      </form>
      <br />
      <Link to="/ClientLogin">Already registered? Login</Link>
      <br />
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </div>
  );
}

export default ClientRegister; 