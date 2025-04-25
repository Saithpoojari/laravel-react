import React from 'react';
import { useForm } from '@inertiajs/react';

function EditPost({ post, onPostUpdated }) {
  const { data, setData, put, errors, processing } = useForm({
    title: post.title || '',
    body: post.body || '',
    topic: post.topic || '',
    image: null, // Add image field for file uploads
  });

  const styles = {
    form: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '20px',
      borderRadius: '10px',
      marginBottom: '20px',
      fontFamily: 'Montserrat',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontFamily: 'Montserrat',
      fontSize: '16px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontFamily: 'Montserrat',
      fontSize: '16px',
      minHeight: '100px',
    },
    button: {
      padding: '10px 20px',
      background: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      fontFamily: 'Montserrat',
    },
    error: {
      color: '#dc3545',
      fontSize: '14px',
      marginBottom: '10px',
      fontFamily: 'Montserrat',
    },
    label: {
      color: '#fff',
      fontFamily: 'Montserrat',
      fontSize: '14px',
      marginBottom: '5px',
      display: 'block',
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/posts/${post.id}`, {
      data,
      onSuccess: () => {
        onPostUpdated();
        setData('image', null); // Reset image field after successful update
      },
    });
  };

  return (
    <div style={styles.form}>
      <h2 style={{ color: '#fff', fontFamily: 'Montserrat', marginBottom: '20px' }}>
        Edit Post
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            style={styles.input}
          />
          {errors.title && <div style={styles.error}>{errors.title}</div>}
        </div>
        <div>
          <label style={styles.label}>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setData('image', e.target.files[0])}
            style={styles.input}
          />
          {errors.image && <div style={styles.error}>{errors.image}</div>}
          {data.image && (
            <p style={{ color: '#fff', fontSize: '14px', marginTop: '5px' }}>
              Selected: {data.image.name}
            </p>
          )}
          {post.image && !data.image && (
            <p style={{ color: '#fff', fontSize: '14px', marginTop: '5px' }}>
              Current image: {post.image}
            </p>
          )}
        </div>
        <div>
          <label style={styles.label}>Body</label>
          <textarea
            placeholder="Body"
            value={data.body}
            onChange={(e) => setData('body', e.target.value)}
            style={styles.textarea}
          />
          {errors.body && <div style={styles.error}>{errors.body}</div>}
        </div>
        <div>
          <label style={styles.label}>Topic (optional)</label>
          <input
            type="text"
            placeholder="Topic (optional)"
            value={data.topic}
            onChange={(e) => setData('topic', e.target.value)}
            style={styles.input}
          />
          {errors.topic && <div style={styles.error}>{errors.topic}</div>}
        </div>
        <button type="submit" style={styles.button} disabled={processing}>
          {processing ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
}

export default EditPost;