import React from 'react';
import './DeleteReview.css'

export default function DeleteModal({ isOpen, onClose, onDelete }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="delete-modal">
      <div className="modal-content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this review?</p>
        <div className="buttons">
          <button className="delete-button" onClick={onDelete}>
            Yes (Delete Review)
          </button>
          <button className="cancel-button" onClick={onClose}>
            No (Keep Review)
          </button>
        </div>
      </div>
    </div>
  );
}
