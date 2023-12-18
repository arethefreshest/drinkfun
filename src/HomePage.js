import React from "react";
import './css/HomePage.css';

function HomePage() {
    return (
        <div className="home-container">
            <img src="/pictures/logo.png" alt="Logo" className="logo" />
            <h1 className="home-title">Velkommen til vårt drikkespill!</h1>
            <div className="buttons-container">
                <button className="button">Start et spill</button>
                <button className="button">Logg inn</button>
                <button className="button">Innstillinger</button>
            </div>
        </div>
    );
}

export default HomePage;

