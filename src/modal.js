import React from 'react';
import './css/Modal.css'; // Import the CSS you created for the modal

const Modal = ({ children, isOpen, onClose }) => {
  // Prevents scrolling the background when the modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;