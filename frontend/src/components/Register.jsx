import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {

  //stating form
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  //handle form input change - for input fields
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
      const response = await fetch('http://localhost:8080/api/register', {
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
        fullName: '',
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

          <h1>Register</h1>

          <label>Enter Full Name</label>
          <input type="text" 
          placeholder='Enter your full name'
          name="fullName"
          value={form.fullName}
          onChange={handleChange}/>

          <br></br>

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

          <button type="submit">submit</button>
          
        </form>

        <br></br>

        <Link to="/Login">Already have an accout? Login</Link>

        <br></br><br></br>
        

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}


      </div>
    </>
  )
}

export default Register
