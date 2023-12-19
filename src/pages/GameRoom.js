import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../components/modal';

const GameRoom = ({ onStartLocalGame, onStartMultiDeviceGame }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Start et spill</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Velg spillmodus</h2>
        <p>Ønsker du å spille lokalt på én enhet eller på flere enheter?</p>
        <div className="modal-buttons">
          <button className="modal-button" onClick={onStartLocalGame}>
            Spill lokalt
          </button>
          <button className="modal-button" onClick={onStartMultiDeviceGame}>
            Spill på hver sin enhet
          </button>
        </div>
      </Modal>
    </>
  );
};

// Add PropTypes validation for props passed to GameLobby
GameRoom.propTypes = {
  onStartLocalGame: PropTypes.func.isRequired,
  onStartMultiDeviceGame: PropTypes.func.isRequired,
};

export default GameRoom;
