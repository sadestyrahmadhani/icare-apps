// Modal.js

import React from 'react';
import '../../styled/style.css'; // Import your CSS file for styling

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>Close
        &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
