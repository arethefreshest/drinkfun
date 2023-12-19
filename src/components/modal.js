import React from 'react';
import propTypes from 'prop-types';
import '../css/Modal.css'; // Importing custom styles for the modal component

// Modal functional component accepting children, isOpen, and onClose as props
const Modal = ({ children, isOpen, onClose }) => {
  // `useCallback` memoizes the `handleKeyDown` function to prevent unnecessary re-creations
  const handleKeyDown = React.useCallback(
    (e) => {
      // Check if the key pressed is Escape key
      if (e.key === 'Escape') {
        // Call the onClose function passed as a prop when Escape key is pressed
        onClose();
      }
    },
    [onClose], // Dependencies array, handles updates only when `onClose` changes
  );

  // `useEffect` hook to manage side effects in the component
  React.useEffect(() => {
    // If modal is open, apply styles and event listeners
    if (isOpen) {
      // Prevents scrolling of the page in the background when the modal is open
      document.body.style.overflow = 'hidden';
      // Adds an event listener for keydown events
      window.addEventListener('keydown', handleKeyDown);
    } else {
      // Allows scrolling of the page when the modal is not open
      document.body.style.overflow = 'unset';
      // Removes the keydown event listener when the modal is closed
      window.removeEventListener('keydown', handleKeyDown);
    }

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]); // The effect will only re-run if `isOpen` or `handleKeyDown` changes

  // Conditional rendering - nothing is rendered if the modal is not open
  if (!isOpen) return null;

  // JSX for modal layout including overlay and content sections
  return (
    <div
      className="modal-overlay" // CSS class for the modal overlay
      onClick={onClose} // Propagates click event for closing the modal
      onKeyDown={handleKeyDown} // Handles key down events
      tabIndex={-1} // Makes the element focusable
    >
      <div
        className="modal-content" // CSS class for the content of the modal
        onClick={(e) => e.stopPropagation()} // Prevents click events from bubbling up
        onKeyDown={(e) => e.stopPropagation()} // Prevents keydown events from bubbling up
      >
        <button
          className="modal-close-button" // CSS class for the close button
          onClick={(e) => {
            e.stopPropagation(); // Stops click event from propagating to overlay
            onClose(); // Calls onClose function to close the modal
          }}
        >
          &times;{' '}
          {/* Unicode character for the multiplication sign used for the
          close button*/}
        </button>
        {/* Renders child components or elements passed inside Modal */}
        {children}
      </div>
    </div>
  );
};

// Defines expected prop types for the Modal component
Modal.propTypes = {
  children: propTypes.node.isRequired, // Child nodes that are rendered within the modal
  isOpen: propTypes.bool.isRequired, // Boolean flag to indicate if the modal should be open or closed
  onClose: propTypes.func.isRequired, // Function to call when closing the modal
};

export default Modal; // Exports the Modal component for use in other files
