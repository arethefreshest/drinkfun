import React, { useState, useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import '../css/HomePage.css';
import Modal from '../components/modal';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const navigate = useNavigate();
  const [isStartGameModalOpen, setIsStartGameModalOpen] = useState(false);
  const [isLocalPlayModalOpen, setIsLocalPlayModalOpen] = useState(false);
  const [playerNames, setPlayerNames] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  const imagesToLoad = useMemo(
    () => [
      '/pictures/fisk3.png',
      '/pictures/fisk4.png',
      '/pictures/flaske1.png',
      '/pictures/flaske2.png',
      '/pictures/flaske3.png',
      '/pictures/glass.png',
      '/pictures/fisk8.png',
      '/pictures/flaske4.png',
      '/pictures/flaske5.png',
      '/pictures/flaske6.png',
      '/pictures/flaske7.png',
    ],
    [],
  );

  const leftSideContainerRef = useRef(null);
  const rightSideContainerRef = useRef(null);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleStartGame = () => {
    navigate('/game-chooser');
  };

  const removePlayerName = (nameToRemove) => {
    setPlayerNames(playerNames.filter((name) => name !== nameToRemove));
  };

  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    const cloneAndShuffleImages = (containerRef, images) => {
      const container = containerRef.current;
      container.innerHTML = ''; // Clear previous images

      // Create a fragment to append images to
      const fragment = document.createDocumentFragment();

      // Append shuffled images twice for looping
      shuffleArray(images).forEach((imagePath, index) => {
        const img = document.createElement('img');
        img.src = imagePath;
        img.className = 'random-image';
        img.style.position = 'absolute';
        img.style.top = `${index * 100}%`; // Position each image below the last
        fragment.appendChild(img);
      });

      // Append the fragment to the container
      container.appendChild(fragment);
    };

    cloneAndShuffleImages(leftSideContainerRef, imagesToLoad);
    cloneAndShuffleImages(rightSideContainerRef, imagesToLoad);

    // Animate the containers
    gsap.to([leftSideContainerRef.current, rightSideContainerRef.current], {
      yPercent: -100 * imagesToLoad.length,
      ease: 'none',
      repeat: -1, // Loop indefinitely
      duration: 360, // Adjust duration to control the speed of the scroll
      modifiers: {
        yPercent: gsap.utils.wrap(-100, 0),
      },
    });

    // Cleanup function to kill GSAP tweens
    return () => {
      gsap.killTweensOf(leftSideContainerRef.current);
      gsap.killTweensOf(rightSideContainerRef.current);
    };
  }, [imagesToLoad]); // only re-run when images change

  const handleLocalGameSetup = () => {
    setIsStartGameModalOpen(false);
    setIsLocalPlayModalOpen(true);
  };

  const handleMultiDeviceGameSetup = () => {
    setIsStartGameModalOpen(false);
    navigate('/game');
  };

  const handleAddPlayerName = () => {
    if (newPlayerName) {
      setPlayerNames([...playerNames, newPlayerName]);
      setNewPlayerName('');
    }
  };

  return (
    <div className="background-container">
      <div className="side-container left" ref={leftSideContainerRef}>
        {imagesToLoad.map((imagePath) => (
          <img
            key={imagePath}
            src={imagePath}
            alt=""
            className="random-image"
          />
        ))}
      </div>
      <div className="home-container">
        <img src="/pictures/logo.png" alt="Logo" className="logo" />
        <h1 className="home-title">
          Den fordrukne pirat er tilbake for å slukke tørst
        </h1>
        <div className="buttons-container">
          <button
            className="button"
            onClick={() => setIsStartGameModalOpen(true)}
          >
            Start et spill
          </button>
          <button className="button" onClick={handleLoginClick}>
            Logg inn
          </button>
        </div>
      </div>

      <div className="side-container right" ref={rightSideContainerRef}>
        {imagesToLoad.map((imagePath) => (
          <img
            key={imagePath}
            src={imagePath}
            alt=""
            className="random-image"
          />
        ))}
      </div>

      <Modal
        isOpen={isStartGameModalOpen}
        onClose={() => setIsStartGameModalOpen(false)}
      >
        <h2>Velg spillmodus</h2>
        <button className="modal-button" onClick={handleLocalGameSetup}>
          Spill lokalt
        </button>
        <button className="modal-button" onClick={handleMultiDeviceGameSetup}>
          Spill på hver sin enhet
        </button>
      </Modal>

      <Modal
        isOpen={isLocalPlayModalOpen}
        onClose={() => setIsLocalPlayModalOpen(false)}
      >
        <h2>Legg til spillere</h2>
        <div className="modal-input-container">
          <input
            className="modal-input"
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Skriv inn spillernavn"
          />
          <button
            className="modal-add-player-button"
            onClick={handleAddPlayerName}
          >
            <img src="/pictures/add-button.svg" alt="Add" />
          </button>
        </div>
        <ul className="modal-player-list">
          {playerNames.map((name, index) => (
            <li key={name + index}>{name}</li> // Combined name and index for key
          ))}
        </ul>
        <button className="start-game-button" onClick={handleStartGame}>
          Start Game
        </button>
      </Modal>
    </div>
  );
};

export default HomePage;
