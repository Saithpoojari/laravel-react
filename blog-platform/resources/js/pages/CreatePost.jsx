import React, { useState } from 'react';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Post created!');
        setTitle('');
        setContent('');
      })
      .catch((error) => console.error('Error creating post:', error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%', padding: '5px', minHeight: '100px' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none' }}>
          Submit Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;