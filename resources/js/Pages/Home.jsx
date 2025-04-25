import React, { useEffect, useState } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import CreatePost from './Create.jsx';
import './Page.css';

function Home({ posts, auth, allPosts }) {
  console.log(posts);
  const { flash } = usePage().props;
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [filter, setFilter] = useState('');
  const [likedPosts, setLikedPosts] = useState({});
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentDrafts, setCommentDrafts] = useState({});

  const { data, setData, post, processing, errors, reset } = useForm({
    content: '',
  });

  const styles = {
    container: {
      padding: '20px',
      margin: '0 auto',
      minHeight: '100vh',
      backgroundImage: `url('/images/twilight-background.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      color: 'white',
      fontFamily: 'Montserrat',
    },
    welcome: {
      fontSize: '1.5em',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
    logoutButton: {
      padding: '8px 16px',
      background: '#dc3545',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '14px',
      cursor: 'pointer',
      textDecoration: 'none',
      fontFamily: 'Montserrat',
    },
    title: {
      color: '#fff',
      marginBottom: '30px',
      fontFamily: 'Montserrat',
      fontWeight: 700,
      fontSize: '4em',
      textTransform: 'uppercase',
      letterSpacing: '10px',
      margin: '20px',
    },
    noPosts: {
      textAlign: 'center',
      color: '#fff',
      fontSize: '1.2em',
      fontStyle: 'italic',
      fontFamily: 'Montserrat',
    },
    cardContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
    },
    card: {
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(255, 255, 255, 0.34)',
      padding: '20px',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    },
    cardContent: {
      color: 'white',
      fontSize: '1em',
      lineHeight: '1.6',
      marginBottom: '10px',
      fontFamily: 'Montserrat',
    },
    cardTitle: {
      backgroundColor: '#0084a1',
      padding: '6px 10px',
      fontSize: '2em',
      textAlign: 'center',
      borderRadius: '6px',
      marginBottom: '20px',
      display: 'inline-block',
      fontFamily: 'Montserrat',
      textTransform: 'uppercase',
      display: 'flex',
      color: '#fff',
      justifyContent: 'space-between',
    },
    date: {
      backgroundColor: '#00181d',
      color: '#fff',
      padding: '6px 8px',
      fontSize: '0.6em',
      fontWeight: '600',
      textAlign: 'center',
      borderRadius: '6px',
      marginBottom: '12px',
      display: 'inline-block',
      fontFamily: 'Montserrat',
      borderRadius: '50px',
    },
    readMore: {
      textDecoration: 'none',
      fontWeight: '500',
      fontFamily: 'Montserrat',
    },
    createButton: {
      display: 'block',
      width: '100px',
      padding: '8px',
      color: '#0056b3',
      borderRadius: '5px',
      fontSize: '18px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
      fontFamily: 'Montserrat',
      textAlign: 'center',
    },
    flashMessage: {
      color: '#28a745',
      textAlign: 'center',
      marginBottom: '20px',
      fontFamily: 'Montserrat',
      fontSize: '1.2em',
    },
    highlight: {
      backgroundColor: 'yellow',
      color: 'black',
      fontWeight: 'bold',
    },
    commentForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginTop: '10px',
    },
    commentButton: {
      padding: '6px 12px',
      background: '#0084a1',
      color: '#fff',
      border: 'none',
      borderRadius: '50px',
      fontSize: '14px',
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      alignSelf: 'flex-center',
    },
    errorMessage: {
      color: '#dc3545',
      fontSize: '12px',
      fontFamily: 'Montserrat',
    },
  };

  const animationStyles = `
    .create-button:hover {
      background: #0056b3;
    }
    .like-icon {
      transition: fill 0.2s ease;
    }
  `;

  useEffect(() => {
    const target = document.querySelector('.landing-text');
    const originalText = 'Blogram';
    const chars = 'GYUHDAXLKZ';
    let frame = 0;

    const scramble = () => {
      const interval = setInterval(() => {
        frame++;
        const scrambled = originalText
          .split('')
          .map((char, i) => {
            if (i < frame) return originalText[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (target) {
          target.textContent = scrambled;
        }

        if (frame >= originalText.length) {
          clearInterval(interval);
        }
      }, 100);
    };

    scramble();

    const loop = setInterval(() => {
      frame = 0;
      scramble();
    }, 2000);

    return () => clearInterval(loop);
  }, []);

  const handlePostCreated = () => {
    setShowCreatePost(false);
  };

  const highlightText = (text, filter) => {
    if (!text || !filter) return text || 'None';
    const regex = new RegExp(`(${filter})`, 'gi');
    return text.replace(regex, '<span style="background-color: #bbf3ff ; color: black; font-weight: bold;">$1</span>');
  };

  const filteredPosts = allPosts.filter((post) =>
    post.topic?.toLowerCase()?.includes(filter.toLowerCase())
  );

  const displayPosts = filter.trim() === '' ? posts.data : filteredPosts;

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentSubmit = (postId, e) => {
    e.preventDefault();
    post(`/posts/${postId}/comments`, {
      data,
      onSuccess: () => {
        reset();
        setCommentDrafts((prev) => ({ ...prev, [postId]: '' }));
        setActiveCommentPostId(null);
      },
      onError: (err) => {
        console.error('Comment submission error:', err);
      },
    });
  };

  const handleCommentChange = (postId, value) => {
    setCommentDrafts((prev) => ({ ...prev, [postId]: value }));
    setData('content', value);
    setActiveCommentPostId(postId);
  };

  return (
    <>
      <div></div>
      <div className="heading-an-btn">
        <h1 style={styles.title} className="landing-text"></h1>
      </div>
      <div style={styles.container}>
        <div></div>
        <style>{animationStyles}</style>
        <h2 style={styles.welcome}>Welcome, {auth?.user?.name || 'Guest'}!</h2>
        <div style={styles.header}></div>
        {flash?.success && (
          <div style={styles.flashMessage}>{flash.success}</div>
        )}
        <div className="createsec">
          <h2>Start Writing Now..</h2>
          <div style={{ display: 'flex' }}>
            <div className="buttons">
              <button
                className="filter"
                onClick={() => setShowCreatePost(!showCreatePost)}
              >
                {showCreatePost ? 'Cancel' : 'Create Post'}
              </button>
              <input
                type="text"
                placeholder="Filter posts by topic"
                className="filterInput"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        {showCreatePost && <CreatePost onPostCreated={handlePostCreated} />}

        {displayPosts.length === 0 ? (
          <p style={styles.noPosts}>
            {filter.trim() === ''
              ? 'No posts available.'
              : 'No posts match your topic filter.'}
          </p>
        ) : (
          <div style={styles.cardContainer}>
            {displayPosts.map((post) => (
              <div
                key={post.id}
                style={{
                  ...styles.card,
                  boxShadow: likedPosts[post.id]
                    ? '0 0 15px 5px rgba(148, 191, 211, 0.66), 0 4px 8px rgba(255, 255, 255, 0.34)'
                    : styles.card.boxShadow,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = likedPosts[post.id]
                    ? '0 0 20px 8px rgba(0, 158, 231, 0.5), 0 6px 12px rgba(0, 0, 0, 0.2)'
                    : '0 6px 12px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = likedPosts[post.id]
                    ? '0 0 15px 5px rgba(0, 158, 231, 0.5), 0 4px 8px rgba(255, 255, 255, 0.34)'
                    : styles.card.boxShadow;
                }}
              >
                <p style={styles.cardTitle}>{post.title}</p>
                {post.image && (
                  <img
                    src={`/storage/${post.image}`}
                    alt={post.title}
                    style={styles.postImage}
                  />
                )}
                <div className="tags">
                  <p style={styles.date}>
                    {new Date(post.created_at).toLocaleString()}
                  </p>
                  <p
                    style={styles.date}
                    dangerouslySetInnerHTML={{
                      __html: `Topic: ${highlightText(post.topic, filter)}`,
                    }}
                  />
                  <p style={styles.date}>
                    Author: {post.user?.name || post.username || 'Unknown User'}
                  </p>
                </div>
                <p style={styles.cardContent}>{post.body}</p>

                <Link
                  href={`/posts/${post.id}`}
                  style={styles.readMore}
                  className="read-post"
                >
                  View Post..
                </Link>
                {auth?.user && (
                  <div className="interaction">
                    <form
                      onSubmit={(e) => handleCommentSubmit(post.id, e)}
                      style={styles.commentForm}
                    >
                      <textarea
                        className="comment"
                        placeholder="Add a comment..."
                        value={commentDrafts[post.id] || ''}
                        onChange={(e) => handleCommentChange(post.id, e.target.value)}
                        style={{ minHeight: '60px', resize: 'vertical' }}
                      />
                      {activeCommentPostId === post.id && errors.content && (
                        <div style={styles.errorMessage}>
                          {errors.content}
                        </div>
                      )}
                      <button
                        type="submit"
                        style={styles.commentButton}
                        disabled={processing}
                      >
                        {processing && activeCommentPostId === post.id ? 'Posting...' : 'Comment'}
                      </button>
                    </form>
                    <div className="like" onClick={() => toggleLike(post.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill={likedPosts[post.id] ? '#0084a1' : 'none'}
                        stroke="#0084a1"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="like-icon"
                      >
                        <path d="M20.84 4.61c-1.54-1.32-3.97-1.13-5.34.49L12 8.09l-3.5-3.5C7.13 3.48 4.7 3.29 3.16 4.61c-1.64 1.4-1.79 3.84-.37 5.37L12 21.35l9.21-11.37c1.41-1.53 1.26-3.97-.37-5.37z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {filter.trim() === '' && posts?.links && (
        <div className="py-4 px-4 flex justify-center">
          {posts.links.map((link, index) => (
            <Link
              key={index}
              href={link.url || '#'}
              dangerouslySetInnerHTML={{ __html: link.label }}
              className={`mx-1 px-3 py-1 border rounded transition duration-200
                ${
                  link.active
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-100'
                } ${!link.url && 'pointer-events-none opacity-50'}`}
              preserveState
              preserveScroll
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Home;