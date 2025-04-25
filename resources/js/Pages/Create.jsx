import React from 'react';
import { useForm } from '@inertiajs/react';

function CreatePost({ onPostCreated }) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    topic: '',
    body: '',
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/posts', {
      onSuccess: () => {
        onPostCreated();
      },
      preserveState: true,
      preserveScroll: true,
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          padding: '20px',
          width: '500px',
          margin: '100px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          border: '2px solid white',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
          Create New Post
        </h1>
        {Object.keys(errors).length > 0 && (
          <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>
            {Object.values(errors).join(', ')}
          </p>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: 'white' }}>
              Title:
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                fontSize: '16px',
              }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: 'white' }}>
              Add Image:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setData('image', e.target.files[0])}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                fontSize: '16px',
                color: 'white',
              }}
            />
            {data.image && (
              <p style={{ color: 'white', marginTop: '5px' }}>
                Selected: {data.image.name}
              </p>
            )}
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: 'white' }}>
              Topic:
            </label>
            <input
              type="text"
              value={data.topic}
              onChange={(e) => setData('topic', e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                fontSize: '16px',
              }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: 'white' }}>
              Body:
            </label>
            <textarea
              value={data.body}
              onChange={(e) => setData('body', e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                minHeight: '150px',
                fontSize: '16px',
              }}
              required
            />
          </div>
          <button
            type="submit"
            disabled={processing}
            style={{
              padding: '10px 20px',
              background: '#0084a1',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: processing ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) => !processing && (e.target.style.background = '#1abee2')}
            onMouseLeave={(e) => !processing && (e.target.style.background = '#0084a1')}
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;