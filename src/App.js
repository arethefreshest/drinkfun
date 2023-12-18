import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import GameRoom from "./GameRoom";
import PlayerLogin from "./PlayerLogin";
import Settings from "./Settings";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game" element={<GameRoom />} />
                <Route path="/login" element={<PlayerLogin />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Router>
    );
}

export default App;