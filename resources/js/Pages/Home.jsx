import React, { useEffect, useState } from 'react';
import { Link , usePage} from '@inertiajs/react';
import CreatePost from './Create.jsx';
import './Page.css'

function Home({ posts, auth }) {
  console.log(posts, auth);
  const { flash } = usePage().props;
  const [showCreatePost, setShowCreatePost] = useState(false);

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
      color:'white',

      textAlign:'center'
    
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
      fontSize: '5em',
      textTransform: 'uppercase',
      letterSpacing: '10px',
      margin: '25px',
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
      // border:'2px solid white',
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
    cardTitle:{
    
        backgroundColor: '#0084a1',
        padding: '6px 10px',
        fontSize: '2em',
        textAlign: 'center',
        borderRadius: '6px',
        marginBottom: '20px',
        display: 'inline-block',
        fontFamily: 'Montserrat',
        textTransform: 'uppercase',
        display:'flex',
        color:'#fff',
        
        justifyContent: 'space-between',
    
    },
    date: {
      backgroundColor: '#00181d',
      color: '#fff',
      padding: '6px 8px',
      fontSize: '0.8em',
      fontWeight:'600',
      textAlign: 'center',
      borderRadius: '6px',
      marginBottom: '12px',
      display: 'inline-block',
      fontFamily: 'Montserrat',
    },
    readMore: {
      color: '#3182ce',
      textDecoration: 'none',
      fontWeight: '500',
      fontFamily: 'Montserrat',
    },
    createButton: {
      display: 'block',
      width: '100px',
      padding: '8px',
      color: ' #0056b3',
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
  
  };

  const animationStyles = `
    .create-button:hover {
      background: #0056b3;
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
    setShowCreatePost(false); // Hide the CreatePost component after a post is created
  };
  return (
    <>
    <h1 style={styles.title} className="landing-text"></h1>
      <div style={styles.container}>
        <style>{animationStyles}</style>
        <h2 style={styles.welcome}>Welcome, {auth?.user?.name || 'Guest'}!</h2>
        <div style={styles.header}>
         
  {/* <Link href="/topics" className="topic">
    Topic Search
  </Link> */}

        </div>
        <h1 style={styles.title} className="landing-text"></h1>
        {flash?.success && (
          <div style={styles.flashMessage}>{flash.success}</div>
        )}
        <div className="createsec">
          <h2 className=''>Start Writing Now..</h2>
          <button
          style={styles.createButton}
          className="create-button"
          onClick={() => setShowCreatePost(!showCreatePost)}
        >
          {showCreatePost ? 'Cancel' : 'Create Post'}
        </button>
        </div>
        

        {showCreatePost && <CreatePost onPostCreated={handlePostCreated} />}

        {posts?.data?.length === 0 ? (
          <p style={styles.noPosts}>No posts available.</p>
        ) : (
          <div style={styles.cardContainer}>
            {posts?.data?.map((post) => (
              <div
                key={post.id}
                style={styles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                <p style={styles.cardTitle}>
                  {post.title}
                </p>
                <div className='tags'>
                <p style={styles.date}>
                  {new Date(post.created_at).toLocaleString()}
                </p>
                <p style={styles.date}>
                 Topic : {post.topic ? post.topic : 'None'}
                </p>
                </div>
                <p style={styles.cardContent}>{post.body}</p>
                <Link href={`/posts/${post.id}`} style={styles.readMore} className="read-post">
                  Read More...
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {posts?.links && (
        <div className="py-4 px-4 flex justify-center ">
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