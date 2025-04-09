import React, { useState, useEffect } from 'react';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/posts') // Fetch from Laravel route (to be added)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: '15px', borderBottom: '1px solid #eee' }}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;