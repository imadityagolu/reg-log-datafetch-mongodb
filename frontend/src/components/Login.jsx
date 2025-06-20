import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {

  //stating form
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  //handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'GET',
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
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

          <h1>Login</h1>

          <label>Enter email</label>
          <input type="email" 
          placeholder='Enter your email'
          name="email"
          value={form.email}
          onChange={handleChange}/>

          <br></br>

          <label>Enter Password</label>
          <input type="password" 
          placeholder='Enter your password'
          name="password"
          value={form.password}
          onChange={handleChange}/>

          <br></br>

          <button type="submit">Login</button>
        </form>

        <br></br>

        <Link to="/Register">Don't have an accout? Register</Link>

        <br></br><br></br>

        
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

      </div>
    </>
  )
}

export default Login
