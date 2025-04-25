import React, { useState } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import ShowLayout from '../layout/ShowLayout';
import './Page.css';

function Show({ post }) {
  const { flash } = usePage().props;
  const [isEditing, setIsEditing] = useState(false);

  // Form for editing the post
  const { data: postData, setData: setPostData, put, delete: destroy, errors: postErrors, processing: postProcessing } = useForm({
    title: post.title || '',
    body: post.body || '',
    topic: post.topic || '',
  });

  // Form for submitting a new comment
  const { data: commentData, setData: setCommentData, post: submitComment, errors: commentErrors, processing: commentProcessing, reset } = useForm({
    content: '',
  });

  const styles = {
    container: {
      padding: '20px',
      marginTop: '50px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '10px',
      fontFamily: 'Montserrat',
      color: '#fff',
    },
    form: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '20px',
      borderRadius: '10px',
      marginBottom: '20px',
      fontFamily: 'Montserrat',
    },
    commentForm: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '15px',
      borderRadius: '8px',
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
    commentTextarea: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontFamily: 'Montserrat',
      fontSize: '16px',
      minHeight: '60px',
    },
    Abutton: {
      padding: '10px 20px',
      background: '#0084a1',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      borderRadius: '50px',
      marginRight: '10px',
    },
    commentButton: {
      padding: '8px 16px',
      background: '#0084a1',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '14px',
      cursor: 'pointer',
      fontFamily: 'Montserrat',
    },
    error: {
      color: '#dc3545',
      fontSize: '14px',
      marginBottom: '10px',
      fontFamily: 'Montserrat',
    },
    flashMessage: {
      color: '#28a745',
      textAlign: 'center',
      marginBottom: '20px',
      fontFamily: 'Montserrat',
      fontSize: '1.2em',
    },
    commentsContainer: {
      marginTop: '20px',
      padding: '15px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '8px',
    },
    comment: {
      padding: '10px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      marginBottom: '10px',
    },
    commentAuthor: {
      fontWeight: 'bold',
      fontSize: '14px',
      color: '#bbf3ff',
      marginBottom: '5px',
      fontFamily: 'Montserrat',
    },
    commentContent: {
      fontSize: '16px',
      color: '#fff',
      fontFamily: 'Montserrat',
    },
    noComments: {
      fontSize: '16px',
      color: '#fff',
      fontStyle: 'italic',
      fontFamily: 'Montserrat',
      textAlign: 'center',
    },
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    put(`/posts/${post.id}`, {
      data: postData,
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      destroy(`/posts/${post.id}`, {
        onSuccess: () => {
          // Redirect handled by backend
        },
      });
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    submitComment(`/posts/${post.id}/comments`, {
      onSuccess: () => {
        reset('content'); // Clear the comment input after successful submission
      },
    });
  };

  return (
    <div style={styles.container} className="show">
      {flash?.success && (
        <div style={styles.flashMessage}>{flash.success}</div>
      )}
      {isEditing ? (
        <form onSubmit={handlePostSubmit} style={styles.form}>
          <div>
            <input
              type="text"
              placeholder="Title"
              value={postData.title}
              onChange={(e) => setPostData('title', e.target.value)}
              style={styles.input}
            />
            {postErrors.title && <div style={styles.error}>{postErrors.title}</div>}
          </div>
          <div>
            <textarea
              placeholder="Body"
              value={postData.body}
              onChange={(e) => setPostData('body', e.target.value)}
              style={styles.textarea}
            />
            {postErrors.body && <div style={styles.error}>{postErrors.body}</div>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Topic (optional)"
              value={postData.topic}
              onChange={(e) => setPostData('topic', e.target.value)}
              style={styles.input}
            />
            {postErrors.topic && <div style={styles.error}>{postErrors.topic}</div>}
          </div>
          <button type="submit" style={styles.Abutton} disabled={postProcessing}>
            {postProcessing ? 'Saving...' : 'Save'}
          </button>
        </form>
      ) : (
        <>
          <h3 className="showTitle">Title: {post.title}</h3>
          <h4 >{post.image && (
                  <img
                    src={`/storage/${post.image}`}
                    alt={post.title}
                    className='image'
                   
                  />
                )}</h4>
          <h3 className="showTopic">Topic: {post.topic || 'None'}</h3>
          <h1 className="showBody">{post.body}</h1>
          <div className="actionButton">
            <button
              style={styles.Abutton}
              className="editButton"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="deleteButton"
              style={styles.Abutton}
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          <form onSubmit={handleCommentSubmit} style={styles.commentForm}>
            <div>
              <textarea
                placeholder="Add a comment..."
                value={commentData.content}
                onChange={(e) => setCommentData('content', e.target.value)}
                style={styles.commentTextarea}
              />
              {commentErrors.content && <div style={styles.error}>{commentErrors.content}</div>}
            </div>
            <button type="submit" style={styles.commentButton} disabled={commentProcessing}>
              {commentProcessing ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
          <div style={styles.commentsContainer}>
            <h4>Comments</h4>
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id} style={styles.comment}>
                  <div style={styles.commentAuthor}>
                    {comment.user?.name || comment.username || 'Anonymous'}
                  </div>
                  <div style={styles.commentContent}>{comment.content}</div>
                </div>
              ))
            ) : (
              <div style={styles.noComments}>No comments yet.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Show.layout = page => <ShowLayout children={page} />;
export default Show;