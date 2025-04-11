import React, { useState } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundImage: `url('/images/twilight-background.jpg')`, // Ensure this image exists in public/images/
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding: '20px',
    },
    form: {
    
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      width: '100%',
      maxWidth: '400px',
      animation: 'fadeIn 0.5s ease-in',
    },
    inputGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontFamily: 'Montserrat',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '14px',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    },
    inputFocus: {
      borderColor: '#007bff',
      boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
    },
    button: {
      width: '100%',
      padding: '10px',
      background: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    buttonHover: {
      background: '#0056b3',
    },
    error: {
      color: 'red',
      marginTop: '10px',
      fontSize: '14px',
      textAlign: 'center',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      color: 'white',
      fontFamily: 'Montserrat',
      fontSize: '2em',
      fontWeight: 'bold'
    },
  };

  // Animation keyframes
  const animationStyles = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
        'Accept': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message || 'Registration failed');
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('Registration successful:', data);
        // Redirect to login page after successful registration
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error('Error registering:', error.message);
        setError(error.message || 'Registration failed. Please try again.');
      });
  };

  return (
    <div style={styles.container}>
      <style>{animationStyles}</style>
      <div style={styles.form}>
        <h1 style={styles.title}>Register</h1>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}></label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              style={styles.input}
            //   onFocus={(e) => (e.target.style = { ...styles.input, ...styles.inputFocus })}
            //   onBlur={(e) => (e.target.style = styles.input)}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={styles.input}
            //   onFocus={(e) => (e.target.style = { ...styles.input, ...styles.inputFocus })}
            //   onBlur={(e) => (e.target.style = styles.input)}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={styles.input}
            //   onFocus={(e) => (e.target.style = { ...styles.input, ...styles.inputFocus })}
            //   onBlur={(e) => (e.target.style = styles.input)}
              required
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            // onMouseEnter={(e) => (e.target.style = { ...styles.button, ...styles.buttonHover })}
            // onMouseLeave={(e) => (e.target.style = styles.button)}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;