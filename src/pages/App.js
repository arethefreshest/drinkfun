import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import GameRoom from './GameRoom';
import PlayerLogin from './PlayerLogin';
import Settings from '../components/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/game"
          element={
            <GameRoom
              onStartLocalGame={handleStartGameClick}
              onStartMultiDeviceGame={handleStartGameClick}
            />
          }
        />
        <Route path="/login" element={<PlayerLogin />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

function handleStartGameClick() {
  // implementation for starting the local game
}

export default App;
