import React from 'react';

function Navbar() {
  return (
    <nav
  style={{
    padding: '10px',
    background: '#f8f9fa',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}
>
  <div>
    <a href="/" style={{ marginRight: '20px', textDecoration: 'none', color: '#333' }}>Home</a>
    <a href="/create" style={{ textDecoration: 'none', color: '#333' }}>Create Post</a>
  </div>
  <div>
    <a href="/login" style={{ textDecoration: 'none', color: '#333' }}>Login</a>
  </div>
</nav>

  );
}

export default Navbar;