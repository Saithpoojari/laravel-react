import React from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/LoginPage'
import Register from './pages/Register';

console.log('React loaded:', React);

function App() {
  const page = document.getElementById('app')?.getAttribute('data-page') || 'home';
  console.log('Current page:', page);

  return (
    <div>
    {(page === 'home' || page === 'create' ) && <Navbar />}
  
    {page === 'home' ? (
      <Home />
    ) : page === 'create' ? (
      <CreatePost />
    ) : page === 'login' ? (
      <Login />
    ) :page === 'register'?(
        <Register/>
    ) : (
      <Home />
    )}
    {/* <Register/> */}
  </div>
  
  );
}

const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error('Element with id "app" not found');
}