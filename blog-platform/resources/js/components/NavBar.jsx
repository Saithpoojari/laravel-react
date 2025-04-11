import React from 'react';
import asterisk from './asterisk.png'

function Navbar() {
  return (
    <nav
  style={{
    padding: '30px 20px',
    // background: 'black',
    backdropFilter:'blur(10px)',
    borderBottom: '1px solid #ddd',
    borderTop: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}
>
  <div style={{
    display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
  }}> 
  <img
    src={asterisk}
    alt="Home Icon" // Accessibility text
    style={{ marginRight: '10px', verticalAlign: 'middle', width: '24px', height: '24px', background:'#ffffff' }} // Optional styling
  />
    
    <a href="/" style={{ marginRight: '20px', textDecoration: 'none', color: 'white' }}>Home</a>
    <a href="/create" style={{ textDecoration: 'none', color: 'white' }}>Create Post</a>
  </div>
  <div>
    <a href="/login" style={{ textDecoration: 'none', color: 'white' }}>Logout</a>
  </div>
  
</nav>

  );
}

export default Navbar;