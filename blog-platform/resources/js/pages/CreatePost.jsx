import React, { useState } from 'react';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    fetch('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
        'Accept': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.error || 'Failed to create post');
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('Post created:', data);
        // Optionally update UI or redirect
        window.location.href = '/'; // Redirect to home page
      })
      .catch((error) => {
        console.error('Error creating post:', error.message);
        setError(error.message || 'Failed to create post. Please try again.');
      });
  };

  return (
    <div style={{display:'flex' , alignItems:'center' ,justifyContent:'center'}}>
        <div style={{ padding: '20px', width: '500px', margin:'100px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' ,  border: '2px solid white' }}>
    <h1 style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>Create New Post</h1>
    {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold',color: 'white' }}>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px', }}
          required
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold',color: 'white' }}>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', minHeight: '150px', fontSize: '16px' }}
          required
        />
      </div>
      <button
        type="submit"
        style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', transition: 'background 0.3s' }}
        onMouseEnter={(e) => (e.target.style.background = '#0056b3')}
        onMouseLeave={(e) => (e.target.style.background = '#007bff')}
      >
        Create Post
      </button>
    </form>
  </div>
    </div>
    
    
  );
}

export default CreatePost;