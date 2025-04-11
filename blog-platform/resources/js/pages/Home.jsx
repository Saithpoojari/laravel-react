import React, { useState, useEffect } from 'react';
import './Pages.css'

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  // Inline styles
  const styles = {
    container: {
      padding: '20px',
    
      margin: '0 auto',
      // background: 'black',
      minHeight: '100vh',
    },
    title: {
      textAlign: 'left',
      color: 'white',
      marginBottom: '30px',
      fontFamily: 'Montserrat', 
      fontWeight: 700,
      fontSize: '4em', 
      textTransform: 'uppercase',
      letterSpacing: '20px', 
      
    },
    noPosts: {
      textAlign: 'center',
      color: '#666',
      fontSize: '1.2em',
      fontStyle: 'italic',
    },
    cardContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
    },
    card: {
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
      backgroundColor: 'lightgrey'
    },
    cardTitle: {
      color: 'black',
      marginBottom: '10px',
      fontSize: '1.5em',
      fontWeight: 'bold',
    },
    cardContent: {
      color: '#555',
      fontSize: '1em',
      lineHeight: '1.6',
    },
  };

  return (
    
    <div style={styles.container}>
      <h1 style={styles.title}>Blogram</h1>
      
      {posts.length === 0 ? (
        <p style={styles.noPosts}>No posts available.</p>
      ) : (
        <div style={styles.cardContainer}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={styles.card} // Base style applied initially
              onMouseEnter={(e) => {
                Object.assign(e.target.style, styles.cardHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, styles.card); // Revert to base style
              }}
            >
              <h2 style={styles.cardTitle}>{post.title}</h2>
              <p style={styles.cardContent}>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;