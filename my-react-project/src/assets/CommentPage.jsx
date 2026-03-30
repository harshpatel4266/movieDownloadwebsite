import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CommentPage.css";

export default function CommentPage() {
  const { id: movieId } = useParams();
  const userId = 1;

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // 🔹 GET COMMENTS
  const fetchComments = () => {
    axios
      .get(`http://localhost:5000/comments/${movieId}`)
      .then((res) => {
        if (res.data.status === "success") {
          setComments(res.data.data);
        }
      })
      .catch(console.log);
  };

  useEffect(() => {
    fetchComments();
  }, [movieId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!comment.trim()) return;

    const formData = new FormData();
    formData.append("movie_id", movieId);
    formData.append("user_id", userId);
    formData.append("comment_text", comment);

    axios
      .post("http://localhost:5000/comments", formData)
      .then((res) => {
        if (res.data.status === "success") {
          setComment("");
          fetchComments();
        }
      })
      .catch(console.log);
  };

  return (
    <div className="comment-page">
      <h2 className="title">Comments</h2>

      {/* Comment Form */}
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <button type="submit">Post Comment</button>
      </form>

      <div className="comment-section">
        {comments.length === 0 ? (
          <p className="no-comment">No comments yet</p>
        ) : (
          comments.map((c) => (
            <div className="comment-box" key={c.comments_id}>
              <h4>{c.username}</h4>
              <p>{c.comment_text}</p>
              <span className="date">
                {new Date(c.created_at).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
