import React from 'react';
import { useForm, Link } from '@inertiajs/react';

function Login() {
  const { data, setData, post, errors, processing } = useForm({
    email: '',
    password: '',
  });

  // Inline styles
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
    form: {
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      width: '100%',
      maxWidth: '400px',
      animation: 'fadeIn 0.5s ease-in',
      background: 'rgba(0, 0, 0, 0.5)', // Slight background for contrast
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
      color: 'white',
      background: 'rgba(255, 255, 255, 0.1)',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    },
    button: {
      width: '100%',
      padding: '10px',
      background: '#0084a1',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    link: {
      display: 'block',
      textAlign: 'center',
      marginTop: '15px',
      color: 'white',
      fontFamily: 'Montserrat',
      fontSize: '14px',
      textDecoration: 'underline',
      cursor: 'pointer',
      transition: 'color 0.3s ease',
    },
    error: {
      color: '#ff4d4d',
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
      fontWeight: 'bold',
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
    input:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
    button:hover:not(:disabled) {
      background: #0056b3;
    }
    .link:hover {
      color: #007bff;
    }
  `;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login', {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        // Redirect handled by backend
      },
    });
  };

  return (
    <div style={styles.container}>
      <style>{animationStyles}</style>
      <div style={styles.form}>
        <h1 style={styles.title}>Login</h1>
        {Object.values(errors).map((error, index) => (
          <p key={index} style={styles.error}>{error}</p>
        ))}
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              placeholder="Enter your email"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              placeholder="Enter your password"
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button} disabled={processing}>
            Login 
          </button>
          <Link href="/register" style={styles.link} className="link">
            Don’t have an account? Register here
          </Link>
        </form>
      </div>
    </div>
  );
}

Login.layout = null;
export default Login;