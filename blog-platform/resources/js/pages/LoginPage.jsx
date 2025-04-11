import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundImage: `url('/images/twilight-background.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding: '20px',
    },
    formContainer: {
    
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
      width: '100%',
      maxWidth: '450px',
    },
    title: {
      textAlign: 'center',
      marginBottom: '30px',
      color: 'white',
      fontFamily: 'Montserrat',
      fontSize: '2em',
      fontWeight: 'bold',
    },
    inputGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      fontSize: '16px',
      fontWeight: '500',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '15px',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '12px',
      background: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
    },
    registerButton: {
      display: 'block',
      width: '100%',
      padding: '12px',
      marginTop: '15px',
      background: 'transparent',
      color: '#007bff',
      border: '1px solid #007bff',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '500',
      textAlign: 'center',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    error: {
      color: '#d9534f',
      marginTop: '15px',
      fontSize: '14px',
      textAlign: 'center',
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || 'Login failed');
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('Login successful:', data);
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        setError(error.message); // Use backend error message
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
          <a href="/register" style={styles.registerButton}>
            Register
          </a>
          {error && <p style={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;