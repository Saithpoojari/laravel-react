import React from "react";
import { Children } from "react";
import { Link } from "@inertiajs/react";

function Layout({children}){
    return (
        <>
      
      <nav
  style={{
    padding: '30px 20px',
    background: 'black',
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
    
    <a href="/" style={{ marginRight: '20px', textDecoration: 'none' }} className="text-white hover:text-blue-300">Home</a>
    {/* <a href="/create" style={{ textDecoration: 'none', color: 'white' }}>Create Post</a> */}
  </div>
  <div>
    <a href="/login" style={{ textDecoration: 'none' }} className="text-white hover:text-blue-300">Logout</a>
  </div>
  
</nav>
      
        <main>{children}</main>
        <footer>
            <div>
                
            </div>
            
        </footer>
        </>
    );
}
export default Layout;