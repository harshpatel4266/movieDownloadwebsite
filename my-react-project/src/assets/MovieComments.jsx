import { useEffect, useState } from "react";
import "./MovieComments.css";
import { NavScrollExample } from "./Navbar";

export default function MovieComments() {
  /* LOAD COMMENTS */
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("movieReviews");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Samantha D.",
            date: "2023-08-14T10:30:00",
            text: `"The Crown" is seriously addictive!`,
            rating: 5,
          },
          {
            id: 2,
            name: "Jenny Wilson",
            date: "2023-08-12T08:15:00",
            text: `"OMG, just binged "The Crown"!`,
            rating: 4,
          },
        ];
  });

  /* SAVE COMMENTS */
  useEffect(() => {
    localStorage.setItem("movieReviews", JSON.stringify(reviews));
  }, [reviews]);

  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [editId, setEditId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);

  /* SEE MORE / BACK */
  const [expanded, setExpanded] = useState(false);

  /* SORT LATEST FIRST */
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const visibleReviews = expanded
    ? sortedReviews
    : sortedReviews.slice(0, 4);

  /* ADD / UPDATE */
  const handleSubmit = () => {
    if (!newName || !newText || newRating < 1 || newRating > 5) return;

    if (editId) {
      setReviews(
        reviews.map((rev) =>
          rev.id === editId
            ? { ...rev, name: newName, text: newText, rating: newRating }
            : rev
        )
      );
      setEditId(null);
    } else {
      setReviews([
        {
          id: Date.now(),
          name: newName,
          text: newText,
          rating: newRating,
          date: new Date().toISOString(),
        },
        ...reviews,
      ]);
    }

    setNewName("");
    setNewText("");
    setNewRating(5);
    setShowForm(false);
    setExpanded(false);
  };

  /* EDIT */
  const handleEdit = (rev) => {
    setEditId(rev.id);
    setNewName(rev.name);
    setNewText(rev.text);
    setNewRating(rev.rating || 5);
    setShowForm(true);
    setMenuOpen(null);
  };

  /* DELETE */
  const handleDelete = (id) => {
    setReviews(reviews.filter((rev) => rev.id !== id));
    setMenuOpen(null);
  };

  /* DISPLAY STARS */
  const renderStars = (count) => "★".repeat(count) + "☆".repeat(5 - count);

  /* FORM STAR CLICK */
  const StarSelector = () => {
    return (
      <div className="star-selector">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`star ${i <= newRating ? "selected" : ""}`}
            onClick={() => setNewRating(i)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="comments-section">
        <div className="comments-header">
          <h2>Comments</h2>
        </div>

        <div className="comments-grid">
          {visibleReviews.map((rev) => (
            <div key={rev.id} className="comment-card">
              <div className="card-top">
                <div className="stars">{renderStars(rev.rating || 5)}</div>

                <div className="menu-wrapper">
                  <span
                    className="menu"
                    onClick={() =>
                      setMenuOpen(menuOpen === rev.id ? null : rev.id)
                    }
                  >
                    ⋮
                  </span>

                  {menuOpen === rev.id && (
                    <div className="menu-dropdown">
                      <button onClick={() => handleEdit(rev)}>Edit</button>
                      <button onClick={() => handleDelete(rev.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <h3>{rev.name}</h3>
              <p>{rev.text}</p>
              <p className="comment-date">
                Posted on{" "}
                {new Date(rev.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="comment-actions">
        {sortedReviews.length > 4 && (
          <button
            className="SeeMore-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Back" : "See More"}
          </button>
        )}

        <button
          className="AddComment-btn"
          onClick={() => setShowForm(!showForm)}
        >
          Add Comment
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="comment-form">
          <h3>{editId ? "Edit Comment" : "Add Comment"}</h3>

          <input
            type="text"
            placeholder="Your name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <textarea
            placeholder="Write your comment..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />

          <label>Rating:</label>
          <StarSelector />

          <button onClick={handleSubmit}>
            {editId ? "Update" : "Submit"}
          </button>
        </div>
      )}
    </>
  );
}
